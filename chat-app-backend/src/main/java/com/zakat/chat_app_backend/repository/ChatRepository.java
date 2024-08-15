package com.zakat.chat_app_backend.repository;

import com.zakat.chat_app_backend.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChatRepository extends JpaRepository<Chat, UUID> {

    List<Chat> findByMemberships_Id_UserId(UUID userId);

    @Query(nativeQuery = true, value = "SELECT c.chat_id\n" +
            "FROM \"chat-app-backend\".chats c\n" +
            "JOIN \"chat-app-backend\".chat_memberships cm1 ON c.chat_id = cm1.chat_id\n" +
            "JOIN \"chat-app-backend\".chat_memberships cm2 ON c.chat_id = cm2.chat_id\n" +
            "WHERE c.is_dialog = TRUE\n" +
            "AND cm1.user_id = ?1\n" +
            "AND cm2.user_id = ?2\n")
    Optional<UUID> findDialogByUsers(UUID user1Id, UUID user2Id);
}