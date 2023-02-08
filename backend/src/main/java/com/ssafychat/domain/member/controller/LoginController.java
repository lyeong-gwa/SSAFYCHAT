package com.ssafychat.domain.member.controller;


import com.ssafychat.domain.member.dto.MemberDto;
import com.ssafychat.domain.member.service.MemberService;
import com.ssafychat.global.jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("")
    public ResponseEntity<?> aliveCheck() {
        return new ResponseEntity<String>("Alive", HttpStatus.OK);
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
        //사용자가 전달한 email, password와 일치하는 사용자 찾기
        String email = user.get("email");
        String password = user.get("password");
        Map<String,String> info = memberService.loginUser(email, password);
        if(info != null){ // 존재한다면 토큰생성
            return new ResponseEntity<>(info, HttpStatus.OK);
        }
        info = new HashMap<>();
        info.put("message","fail");
        return new ResponseEntity<>(info,HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
