package com.zakat.chat_app_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "chats", schema = "chat-app-backend")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "chat_id")
    private UUID id;

    @Column(name = "chat_name")
    private String name;

    private Boolean isGroup;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime sentAt;

    @ElementCollection
    @CollectionTable(name = "user_chats", schema = "chat-app-backend", joinColumns = @JoinColumn(name = "chat_id"))
    @Column(name = "user_id")
    private List<UUID> userIds;
}