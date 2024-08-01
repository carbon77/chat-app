package com.zakat.chat_app_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record CreateChatRequest(
        @NotBlank(message = "Name is mandatory")
        String name,

        @NotNull(message = "The field isGroup is not specified")
        Boolean isGroup,

        @NotEmpty(message = "Can't create chat without users")
        List<UUID> userIds
) {
}
