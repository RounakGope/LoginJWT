package com.PageLoginJWT.PageLoginJWT.Config;

import com.PageLoginJWT.PageLoginJWT.Filter.JwtRequestFilter;
import com.PageLoginJWT.PageLoginJWT.Service.AppUserDetailService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.net.http.HttpResponse;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {


    private final AppUserDetailService appUserDetailService;
    private final JwtRequestFilter jwtRequestFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth->auth
                        .requestMatchers("/login","/logout","/register","/reset-password","/send-reset-otp").permitAll()
                        .anyRequest().authenticated())
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .logout(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public CorsFilter corsFilter()
    {
        return new CorsFilter(corsConfigurationSource());
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource()
    {
        CorsConfiguration config=new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173","https://login-jwt-five.vercel.app"
        ,"https://login-h7gir9r7v-rounaks-projects-d9142608.vercel.app"));
        config.setAllowedMethods(List.of("POST","GET","PUT","DELETE","PATCH","OPTIONS"));
        config.setAllowCredentials(true);
        config.setAllowedHeaders(List.of("Authorization","Content-Type"));
        //This is a Spring class that maps URL patterns to CORS rules.
        UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",config);

        return source;
    }
    @Bean
    public AuthenticationManager manager(AuthenticationConfiguration configuration)//This method wires up the authentication mechanism
    // of Spring Security to use your custom database users + password hashing.
    {
        DaoAuthenticationProvider auth=new DaoAuthenticationProvider(appUserDetailService);
       // auth.setUserDetailService();
        auth.setPasswordEncoder(passwordEncoder());
        return  new ProviderManager(auth);

    }


}
