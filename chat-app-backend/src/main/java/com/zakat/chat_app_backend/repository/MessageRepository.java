package com.zakat.chat_app_backend.repository;

import com.zakat.chat_app_backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MessageRepository extends JpaRepository<Message, UUID> {
    List<Message> findByChat_Id(UUID id);

}