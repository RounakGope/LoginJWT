package com.PageLoginJWT.PageLoginJWT.util;

import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Component
public class JWTUtil {

    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    private Key key;

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }



    public String generateTokens(UserDetails userDetails)
    {
        Map <String , Object> claims=new HashMap<>();
        return createToken(claims,userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String username) {

        String jwt = Jwts.builder()
                .claims(claims) // same as setClaims()
                .subject(username) // same as setSubject()
                .issuedAt(Date.from(Instant.now())) // still uses Date.from() but not deprecated
                .expiration(Date.from(Instant.now().plusSeconds(1*60*60*10))) // 10 hour expiry
                .signWith(key)
                .compact();
        return jwt;

    }
}
