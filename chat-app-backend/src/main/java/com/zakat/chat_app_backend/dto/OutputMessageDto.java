package com.zakat.chat_app_backend.dto;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record OutputMessageDto(
        UUID messageId,
        UUID senderId,
        UUID chatId,
        String text,
        String senderFirstName,
        String senderLastName,
        LocalDateTime sentAt
) {
}
