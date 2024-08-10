package com.zakat.chat_app_backend.controller;

import com.zakat.chat_app_backend.dto.CreateChatRequest;
import com.zakat.chat_app_backend.dto.InputMessageDto;
import com.zakat.chat_app_backend.dto.OutputMessageDto;
import com.zakat.chat_app_backend.dto.PatchChatRequest;
import com.zakat.chat_app_backend.model.Chat;
import com.zakat.chat_app_backend.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/chats")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
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

    @GetMapping("{chatId}/messages")
    public List<OutputMessageDto> findMessagesByChatId(@PathVariable UUID chatId) {
        return chatService.findMessagesByChatId(chatId);
    }

    @GetMapping("findDialog")
    public Chat findDialog(@RequestParam("u1") UUID user1Id, @RequestParam("u2") UUID user2id) {
        return chatService.findDialogByUsers(user1Id, user2id);
    }

    // Stomp
    @MessageMapping("/chat/{chatId}")
    public void send(InputMessageDto message, @DestinationVariable("chatId") UUID chatId) {
        chatService.sendMessageToChat(message, chatId);
    }
}
