package com.zakat.chat_app_backend.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ChatSubscriptionService {
    // Maps simpSessionId to chatId
    private final Map<String, UUID> subscribedChats = new ConcurrentHashMap<>();
    private final Map<UUID, Set<String>> userSessions = new ConcurrentHashMap<>();

    public void subscribe(UUID userId, String simpSessionId, UUID chatId) {
        subscribedChats.put(simpSessionId, chatId);

        if (!userSessions.containsKey(userId)) {
            userSessions.put(userId, ConcurrentHashMap.newKeySet());
        }
        userSessions.get(userId).add(simpSessionId);
    }

    public void unsubscribe(UUID userId, String simpSessionId) {
        subscribedChats.remove(simpSessionId);

        if (userSessions.containsKey(userId)) {
            userSessions.get(userId).remove(simpSessionId);

            if (userSessions.get(userId).isEmpty()) {
                userSessions.remove(userId);
            }
        }
    }

    public UUID getSubscribedChatId(String simpSessionId) {
        return subscribedChats.getOrDefault(simpSessionId, null);
    }

    public void disconnectUser(UUID userId) {
        if (!userSessions.containsKey(userId)) return;

        Set<String> sessions = userSessions.get(userId);
        for (var session : sessions) {
            subscribedChats.remove(session);
        }
    }
}
