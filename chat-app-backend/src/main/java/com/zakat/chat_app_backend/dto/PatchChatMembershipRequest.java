package com.zakat.chat_app_backend.dto;

import com.zakat.chat_app_backend.model.ChatMembershipRole;
import jakarta.annotation.Nullable;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record PatchChatMembershipRequest(
        @Nullable
        ChatMembershipRole role,
        @Nullable
        Boolean isActive,
        @Nullable
        LocalDateTime lastVisited,
        @Nullable
        LocalDateTime leftAt
) {
}
