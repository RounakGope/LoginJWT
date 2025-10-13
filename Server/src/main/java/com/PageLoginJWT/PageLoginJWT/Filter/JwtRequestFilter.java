package com.PageLoginJWT.PageLoginJWT.Filter;

import com.PageLoginJWT.PageLoginJWT.Service.AppUserDetailService;
import com.PageLoginJWT.PageLoginJWT.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private  JWTUtil jwtUtil;
    @Autowired
    private  AppUserDetailService appUserDetailService;
    @Autowired
    private static final List<String> Public_Urls=List.of("/register","/login","/reset-password","/send-reset-otp","/logout");


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return Public_Urls.stream().anyMatch(path::startsWith);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
      // String path= request.getContextPath();
       /* if (Public_Urls.contains(path))
        {
            filterChain.doFilter(request,response);//pass on to the next filter
            return;
        }

        */
        String jwt=null;
        String email=null;
        //1 check the authorization header
        final String authorizationHeader= request.getHeader("Authorization");
        if (authorizationHeader!=null&&authorizationHeader.startsWith("Bearer "))
        {
            jwt=authorizationHeader.substring(7);
        }

        //2 if not found in header check in cookies
        if(jwt==null)
        {
            Cookie[] cookies= request.getCookies();
            if (cookies!=null)
            {
                for (Cookie cookie:cookies)
                {
                    if ("jwt".equals(cookie.getName()))
                    {
                        jwt=cookie.getValue();
                        break;
                    }
                }
            }
        }
        //3 now finally validate the token
        if (jwt!=null)
        {
            email=jwtUtil.extractEmail(jwt);
            if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null)
            // No user is currently authenticated in this request
            {
                UserDetails userDetails= appUserDetailService.loadUserByUsername(email);
                if (jwtUtil.isValidate(jwt,userDetails));
                {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=
                            new UsernamePasswordAuthenticationToken(userDetails,null ,userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    //Think of it as a converter that takes raw HTTP request data and packages
                    // it into a Spring Security-friendly object.
                    //Connects servlet world with Spring Security world
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

                }

            }

        }
        filterChain.doFilter(request,response);

    }
}
