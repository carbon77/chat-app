package com.zakat.chat_app_backend.repository;

import com.zakat.chat_app_backend.model.ChatMembership;
import com.zakat.chat_app_backend.model.ChatMembershipId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChatMembershipRepository extends JpaRepository<ChatMembership, ChatMembershipId> {
    List<ChatMembership> findByIsActiveTrueAndId_Chat_Id(UUID id);

    Optional<ChatMembership> findById_Chat_IdAndId_UserId(UUID chatId, UUID userId);

    List<ChatMembership> findAllById_Chat_Id(UUID chatId);
}