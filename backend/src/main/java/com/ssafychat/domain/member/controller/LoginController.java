package com.ssafychat.domain.member.controller;


import com.ssafychat.domain.member.dto.MemberDto;
import com.ssafychat.domain.member.model.Member;
import com.ssafychat.domain.member.service.MemberService;
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

    @GetMapping("")
    public ResponseEntity<?> aliveCheck() {
        return new ResponseEntity<String>("Alive", HttpStatus.OK);
    }

    @PostMapping("/regist")
    public ResponseEntity<?> registUser(MemberDto member_info) {
        boolean success = memberService.registUser(member_info);
        Map<String,String> response_data= new HashMap<>();
        if(success){
            response_data.put("message","success");
            return new ResponseEntity<>(response_data, HttpStatus.OK);
        }
        response_data.put("message","fail");
        return new ResponseEntity<>(response_data, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/login")
    public ResponseEntity<?> nomalLogin(MemberDto member_info) {
        //사용자가 전달한 email, password와 일치하는 사용자 찾기
        Map<String,String> info = memberService.loginUser(member_info);
        if(info != null){//존재한다면 토큰생성
            return new ResponseEntity<>(info,HttpStatus.OK);
        }
        info = new HashMap<>();
        info.put("message","fail");
        return new ResponseEntity<>(info,HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
