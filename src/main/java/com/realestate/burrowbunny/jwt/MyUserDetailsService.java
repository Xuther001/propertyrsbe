package com.realestate.burrowbunny.jwt;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // This is hardcoded. Replace it with a database lookup.
        return new User("myusername", "$2a$10$Dow5Zjx0pYcK6Nndj8ot5O.r1drHyGR0QzNCpOE5MEji4C7H/D7cC", new ArrayList<>());
    }
}
