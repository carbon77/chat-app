package com.zakat.chat_app_backend.service;

import com.zakat.chat_app_backend.dto.CreateChatRequest;
import com.zakat.chat_app_backend.dto.InputMessageDto;
import com.zakat.chat_app_backend.dto.OutputMessageDto;
import com.zakat.chat_app_backend.dto.PatchChatRequest;
import com.zakat.chat_app_backend.mapper.OutputMessageDtoMapper;
import com.zakat.chat_app_backend.model.Chat;
import com.zakat.chat_app_backend.model.Message;
import com.zakat.chat_app_backend.repository.ChatRepository;
import com.zakat.chat_app_backend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final Logger logger = LoggerFactory.getLogger(ChatService.class);
    private final ChatRepository chatRepository;
    private final UsersService usersService;
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final MessageRepository messageRepository;
    private final OutputMessageDtoMapper outputMessageDtoMapper;


    @Transactional(readOnly = true)
    public Chat findById(UUID id) {
        return chatRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chat is not found")
        );
    }

    @Transactional(readOnly = true)
    public List<Chat> findAllByUser(UUID userId) {
        return chatRepository.findByUserIdsContains(userId);
    }

    @Transactional
    public Chat create(CreateChatRequest req) {
        var chat = new Chat();

        chat.setName(req.name());
        chat.setIsDialog(req.isDialog());
        chat.setUserIds(req.userIds());
        chat.setSentAt(LocalDateTime.now());

        return chatRepository.save(chat);
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

    public void sendMessageToChat(InputMessageDto message, UUID chatId) {
        logger.info("Send message");
        var sender = usersService.getUserRepById(message.senderId());
        var outputMessage = Message.builder()
                .senderId(UUID.fromString(sender.getId()))
                .senderFirstName(sender.getFirstName())
                .senderLastName(sender.getLastName())
                .chat(findById(chatId))
                .text(message.text())
                .sentAt(LocalDateTime.now())
                .build();

        messageRepository.save(outputMessage);
        simpMessageSendingOperations.convertAndSend(
                "/topic/" + chatId,
                outputMessageDtoMapper.toDto(outputMessage)
        );
    }

    @Transactional(readOnly = true)
    public List<OutputMessageDto> findMessagesByChatId(UUID chatId) {
        return messageRepository.findByChat_Id(chatId)
                .stream().map(outputMessageDtoMapper::toDto).toList();
    }
}
