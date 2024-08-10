package com.zakat.chat_app_backend.mapper;

import com.zakat.chat_app_backend.dto.ChatDto;
import com.zakat.chat_app_backend.dto.OutputMessageDto;
import com.zakat.chat_app_backend.model.Chat;
import com.zakat.chat_app_backend.model.Message;
import com.zakat.chat_app_backend.repository.MessageRepository;
import com.zakat.chat_app_backend.service.UsersService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Mapper(componentModel = "spring")
public abstract class ChatDtoMapper {
    @Autowired
    protected MessageRepository messageRepository;
    @Autowired
    protected OutputMessageDtoMapper outputMessageDtoMapper;
    @Autowired
    protected UsersService usersService;

    @Mappings(value = {
            @Mapping(source = "id", target = "lastMessage", qualifiedByName = "messageToOutputMessageDto"),
            @Mapping(source = "chat", target = "dialogUsersNames", qualifiedByName = "getDialogUsersNames")
    })
    public abstract ChatDto toDto(Chat chat);

    @Named("messageToOutputMessageDto")
    public OutputMessageDto messageToOutputMessageDto(UUID chatId) {
        Message lastMessage = messageRepository.findFirstByChat_IdOrderBySentAtDesc(chatId)
                .orElse(null);
        OutputMessageDto messageDto = lastMessage != null ? outputMessageDtoMapper.toDto(lastMessage) : null;
        return messageDto;
    }

    @Named("getDialogUsersNames")
    public Map<UUID, String> getDialogUsersNames(Chat chat) {
        var usersNames = new HashMap<UUID, String>();

        if (chat.getIsDialog()) {
            for (var userId : chat.getUserIds()) {
                var user = usersService.getUserRepById(userId);
                usersNames.put(userId, user.getFirstName() + " " + user.getLastName());
            }
        }

        return usersNames;
    }
}
