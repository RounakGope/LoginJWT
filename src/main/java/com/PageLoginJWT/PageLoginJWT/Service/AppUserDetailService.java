package com.PageLoginJWT.PageLoginJWT.Service;

import com.PageLoginJWT.PageLoginJWT.Entity.UserEntity;
import com.PageLoginJWT.PageLoginJWT.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AppUserDetailService implements UserDetailsService {
    private  final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       UserEntity user= userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("No such email there"));
        return  new User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }
}
