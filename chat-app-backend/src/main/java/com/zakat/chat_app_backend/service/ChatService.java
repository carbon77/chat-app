package com.zakat.chat_app_backend.service;

import com.zakat.chat_app_backend.dto.CreateChatRequest;
import com.zakat.chat_app_backend.dto.PatchChatRequest;
import com.zakat.chat_app_backend.model.Chat;
import com.zakat.chat_app_backend.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;


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
        chat.setIsGroup(req.isGroup());
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
}
