package com.zakat.chat_app_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "messages", schema = "chat-app-backend")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "message_id")
    private UUID id;

    @Column(name = "message_text", columnDefinition = "TEXT")
    private String text;

    @Column(name = "sent_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime sentAt;
    private Boolean isRead;

    private UUID senderId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

}
