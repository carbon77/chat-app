package com.zakat.chat_app_backend.service;

import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OnlineService {

    private final Set<UUID> onlineUsers = ConcurrentHashMap.newKeySet();

    public void addOnlineUser(UUID userId) {
        onlineUsers.add(userId);
    }

    public void removeOnlineUser(Principal user) {
        removeOnlineUser(UUID.fromString(user.getName()));
    }

    public void removeOnlineUser(UUID userId) {
        onlineUsers.remove(userId);
    }

    public boolean isUserOnline(UUID userId) {
        return onlineUsers.contains(userId);
    }

    public Set<UUID> getOnlineUsers() {
        return onlineUsers;
    }

}
