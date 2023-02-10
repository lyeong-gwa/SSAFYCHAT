package com.ssafychat.domain.member.controller;


import com.ssafychat.domain.member.dto.MemberDto;
import com.ssafychat.domain.member.dto.TokenInfoDto;
import com.ssafychat.domain.member.service.MemberService;
import com.ssafychat.domain.member.service.MemberServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin("*")
public class LoginController {

    private final MemberService memberService;

    public LoginController(MemberServiceImpl memberService) {
        this.memberService = memberService;
    }

    @GetMapping("")
    public ResponseEntity<?> aliveCheck() {
        return new ResponseEntity<>("Alive", HttpStatus.OK);
    }

    @PostMapping("/regist")
    public ResponseEntity<?> registUser(@RequestBody MemberDto memberInfo) {
        boolean success = memberService.registUser(memberInfo);
        Map<String,String> response_data= new HashMap<>();
        if(success){
            response_data.put("message","success");
            return new ResponseEntity<>(response_data, HttpStatus.OK);
        }
        response_data.put("message","fail");
        return new ResponseEntity<>(response_data, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/login")
    public ResponseEntity<?> nomalLogin(@RequestBody Map<String, String> user) {

        String email = user.get("email");
        String password = user.get("password");
        //아이디 체크는 Authentication 에 사용자 입력 아이디, 비번을 넣어줘야지 작동

        Map<String, String> info = memberService.loginUser(email, password);
        if(info != null){ // 존재한다면 토큰생성
            return new ResponseEntity<>(info, HttpStatus.OK);
        }
        info = new HashMap<>();
        info.put("message","fail");
        return new ResponseEntity<>(info,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> refreshToken(@RequestBody TokenInfoDto tokenInfo) {
        Map<String, String> response = memberService.reissue(tokenInfo);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        Map<String, String> response = memberService.logout(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
