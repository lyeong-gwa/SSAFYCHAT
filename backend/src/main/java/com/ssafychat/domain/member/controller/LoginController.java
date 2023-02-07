package com.ssafychat.domain.member.controller;


import com.ssafychat.domain.member.dto.MemberDto;
import com.ssafychat.domain.member.model.Member;
import com.ssafychat.domain.member.service.MemberService;
import com.ssafychat.global.jwt.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
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
    public ResponseEntity<?> registUser(MemberDto memberInfo) {
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


//    @GetMapping("/info/{id}")
//    public ResponseEntity<?> getInfo(@PathVariable("id") String userid, HttpServletRequest request) {
////		logger.debug("userid : {} ", userid);
//        Map<String, Object> resultMap = new HashMap<>();
//        HttpStatus status = HttpStatus.UNAUTHORIZED;
//        if (jwtService.validateToken(request.getHeader("access-token"))) {
////            log.info("사용 가능한 토큰!!!");
//            try {
////				로그인 사용자 정보.
//                // 리프레시 토큰으로 멤버 테이블 조회해서 멤버 정보 조회 후 userInfo에 사용자 정보 반환
//                MemberDto memberDto = memberService.userInfo(member);
//                resultMap.put("userInfo", memberDto);
//                resultMap.put("message", "SUCCESS");
//                status = HttpStatus.ACCEPTED;
//            } catch (Exception e) {
////                log.error("정보조회 실패 : {}", e);
//                resultMap.put("message", e.getMessage());
//                status = HttpStatus.INTERNAL_SERVER_ERROR;
//            }
//        } else {
////            log.error("사용 불가능 토큰!!!");
//            resultMap.put("message", "FAIL");
//            status = HttpStatus.UNAUTHORIZED;
//        }
//        return new ResponseEntity<Map<String, Object>>(resultMap, status);
//    }
//    @ApiOperation(value = "로그아웃", notes = "회원 정보를 담은 Token을 제거한다.", response = Map.class)
//    @GetMapping("/logout")
//    public ResponseEntity<?> removeToken(HttpServletRequest request) {
//        Member member = (Member) request.getAttribute("USER");
//        Map<String, Object> resultMap = new HashMap<>();
//        HttpStatus status = HttpStatus.ACCEPTED;
//        try {
//            memberService.deleRefreshToken(member.getUserId(), "");
//            resultMap.put("message", "success");
//            status = HttpStatus.ACCEPTED;
//        } catch (Exception e) {
//            log.error("로그아웃 실패 : {}", e);
//            resultMap.put("message", e.getMessage());
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//        }
//        return new ResponseEntity<Map<String, Object>>(resultMap, status);
//
//    }

//    @ApiOperation(value = "Access Token 재발급", notes = "만료된 access token을 재발급받는다.", response = Map.class)
//    @PostMapping("/refresh")
//    public ResponseEntity<?> refreshToken(@RequestBody MemberDto memberDto, HttpServletRequest request)
//            throws Exception {
//        Map<String, Object> resultMap = new HashMap<>();
//        HttpStatus status = HttpStatus.ACCEPTED;
//        String token = request.getHeader("refresh-token");
//        log.debug("token : {}, memberDto : {}", token, memberDto);
//        if (jwtService.checkToken(token)) {
//            if (token.equals(memberService.getRefreshToken(memberDto.getId()))) {
//                String accessToken = jwtService.createAccessToken("id", memberDto.getId());
//                log.debug("token : {}", accessToken);
//                log.debug("정상적으로 액세스토큰 재발급!!!");
//                resultMap.put("access-token", accessToken);
//                resultMap.put("message", SUCCESS);
//                status = HttpStatus.ACCEPTED;
//            }
//        } else {
//            log.debug("리프레쉬토큰도 사용불가!!!!!!!");
//            status = HttpStatus.UNAUTHORIZED;
//        }
//        return new ResponseEntity<Map<String, Object>>(resultMap, status);
//    }
}
