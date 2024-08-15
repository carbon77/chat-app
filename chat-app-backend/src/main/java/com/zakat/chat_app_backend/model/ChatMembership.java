package com.zakat.chat_app_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "chat_memberships", schema = "chat-app-backend")
public class ChatMembership {

    @EmbeddedId
    private ChatMembershipId id;

    @Column(name = "chat_role")
    @Enumerated(value = EnumType.STRING)
    private ChatMembershipRole role;

    private Boolean isActive;

    @Column(name = "last_visited", columnDefinition = "TIMESTAMP")
    private LocalDateTime lastVisited;

    @Column(name = "joined_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime joinedAt;

    @Column(name = "left_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime leftAt;
}
