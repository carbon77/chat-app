package com.zakat.chat_app_backend.mapper;

import com.zakat.chat_app_backend.dto.UserDto;
import org.keycloak.representations.idm.UserRepresentation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserDtoMapper {

    UserDto toDto(UserRepresentation user);
}
