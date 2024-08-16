package com.zakat.chat_app_backend.mapper;

import com.zakat.chat_app_backend.dto.ChatDto;
import com.zakat.chat_app_backend.dto.GetChatView;
import com.zakat.chat_app_backend.dto.OutputMessageDto;
import com.zakat.chat_app_backend.repository.ChatMembershipRepository;
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
    protected ChatMembershipRepository chatMembershipRepository;
    @Autowired
    protected UsersService usersService;

    @Mappings(value = {
            @Mapping(target = "dialogUsersNames", source = "view", qualifiedByName = "getDialogUsersNames"),
            @Mapping(target = "lastMessage", source = "view", qualifiedByName = "getLastMessage")
    })
    public abstract ChatDto fromViewToDto(GetChatView view);

    @Named("getLastMessage")
    public OutputMessageDto getLastMessage(GetChatView view) {
        if (view.getLastMessageId() == null) return null;

        var sender = usersService.getUserRepById(view.getLastMessageSenderId());
        var outputMessage = OutputMessageDto.builder()
                .messageId(view.getLastMessageId())
                .senderId(view.getLastMessageSenderId())
                .chatId(view.getId())
                .text(view.getLastMessageText())
                .sentAt(view.getLastMessageSentAt())
                .senderFirstName(sender.getFirstName())
                .senderLastName(sender.getLastName())
                .build();
        return outputMessage;
    }

    @Named("getDialogUsersNames")
    public Map<UUID, String> getDialogUsersNames(GetChatView view) {
        var usersNames = new HashMap<UUID, String>();

        if (view.getIsDialog()) {
            var memberships = chatMembershipRepository.findAllById_Chat_Id(view.getId());
            for (var membership : memberships) {
                var user = usersService.getUserRepById(membership.getId().getUserId());
                usersNames.put(membership.getId().getUserId(), user.getFirstName() + " " + user.getLastName());
            }
        }

        return usersNames;
    }
}
