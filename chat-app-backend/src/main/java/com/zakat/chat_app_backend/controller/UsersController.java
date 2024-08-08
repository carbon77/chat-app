package com.zakat.chat_app_backend.controller;

import com.zakat.chat_app_backend.dto.UserDto;
import com.zakat.chat_app_backend.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class UsersController {
    private final UsersService usersService;

    @GetMapping
    public List<UserDto> search(@RequestParam("q") String query) {
        return usersService.searchByFirstAndLastName(query);
    }

    @GetMapping("{userId}/friends")
    public List<UserDto> findFriends(@PathVariable UUID userId) {
        return usersService.getFriendsByUser(userId);
    }

    @PostMapping("{userId}/friends/{friendId}")
    public void addFriend(@PathVariable UUID userId, @PathVariable UUID friendId) {
        usersService.addFriend(userId, friendId);
    }

    @DeleteMapping("{userId}/friends/{friendId}")
    public void deleteFriend(@PathVariable UUID userId, @PathVariable UUID friendId) {
        usersService.deleteFriend(userId, friendId);
    }
}
