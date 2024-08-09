package com.zakat.chat_app_backend.mapper;

import com.zakat.chat_app_backend.dto.OutputMessageDto;
import com.zakat.chat_app_backend.model.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface OutputMessageDtoMapper {

    @Mappings(value = {
            @Mapping(target = "messageId", source = "message.id"),
            @Mapping(target = "chatId", source = "message.chat.id")
    })
    OutputMessageDto toDto(Message message);
}
