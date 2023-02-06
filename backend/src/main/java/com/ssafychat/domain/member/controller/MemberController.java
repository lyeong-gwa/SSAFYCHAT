package com.ssafychat.domain.member.controller;


import com.ssafychat.domain.member.model.Member;
import com.ssafychat.domain.member.service.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class MemberController {
    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
    @Autowired
    private MemberService memberService;

    @GetMapping("/")
    public ResponseEntity<?> aliveCheck() {
        return new ResponseEntity<String>("Alive", HttpStatus.OK);
    }

    @GetMapping("/mentoring-infos") // 프로필, 매칭 멘토링, 완료 멘토링
    public ResponseEntity<?> mentoringInfo(HttpServletRequest request) {
        Member member = (Member) request.getAttribute("USER");

        return new ResponseEntity<>(memberService.getMypage(member), HttpStatus.OK);
    }


    @GetMapping("/registinfo")
    public ResponseEntity<?> socialRegist() {

        return new ResponseEntity<String>("registinfo", HttpStatus.OK);
    }

    @GetMapping("/user-info")
    public ResponseEntity<?> userInfo(HttpServletRequest request) {
        Member member = (Member) request.getAttribute("USER");
        Map<String,Object> user_info =  memberService.userInfo(member);
        return new ResponseEntity<>(user_info, HttpStatus.OK);
    }
    @GetMapping("/login/{social}")
    public ResponseEntity<?> socialLogin(@PathVariable("social") String social) {
        return new ResponseEntity<String>("social:"+social, HttpStatus.OK);
    }

}
