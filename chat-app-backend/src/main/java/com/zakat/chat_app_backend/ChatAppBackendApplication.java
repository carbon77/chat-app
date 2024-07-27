package com.zakat.chat_app_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity
public class ChatAppBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatAppBackendApplication.class, args);
	}

}
