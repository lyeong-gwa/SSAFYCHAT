package com.ssafychat.global.jwt;

import com.ssafychat.domain.member.service.MemberDetailsImpl;
import com.ssafychat.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
@RequiredArgsConstructor
@Component
public class JwtServiceImpl implements JwtService {

    @Autowired
    private MemberDetailsImpl memberDetails;

    private static final Logger logger = LoggerFactory.getLogger(JwtServiceImpl.class);

    @Value("${jwt-token}")
    private String JWT_TOKEN;

    private static final int ACCESS_TOKEN_EXPIRE_MINUTES = 60; // 분단위
    private static final int REFRESH_TOKEN_EXPIRE_MINUTES = 2; // 주단위

    @Override
    public <T> String createAccessToken(String key, T data) {
        return create(key, data, "access-token", 1000 * 60 * ACCESS_TOKEN_EXPIRE_MINUTES);
    }

    @Override
    public <T> String createRefreshToken(String key, T data) {
        return create(key, data, "refresh-token", 1000 * 60 * 60 * 24 * 7 * REFRESH_TOKEN_EXPIRE_MINUTES);
    }

    @Override
    public <T> String create(String key, T data, String subject, long expire) {
        String jwt = Jwts.builder()
                // Header 설정 : 토큰의 타입, 해쉬 알고리즘 정보 세팅.
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("regDate", System.currentTimeMillis()) // 생성 시간
                // Payload 설정 : 유효기간(Expiration), 토큰 제목 (Subject), 데이터 (Claim) 등 정보 세팅.
                .setExpiration(new Date(System.currentTimeMillis() + expire)) // 토큰 유효기간
                .setSubject(subject) // 토큰 제목 설정 ex) access-token, refresh-token
                .claim(key, data) // 저장할 데이터
                // Signature 설정 : secret key를 활용한 암호화.
                .signWith(SignatureAlgorithm.HS256, this.generateKey())
                .compact(); // 직렬화 처리.
        return jwt;
    }

    // Signature 설정에 들어갈 key 생성.
    private byte[] generateKey() {
        byte[] key = null;
        try {
            // charset 설정 안하면 사용자 플랫폼의 기본 인코딩 설정으로 인코딩 됨.
            key = JWT_TOKEN.getBytes("UTF-8");
        } catch (Exception e) {
            if (logger.isInfoEnabled()) {
                e.printStackTrace();
            } else {
                logger.error("JWT토큰 생성중 에러발생 : {}", e.getMessage());
            }
        }

        return key;
    }

    @Override
    public boolean validateToken(String jwt) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(jwt);
            logger.debug("토큰체크하기 : {}", claims);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public <T> Authentication getAuthentication(String token) {
        String user_id = String.valueOf(this.getData(token).get("user_id"));
        UserDetails userDetails = memberDetails.loadUserByUsername(user_id);
        return new UsernamePasswordAuthenticationToken(userDetails, "",
                userDetails.getAuthorities());
    }

    @Override
    public Map<String, Object> getData(String token) {
        Map<String, Object> value = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(token).getBody();
        return value;
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }
}