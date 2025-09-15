package com.PageLoginJWT.PageLoginJWT.Controller;

import com.PageLoginJWT.PageLoginJWT.IO.ProfileRequest;
import com.PageLoginJWT.PageLoginJWT.IO.ProfileResponse;
import com.PageLoginJWT.PageLoginJWT.Service.ProfileService;
import com.PageLoginJWT.PageLoginJWT.Service.ProfileServiceimpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController

@AllArgsConstructor
public class ProfileController {
    private final ProfileService profileService;
            @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid @RequestBody ProfileRequest profileRequest)
            {
                ProfileResponse profileResponse=profileService.createProfile(profileRequest);
                //TODO send welcome email
                return (profileResponse);
            }

            @GetMapping("/test")
    public String test()
            {
                return "the auth is working";
            }
}
