package com.zakat.chat_app_backend.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public record ChatDto(
        UUID id,
        String name,
        Boolean isDialog,
        LocalDateTime sentAt,
        List<UUID> userIds,
        OutputMessageDto lastMessage,
        Map<UUID, String> dialogUsersNames
) {
}
