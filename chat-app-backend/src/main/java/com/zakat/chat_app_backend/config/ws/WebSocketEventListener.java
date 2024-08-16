package com.zakat.chat_app_backend.config.ws;

import com.zakat.chat_app_backend.dto.PatchChatMembershipRequest;
import com.zakat.chat_app_backend.service.ChatMembershipService;
import com.zakat.chat_app_backend.service.ChatSubscriptionService;
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

import java.time.LocalDateTime;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {
    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);
    private final OnlineService onlineService;
    private final ChatSubscriptionService chatSubscriptionService;
    private final ChatMembershipService chatMembershipService;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        logger.info("Disconnect: {}", event);
        var user = event.getUser();

        if (user == null) {
            logger.info("User not found");
            return;
        }
        onlineService.removeOnlineUser(user);
        chatSubscriptionService.disconnectUser(UUID.fromString(user.getName()));
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
        var sessionId = event.getMessage().getHeaders().get("simpSessionId", String.class);
        var chatId = event.getMessage().getHeaders().get("X-Chat-Id", String.class);
        var user = event.getUser();

        logger.info("Subscribe [simpSessionId={}, userId={}, chatId={}]", sessionId, user != null ? user.getName() : null, chatId);

        if (chatId != null && user != null) {
            chatSubscriptionService.subscribe(UUID.fromString(user.getName()), sessionId, UUID.fromString(chatId));
        }
    }

    @EventListener
    public void handleUnSubscribeEvent(SessionUnsubscribeEvent event) {
        var sessionId = event.getMessage().getHeaders().get("simpSessionId", String.class);
        var userId = event.getUser() != null ? UUID.fromString(event.getUser().getName()) : null;
        var chatId = chatSubscriptionService.getSubscribedChatId(sessionId);

        logger.info("Unsubscribe [simpSessionId={}, userId={}, chatId={}]", sessionId, userId, chatId);

        if (chatId != null && userId != null) {
            var req = PatchChatMembershipRequest.builder()
                    .lastVisited(LocalDateTime.now())
                    .build();
            chatMembershipService.patch(chatId, userId, req);
            chatSubscriptionService.unsubscribe(userId, sessionId);
        }
    }
}
