package com.zakat.chat_app_backend.repository;

import com.zakat.chat_app_backend.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChatRepository extends JpaRepository<Chat, UUID> {

    List<Chat> findByUserIdsContains(UUID userId);

    @Query(value = "SELECT c FROM Chat c " +
            "WHERE c.isDialog = true AND ?1 MEMBER OF c.userIds AND ?2 MEMBER OF c.userIds")
    Optional<Chat> findDialogByUsers(UUID user1Id, UUID user2Id);
}