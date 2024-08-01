package com.zakat.chat_app_backend.service;

import com.zakat.chat_app_backend.dto.CreateChatRequest;
import com.zakat.chat_app_backend.dto.PatchChatRequest;
import com.zakat.chat_app_backend.model.Chat;
import com.zakat.chat_app_backend.repository.ChatRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.Answer;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ChatServiceTest {

    @Mock
    private ChatRepository chatRepository;

    @InjectMocks
    private ChatService chatService;

    private UUID chatId;
    private UUID user1Id;
    private UUID user2Id;
    private CreateChatRequest createChatRequest;
    private Chat chat;

    @BeforeEach
    void setUp() {
        chatId = UUID.randomUUID();
        user1Id = UUID.randomUUID();
        user2Id = UUID.randomUUID();
        createChatRequest = new CreateChatRequest("Test Chat", false, List.of(user1Id, user2Id));
        chat = new Chat();
        chat.setId(chatId);
        chat.setName(createChatRequest.name());
        chat.setIsGroup(createChatRequest.isGroup());
        chat.setUserIds(createChatRequest.userIds());
    }

    @Test
    void testFindByIdSuccess() {
        when(chatRepository.findById(chatId)).thenReturn(Optional.of(chat));

        Chat foundChat = chatService.findById(chatId);

        assertNotNull(foundChat);
        assertEquals(chatId, foundChat.getId());
        assertEquals("Test Chat", foundChat.getName());
        verify(chatRepository, times(1)).findById(chatId);
    }

    @Test
    void testFindByIdNotFound() {
        when(chatRepository.findById(chatId)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            chatService.findById(chatId);
        });

        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        assertEquals("Chat is not found", exception.getReason());
        verify(chatRepository, times(1)).findById(chatId);
    }

    @Test
    void testCreateChat() {
        when(chatRepository.save(any(Chat.class))).then((Answer<Chat>) invocation -> {
            var chat = invocation.getArgument(0, Chat.class);
            chat.setId(chatId);
            return chat;
        });

        Chat createdChat = chatService.create(createChatRequest);

        assertNotNull(createdChat.getId());
        assertNotNull(createdChat.getSentAt());
        assertEquals(chatId, createdChat.getId());
        assertEquals(createChatRequest.name(), createdChat.getName());
        assertEquals(createChatRequest.isGroup(), createdChat.getIsGroup());
        assertEquals(createChatRequest.userIds(), createdChat.getUserIds());
        verify(chatRepository, times(1)).save(any(Chat.class));
    }

    @Test
    void testPatchChat() {
        PatchChatRequest patchRequest = new PatchChatRequest("Updated Chat Name");
        when(chatRepository.findById(chatId)).thenReturn(Optional.of(chat));

        Chat updatedChat = chatService.patchChat(chatId, patchRequest);

        assertNotNull(updatedChat);
        assertEquals("Updated Chat Name", updatedChat.getName());
        verify(chatRepository, times(1)).save(any(Chat.class));
    }

    @Test
    void testPatchChatNotFound() {
        PatchChatRequest patchRequest = new PatchChatRequest("Updated Chat Name");
        when(chatRepository.findById(chatId)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            chatService.patchChat(chatId, patchRequest);
        });

        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        assertEquals("Chat is not found", exception.getReason());
        verify(chatRepository, never()).save(any(Chat.class));
    }

    @Test
    void testFindAllByUser() {
        List<Chat> chatList = new ArrayList<>();
        chatList.add(chat);
        when(chatRepository.findByUserIdsContains(user1Id)).thenReturn(chatList);

        List<Chat> foundChats = chatService.findAllByUser(user1Id);

        assertNotNull(foundChats);
        assertEquals(1, foundChats.size());
        assertEquals(chatId, foundChats.get(0).getId());
        verify(chatRepository, times(1)).findByUserIdsContains(user1Id);
    }
}