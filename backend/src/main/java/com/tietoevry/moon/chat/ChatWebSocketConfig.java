package com.tietoevry.moon.chat;

import com.tietoevry.moon.chat.handler.ChatWebSocketHandler;
import com.tietoevry.moon.schedule.websocket.handler.WebSocketHandler;
import com.tietoevry.moon.video.handler.VideoWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class ChatWebSocketConfig implements WebSocketConfigurer {
    @Autowired
    ChatWebSocketHandler chatWebSocketHandler;
    @Autowired
    VideoWebSocketHandler videoWebSocketHandler;

    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

        registry.addHandler(chatWebSocketHandler, "/ws/chat")
            .addHandler(videoWebSocketHandler,"/ws/lessonQuiz")
            .setAllowedOrigins("*");
    }

//    @Bean
//    public WebSocketHandler getWebSocketHandler() {
//        return new WebSocketHandler();
//    }
}
