package com.zakat.chat_app_backend.config.ws;

import com.zakat.chat_app_backend.service.OnlineService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {
    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);
    private final OnlineService onlineService;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        logger.info("Disconnect: {}", event);
        var user = event.getUser();

        if (user == null) {
            logger.info("User not found");
            return;
        }
        onlineService.removeOnlineUser(user);
    }

    @EventListener
    public void handleConnectedEvent(SessionConnectedEvent event) {
        logger.info("Connect: {}", event);
        var user = event.getUser();
        if (user == null) {
            logger.info("User not found");
            return;
        }
        onlineService.addOnlineUser(UUID.fromString(user.getName()));
    }

    @EventListener
    public void handleSubscribeEvent(SessionSubscribeEvent event) {
        logger.info("Subscribe: {}", event);
    }

    @EventListener
    public void handleUnSubscribeEvent(SessionUnsubscribeEvent event) {
        logger.info("Unsubscribe: {}", event);
    }
}
