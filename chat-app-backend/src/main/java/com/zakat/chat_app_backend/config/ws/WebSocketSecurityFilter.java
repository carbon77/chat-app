package com.zakat.chat_app_backend.config.ws;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class WebSocketSecurityFilter implements ChannelInterceptor {
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String jwtString = Objects.requireNonNull(accessor.getFirstNativeHeader("Authorization")).substring(7);
            BearerTokenAuthenticationToken token = new BearerTokenAuthenticationToken(jwtString);

            JwtDecoder decoder = JwtDecoders.fromOidcIssuerLocation("http://localhost:9080/realms/chat-app");
            JwtAuthenticationProvider provider = new JwtAuthenticationProvider(decoder);

            Authentication user = provider.authenticate(token);
            accessor.setUser(user);
        }

        if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
            String chatId = accessor.getFirstNativeHeader("X-Chat-Id");
            accessor.setHeader("X-Chat-Id", chatId);
        }

        return message;
    }
}
