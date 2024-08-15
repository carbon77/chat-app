package com.zakat.chat_app_backend.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMembershipId implements Serializable {
    private UUID userId;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatMembershipId that = (ChatMembershipId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(chat, that.chat);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, chat);
    }
}
