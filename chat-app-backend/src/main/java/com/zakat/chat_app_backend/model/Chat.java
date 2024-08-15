package com.zakat.chat_app_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
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

    private Boolean isDialog;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime sentAt;

    @OneToMany(mappedBy = "id.chat")
    private List<ChatMembership> memberships = new ArrayList<>();
}