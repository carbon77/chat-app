package com.zakat.chat_app_backend.repository;

import com.zakat.chat_app_backend.dto.GetChatView;
import com.zakat.chat_app_backend.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChatRepository extends JpaRepository<Chat, UUID> {

    @Query(nativeQuery = true, value = "SELECT c.chat_id\n" +
            "FROM \"chat-app-backend\".chats c\n" +
            "JOIN \"chat-app-backend\".chat_memberships cm1 ON c.chat_id = cm1.chat_id\n" +
            "JOIN \"chat-app-backend\".chat_memberships cm2 ON c.chat_id = cm2.chat_id\n" +
            "WHERE c.is_dialog = TRUE\n" +
            "AND cm1.user_id = ?1\n" +
            "AND cm2.user_id = ?2\n")
    Optional<UUID> findDialogByUsers(UUID user1Id, UUID user2Id);

    @Query(
            nativeQuery = true,
            value = "SELECT\n" +
                    "c.chat_id AS id,\n" +
                    "c.chat_name AS name,\n" +
                    "c.is_dialog,\n" +
                    "c.created_at,\n" +
                    "c.last_message_id,\n" +
                    "(SELECT COUNT(*) FROM \"chat-app-backend\".chat_memberships AS cm WHERE cm.chat_id = c.chat_id) AS count_members,\n" +
                    "cm2.chat_role,\n" +
                    "cm2.is_active,\n" +
                    "cm2.last_visited,\n" +
                    "m.message_text AS last_message_text,\n" +
                    "m.sender_id AS last_message_sender_id,\n" +
                    "m.sent_at AS last_message_sent_at,\n" +
                    "COUNT(um.*) AS count_unread_messages\n" +
                    "FROM \"chat-app-backend\".chats AS c\n" +
                    "INNER JOIN \"chat-app-backend\".chat_memberships AS cm2 ON cm2.chat_id = c.chat_id AND cm2.user_id = ?1\n" +
                    "LEFT JOIN \"chat-app-backend\".messages AS m ON m.message_id = c.last_message_id\n" +
                    "LEFT JOIN \"chat-app-backend\". messages AS um ON um.chat_id = c.chat_id AND um.sent_at > COALESCE(cm2.last_visited, cm2.joined_at)\n" +
                    "GROUP BY c.chat_id, cm2.chat_role, cm2.last_visited, cm2.is_active, m.message_text, m.sender_id, m.sent_at;"
    )
    List<GetChatView> findChatDtosByUserid(UUID userId);
}