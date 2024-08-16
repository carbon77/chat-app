package com.zakat.chat_app_backend.service;

import com.zakat.chat_app_backend.dto.*;
import com.zakat.chat_app_backend.mapper.ChatDtoMapper;
import com.zakat.chat_app_backend.mapper.ChatMembershipMapper;
import com.zakat.chat_app_backend.mapper.OutputMessageDtoMapper;
import com.zakat.chat_app_backend.model.*;
import com.zakat.chat_app_backend.repository.ChatMembershipRepository;
import com.zakat.chat_app_backend.repository.ChatRepository;
import com.zakat.chat_app_backend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final Logger logger = LoggerFactory.getLogger(ChatService.class);
    private final ChatRepository chatRepository;
    private final ChatMembershipRepository chatMembershipRepository;
    private final UsersService usersService;
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final MessageRepository messageRepository;
    private final OutputMessageDtoMapper outputMessageDtoMapper;
    private final ChatDtoMapper chatDtoMapper;
    private final ChatMembershipMapper chatMembershipMapper;


    @Transactional(readOnly = true)
    public Chat findById(UUID id) {
        return chatRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chat is not found")
        );
    }

    public List<ChatDto> findAllDtoByUser(UUID userId) {
        logger.info("Fetching chats...");
        var chats = chatRepository.findChatDtosByUserid(userId)
                        .stream().map(chatDtoMapper::fromViewToDto)
                        .toList();
        logger.info("Chats have been fetched");
        return chats;
    }

    @Transactional
    public Chat create(Authentication user, CreateChatRequest req) {
        logger.info("Create chat: {}", req);
        var chat = new Chat();

        chat.setName(req.name());
        chat.setIsDialog(req.isDialog());
        chat.setCreatedAt(LocalDateTime.now());

        chat = chatRepository.save(chat);

        List<ChatMembership> memberships = new ArrayList<>();
        for (var userId : req.userIds()) {
            var membership = new ChatMembership();
            membership.setId(new ChatMembershipId(userId, chat));
            membership.setJoinedAt(LocalDateTime.now());
            membership.setIsActive(true);

            if (user.getName().equals(userId.toString())) {
                membership.setRole(ChatMembershipRole.CREATOR);
            } else {
                membership.setRole(ChatMembershipRole.MEMBER);
            }
            memberships.add(membership);
        }

        chatMembershipRepository.saveAll(memberships);
        return chat;
    }

    @Transactional
    public void delete(UUID chatId) {
        chatRepository.deleteById(chatId);
    }

    @Transactional
    public Chat patchChat(UUID id, PatchChatRequest req) {
        var chat = findById(id);
        var isChanged = false;

        if (req.chatName() != null) {
            chat.setName(req.chatName());
            isChanged = true;
        }

        if (isChanged) {
            chatRepository.save(chat);
        }

        return chat;
    }

    @Transactional
    public void sendMessageToChat(InputMessageDto message, UUID chatId) {
        logger.info("Send message");
        var sender = usersService.getUserRepById(message.senderId());
        var chat = findById(chatId);
        var outputMessage = Message.builder()
                .senderId(UUID.fromString(sender.getId()))
                .senderFirstName(sender.getFirstName())
                .senderLastName(sender.getLastName())
                .chat(chat)
                .text(message.text())
                .sentAt(LocalDateTime.now())
                .build();

        messageRepository.save(outputMessage);
        chat.setLastMessage(outputMessage);
        chatRepository.save(chat);
        simpMessageSendingOperations.convertAndSend(
                "/topic/" + chatId,
                outputMessageDtoMapper.toDto(outputMessage)
        );
        logger.info("Message has been sent");
    }

    @Transactional(readOnly = true)
    public List<OutputMessageDto> findMessagesByChatId(UUID chatId) {
        return messageRepository.findByChat_Id(chatId)
                .stream().map(outputMessageDtoMapper::toDto).toList();
    }

    @Transactional(readOnly = true)
    public UUID findDialogByUsers(UUID user1Id, UUID user2Id) {
        return chatRepository.findDialogByUsers(user1Id, user2Id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public List<ChatMembershipDto> findMembersByChat(UUID chatId) {
        return chatMembershipRepository.findByIsActiveTrueAndId_Chat_Id(chatId)
                .stream().map(chatMembershipMapper::toDto)
                .toList();
    }
}
