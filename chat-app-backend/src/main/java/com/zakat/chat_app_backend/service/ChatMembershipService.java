package com.zakat.chat_app_backend.service;

import com.zakat.chat_app_backend.dto.PatchChatMembershipRequest;
import com.zakat.chat_app_backend.model.ChatMembership;
import com.zakat.chat_app_backend.repository.ChatMembershipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatMembershipService {

    private final ChatMembershipRepository chatMembershipRepository;

    public void patch(UUID chatId, UUID userId, PatchChatMembershipRequest req) {
        var membership = find(chatId, userId);

        if (req.isActive() != null) {
            membership.setIsActive(req.isActive());
        }

        if (req.role() != null) {
            membership.setRole(req.role());
        }

        if (req.lastVisited() != null) {
            membership.setLastVisited(req.lastVisited());
        }

        if (req.leftAt() != null) {
            membership.setLeftAt(req.leftAt());
        }

        chatMembershipRepository.save(membership);
    }

    public ChatMembership find(UUID chatId, UUID userId) {
        return chatMembershipRepository.findById_Chat_IdAndId_UserId(chatId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
