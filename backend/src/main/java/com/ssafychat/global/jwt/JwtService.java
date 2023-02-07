package com.ssafychat.global.jwt;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface JwtService {

    <T> String createAccessToken(String key, T data);
    <T> String createRefreshToken(String key, T data);
    <T> String create(String key, T data, String subject, long expire);
    <T> String resolveToken(HttpServletRequest request);
    Map<String, Object> getData(String key);
    boolean validateToken(String jwt);
    <T> Authentication getAuthentication(String token);
}