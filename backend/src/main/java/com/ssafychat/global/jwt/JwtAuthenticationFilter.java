package com.ssafychat.global.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafychat.domain.member.exception.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter  extends OncePerRequestFilter {
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_TYPE = "Bearer";

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        try {
            // Request Header에서 JWT 토큰 추출
            String token = resolveToken(request);
            // 토큰 유효성 검사
            if (token != null && jwtTokenProvider.validateToken(token)) {
                // (추가) Redis 에 해당 accessToken logout 여부 확인
                String isLogout = (String)redisTemplate.opsForValue().get(token);
                if (ObjectUtils.isEmpty(isLogout)) {
                    // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext 에 저장
                    Authentication authentication = jwtTokenProvider.getAuthentication(token);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    request.setAttribute("USER", authentication.getPrincipal());
                }
            }
            chain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            setErrorResponse(response, ErrorCode.EXPiRED_TOKEN);
        } catch (Exception e) {
            setErrorResponse(response, ErrorCode.INVALID_TOKEN);
        }
    }

    // Request Header 에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TYPE)) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private void setErrorResponse(HttpServletResponse response, ErrorCode errorCode){
        ObjectMapper objectMapper = new ObjectMapper();
        response.setStatus(errorCode.getStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ErrorResponse errorResponse = new ErrorResponse(errorCode.getStatus().value(), errorCode.getMessage());
        try{
            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
        } catch (IOException e){
            e.printStackTrace();
        }
    }

    @Data
    public static class ErrorResponse {
        private final Integer code;
        private final String message;
    }
}
