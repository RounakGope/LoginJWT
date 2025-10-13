package com.PageLoginJWT.PageLoginJWT.Service;

import com.PageLoginJWT.PageLoginJWT.IO.ProfileRequest;
import com.PageLoginJWT.PageLoginJWT.IO.ProfileResponse;

public interface ProfileService {
    ProfileResponse createProfile(ProfileRequest profileRequest);

    ProfileResponse getProfile(String email);
    void sendResetOtp(String email);

    void resetPassword(String email,String password,String otp)
        ;

    void sendOtp(String userId);
    void verifyOtp(String userId,String otp);



}
