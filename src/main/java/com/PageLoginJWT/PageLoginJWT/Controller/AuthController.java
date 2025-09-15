package com.PageLoginJWT.PageLoginJWT.Controller;

import com.PageLoginJWT.PageLoginJWT.IO.AuthRequest;
import com.PageLoginJWT.PageLoginJWT.IO.AuthResponse;
import com.PageLoginJWT.PageLoginJWT.Service.AppUserDetailService;
import com.PageLoginJWT.PageLoginJWT.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private  final AuthenticationManager authenticationManager;
    private final AppUserDetailService appUserDetailService;
    private final JWTUtil jwtUtil;

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


}
