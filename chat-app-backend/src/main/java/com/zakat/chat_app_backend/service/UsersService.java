package com.zakat.chat_app_backend.service;

import com.zakat.chat_app_backend.dto.UserDto;
import com.zakat.chat_app_backend.mapper.UserDtoMapper;
import com.zakat.chat_app_backend.model.Friendship;
import com.zakat.chat_app_backend.model.FriendshipId;
import com.zakat.chat_app_backend.repository.FriendshipRepository;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsersService {
    private final Keycloak keycloak;
    private final FriendshipRepository friendshipRepository;
    private final UserDtoMapper mapper;

    public List<UserDto> searchByFirstAndLastName(String query) {
        return keycloak.realm("chat-app")
                .users()
                .list()
                .stream()
                .filter(user ->
                        user.getFirstName().toUpperCase().contains(query.toUpperCase()) ||
                                user.getLastName().toUpperCase().contains(query.toUpperCase())
                )
                .map(mapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<UserDto> getFriendsByUser(UUID userId) {
        var friendships = friendshipRepository.findById_UserId(userId);
        var friendsIds = friendships.stream().map(fs -> fs.getId().getFriendId().toString()).collect(Collectors.toSet());

        var users = keycloak
                .realm("chat-app")
                .users()
                .list()
                .stream()
                .filter(user -> friendsIds.contains(user.getId()))
                .map(mapper::toDto)
                .toList();
        return users;
    }

    @Transactional
    public void addFriend(UUID userId, UUID friendId) {
        var now = LocalDateTime.now();
        var friendship = Friendship.builder()
                .id(new FriendshipId(userId, friendId))
                .createdAt(now)
                .build();
        var reversedFriendship = Friendship.builder()
                .id(new FriendshipId(friendId, userId))
                .createdAt(now)
                .build();

        friendshipRepository.saveAll(List.of(friendship, reversedFriendship));
    }

    @Transactional
    public void deleteFriend(UUID userId, UUID friendId) {
        var friendshipId = new FriendshipId(userId, friendId);
        var reversedFriendshipId = new FriendshipId(friendId, userId);
        if (!friendshipRepository.existsById(friendshipId)) {
            return;
        }

        var friendship = friendshipRepository.findById(friendshipId).orElseThrow();
        var reversedFriendship = friendshipRepository.findById(reversedFriendshipId).orElseThrow();
        friendshipRepository.deleteAll(List.of(friendship, reversedFriendship));
    }
}
