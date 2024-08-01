package com.zakat.chat_app_backend.repository;

import com.zakat.chat_app_backend.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChatRepository extends JpaRepository<Chat, UUID> {

    List<Chat> findByUserIdsContains(UUID userId);
}