package com.zakat.chat_app_backend.dto;

import com.zakat.chat_app_backend.model.ChatMembershipRole;

import java.time.LocalDateTime;
import java.util.UUID;

public record ChatMembershipDto(
        UUID userId,
        UUID chatId,
        ChatMembershipRole role,
        Boolean isActive,
        LocalDateTime lastVisited,
        LocalDateTime joinedAt,
        LocalDateTime leftAt,
        UserDto user
) {
}
