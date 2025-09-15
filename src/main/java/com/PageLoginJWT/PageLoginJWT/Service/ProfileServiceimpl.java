package com.PageLoginJWT.PageLoginJWT.Service;

import ch.qos.logback.classic.encoder.JsonEncoder;
import com.PageLoginJWT.PageLoginJWT.Entity.UserEntity;
import com.PageLoginJWT.PageLoginJWT.IO.ProfileRequest;
import com.PageLoginJWT.PageLoginJWT.IO.ProfileResponse;
import com.PageLoginJWT.PageLoginJWT.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileServiceimpl implements ProfileService{
    private final UserRepository userRepository;
    @Override
    public ProfileResponse createProfile(ProfileRequest profileRequest) {
        UserEntity newUser=convertToUserEntity(profileRequest);
        if (!userRepository.existsByEmail(newUser.getEmail())) {

            newUser = userRepository.save(newUser);
            return (convertToProfileResponse(newUser));
        }

            throw new ResponseStatusException(HttpStatus.CONFLICT,"Email Already exists");

    }

    @Override
    public ProfileResponse getProfile(String email) {
        UserEntity user=userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User Not Found"));
    return convertToProfileResponse(user);
    }


    private ProfileResponse convertToProfileResponse(UserEntity newUser) {
        return ProfileResponse.builder()
                .email(newUser.getEmail())
                .name(newUser.getName())
                .userId(newUser.getUserId())
                .isAccountVerified(newUser.isAccountVerified())
                .build();
    }
private final PasswordEncoder passwordEncoder;

    private UserEntity convertToUserEntity(ProfileRequest profileRequest) {

        return UserEntity.builder()
                .email(profileRequest.getEmail())
                .name(profileRequest.getName())
                .password(passwordEncoder.encode(profileRequest.getPassword()))
                .userId(UUID.randomUUID().toString())
                .isAccountVerified(false)
                .resetOtpExpireAt(0L)
                .verifyOtp(null)
                .verifyOtpExpireAt(0L)
                .resetOtp(null)
                .build();
    }


}
