package com.zakat.chat_app_backend.dto;

import java.util.UUID;

public record InputMessageDto(
        UUID senderId,
        UUID chatId,
        String text
) {
}
