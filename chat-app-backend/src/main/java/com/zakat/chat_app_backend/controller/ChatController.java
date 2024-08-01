package com.zakat.chat_app_backend.controller;

import com.zakat.chat_app_backend.dto.CreateChatRequest;
import com.zakat.chat_app_backend.dto.PatchChatRequest;
import com.zakat.chat_app_backend.model.Chat;
import com.zakat.chat_app_backend.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("{chatId}")
    public Chat findById(@PathVariable UUID chatId) {
        return chatService.findById(chatId);
    }

    @GetMapping
    public List<Chat> findAllByUser(Principal principal) {
        return chatService.findAllByUser(UUID.fromString(principal.getName()));
    }

    @PostMapping
    public Chat create(@Valid @RequestBody CreateChatRequest req) {
        return chatService.create(req);
    }

    @PatchMapping("{chatId}")
    public Chat patch(@PathVariable UUID chatId, @Valid @RequestBody PatchChatRequest req) {
        return chatService.patchChat(chatId, req);
    }

    @DeleteMapping("{chatId}")
    public void delete(@PathVariable UUID chatId) {
        chatService.delete(chatId);
    }
}
