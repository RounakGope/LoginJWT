package com.PageLoginJWT.PageLoginJWT.Service;

import ch.qos.logback.classic.encoder.JsonEncoder;
import com.PageLoginJWT.PageLoginJWT.Entity.UserEntity;
import com.PageLoginJWT.PageLoginJWT.IO.ProfileRequest;
import com.PageLoginJWT.PageLoginJWT.IO.ProfileResponse;
import com.PageLoginJWT.PageLoginJWT.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class ProfileServiceimpl implements ProfileService{
    private final UserRepository userRepository;
    private final EmailService emailService;
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
        UserEntity user=userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User Name Not Found"));
return convertToProfileResponse(user);

    }

    @Override
    public void sendResetOtp(String email) {
        UserEntity user=userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("UserNotFound"));

        //Generate 6Digit otp
        String otp=String.valueOf(ThreadLocalRandom.current().nextInt(100000,1000000));

        //Calculate Expiry Time
        Long expiry=System.currentTimeMillis()+60*15*1000;

        //update the user
        user.setResetOtp(otp);
        user.setResetOtpExpireAt(expiry);
        userRepository.save(user);
        try
        {
            //TODO send reset OTP
            emailService.sendResetOtpMail(user.getEmail(),otp );
        }
        catch (Exception e)

        {
            throw new RuntimeException("Unable to Send OTP");

        }



    }

    @Override
    public void resetPassword(String email, String password, String otp) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User Not Availabel"));
        if (user.getResetOtp() == null || !user.getResetOtp().equals( otp))
        {
            throw  new RuntimeException("Invalid OTP");
        }
        if (user.getResetOtpExpireAt()<System.currentTimeMillis())
        {
            throw new RuntimeException("OTP is Expired");
        }

        user.setPassword(passwordEncoder.encode(password));
        user.setResetOtpExpireAt(0L);
        user.setResetOtp(null);

        userRepository.save(user);



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
