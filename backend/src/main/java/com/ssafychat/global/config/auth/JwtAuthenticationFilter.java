package com.ssafychat.global.config.auth;

import com.ssafychat.domain.member.model.Member;
import com.ssafychat.global.jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.StringTokenizer;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest servletRequest,
                                    HttpServletResponse servletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        String header_auth = jwtService.resolveToken(servletRequest);
        if (header_auth != null && header_auth.startsWith("Bearer ")) {
            String token = header_auth.replace("Bearer ", "");
            if(jwtService.validateToken(token)){
                Authentication authentication = jwtService.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                servletRequest.setAttribute("USER",(Member)authentication.getPrincipal());
            }else{
                SecurityContextHolder.getContext().setAuthentication(null);
            }
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }
}