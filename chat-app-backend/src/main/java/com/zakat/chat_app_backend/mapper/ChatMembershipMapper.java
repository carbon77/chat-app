package com.zakat.chat_app_backend.mapper;

import com.zakat.chat_app_backend.dto.ChatMembershipDto;
import com.zakat.chat_app_backend.dto.UserDto;
import com.zakat.chat_app_backend.model.ChatMembership;
import com.zakat.chat_app_backend.service.UsersService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Mapper(componentModel = "spring")
public abstract class ChatMembershipMapper {
    @Autowired
    protected UsersService usersService;

    @Mappings(value = {
            @Mapping(target="userId", source = "id.userId"),
            @Mapping(target = "chatId", source = "id.chat.id"),
            @Mapping(target = "user", source = "id.userId", qualifiedByName = "getUser")
    })
    public abstract ChatMembershipDto toDto(ChatMembership entity);

    @Named("getUser")
    protected UserDto getUser(UUID userId) {
        return usersService.getUserDtoById(userId);
    }
}
