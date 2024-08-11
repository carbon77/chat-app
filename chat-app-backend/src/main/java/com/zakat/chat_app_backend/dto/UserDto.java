package com.zakat.chat_app_backend.dto;

import java.util.UUID;

public record UserDto(
        UUID id,
        String username,
        String email,
        Boolean emailVerified,
        String firstName,
        String lastName,
        boolean isOnline
) {
}
