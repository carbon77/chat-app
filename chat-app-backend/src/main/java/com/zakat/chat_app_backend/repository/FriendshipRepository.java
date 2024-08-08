package com.zakat.chat_app_backend.repository;

import com.zakat.chat_app_backend.model.Friendship;
import com.zakat.chat_app_backend.model.FriendshipId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FriendshipRepository extends JpaRepository<Friendship, FriendshipId> {

    List<Friendship> findById_UserId(UUID userId);
}