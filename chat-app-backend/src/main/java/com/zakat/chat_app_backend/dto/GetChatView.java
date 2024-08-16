package com.zakat.chat_app_backend.dto;

import com.zakat.chat_app_backend.model.ChatMembershipRole;

import java.time.LocalDateTime;
import java.util.UUID;

public interface GetChatView {
    UUID getId();

    String getName();

    Boolean getIsDialog();

    LocalDateTime getCreatedAt();

    Long getCountMembers();

    ChatMembershipRole getChatRole();

    Boolean getIsActive();

    UUID getLastMessageId();

    String getLastMessageText();

    UUID getLastMessageSenderId();

    LocalDateTime getLastMessageSentAt();

    Long getCountUnreadMessages();
}
