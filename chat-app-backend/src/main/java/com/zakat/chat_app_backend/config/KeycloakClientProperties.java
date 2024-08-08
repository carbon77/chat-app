package com.zakat.chat_app_backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app.keycloak-client")
@Getter
@Setter
public class KeycloakClientProperties {
    private String serverUrl;
    private String realm;
    private String clientId;
    private String username;
    private String password;
}
