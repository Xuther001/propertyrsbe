package com.realestate.burrowbunny.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        // Configure your user details service or authentication provider here
        authenticationManagerBuilder.inMemoryAuthentication()
                .withUser("user").password("{noop}password").roles("USER"); // Example user for testing
        return authenticationManagerBuilder.build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // Disable CSRF for testing purposes; consider enabling it in production
                .authorizeRequests()
                .requestMatchers("/auth/**").permitAll() // Allow access to authentication endpoints
                .anyRequest().authenticated(); // Require authentication for other requests
        return http.build();
    }
}