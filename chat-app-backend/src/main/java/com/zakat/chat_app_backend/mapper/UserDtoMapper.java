package com.zakat.chat_app_backend.mapper;

import com.zakat.chat_app_backend.dto.UserDto;
import com.zakat.chat_app_backend.service.OnlineService;
import lombok.RequiredArgsConstructor;
import org.keycloak.representations.idm.UserRepresentation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Mapper(componentModel = "spring")
public abstract class UserDtoMapper {

    @Autowired
    protected OnlineService onlineService;

    @Mappings(value = {
            @Mapping(target = "isOnline", source = "user", qualifiedByName = "getIsOnline")
    })
    public abstract UserDto toDto(UserRepresentation user);

    @Named("getIsOnline")
    protected boolean getIsOnline(UserRepresentation user) {
        return onlineService.isUserOnline(UUID.fromString(user.getId()));
    }
}
