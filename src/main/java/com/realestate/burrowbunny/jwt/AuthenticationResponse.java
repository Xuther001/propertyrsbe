package com.realestate.burrowbunny.jwt;

public class AuthenticationResponse {
    private String username;
    private String jwt;

    public AuthenticationResponse(String username, String jwt) {
        this.username = username;
        this.jwt = jwt;
    }

    // Getters and Setters
}
