package com.cdac.gaaddimitra.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import okhttp3.internal.http.HttpMethod;

@Configuration
public class GlobalCorsConfig {
//	
//	@Bean
//	public WebSecurityCustomizer webSecurityCustomizer() {
//	    return web -> web.ignoring().requestMatchers(HttpMethod., "/veichles/removeVeichle/**");
//	}


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true); // Required for sending cookies/session
            }
        };
    }
}
