package com.PageLoginJWT.PageLoginJWT.Controller;

import com.PageLoginJWT.PageLoginJWT.Entity.UserEntity;
import com.PageLoginJWT.PageLoginJWT.IO.AuthRequest;
import com.PageLoginJWT.PageLoginJWT.IO.AuthResponse;
import com.PageLoginJWT.PageLoginJWT.IO.ResetPasswordRequest;
import com.PageLoginJWT.PageLoginJWT.Repository.UserRepository;
import com.PageLoginJWT.PageLoginJWT.Service.AppUserDetailService;
import com.PageLoginJWT.PageLoginJWT.Service.EmailService;
import com.PageLoginJWT.PageLoginJWT.Service.ProfileServiceimpl;
import com.PageLoginJWT.PageLoginJWT.util.JWTUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private  final AuthenticationManager authenticationManager;
    private final AppUserDetailService appUserDetailService;
    private final JWTUtil jwtUtil;
    private final ProfileServiceimpl profileServiceimpl;
    private final EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authrequest)
    {
        try {

            authenticate(authrequest.getEmail(),authrequest.getPassword());
            final UserDetails userDetails=appUserDetailService.loadUserByUsername(authrequest.getEmail());
            //Now that it is authenticated there will me tokens added.
           String jwtToken= jwtUtil.generateTokens(userDetails);
            ResponseCookie responseCookie= ResponseCookie.from("jwt",jwtToken)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(Duration.ofDays(1))
                    .sameSite("Strict").build();
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,responseCookie.toString()).body(
                    new AuthResponse(userDetails.getUsername(),jwtToken)
            );



        }
        catch (BadCredentialsException e)
        {
            Map <String,Object> error=new HashMap<>();
            error.put("error",true);
            error.put("message","There is either password or email wrong");
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(error);

        }
        catch (DisabledException disabledException)
        {
            Map<String ,Object> error=new HashMap<>();
            error.put("error",true);
            error.put("message","the account is disabled");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
        catch (Exception e)
        {
            Map<String ,Object> error=new HashMap<>();
            error.put("error",true);
            error.put("message","the account is disabled");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

    }

    private void authenticate(String email, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
    }

    @GetMapping("/is-Authenticated")
    public ResponseEntity<Boolean> isAuthenticate(@CurrentSecurityContext(expression = "authentication?.name")String email)
    {
        return ResponseEntity.ok(email!=null);
    }

    @PostMapping("/send-reset-otp")
    public void sendResetOtp(@RequestParam String Email)
    {
        try {
            profileServiceimpl.sendResetOtp(Email);
        }
        catch (Exception e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());
        }
        
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request)
    {
        try{

            profileServiceimpl.resetPassword(request.getEmail(), request.getNewPassword(), request.getOtp());
            return ResponseEntity.ok("Password Has Been Reset Successfully");
        }
        catch (Exception e)
        {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }
    @PostMapping("/send-otp")
    public void sendVerifyOtp(@CurrentSecurityContext(expression = "authentication?.name")String email)
    {

        try
        {
            profileServiceimpl.sendOtp(email);
        }
        catch (Exception e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());
        }
    }
    @PostMapping("/verify-otp")
    public void verifyOtp(@RequestBody Map<String ,Object> map,@CurrentSecurityContext(expression = "authentication?.name")String email)
    {
       if (map.get("otp").toString()==null)
        {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Please Give Otp");
        }

        try {
            profileServiceimpl.verifyOtp(email,map.get("otp").toString());



        }
        catch (Exception e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());
        }

    }



}
