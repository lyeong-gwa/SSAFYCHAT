package com.ssafychat.domain.member.service;

import com.ssafychat.domain.member.dto.MemberDto;
import com.ssafychat.domain.member.dto.MyPageDto;
import com.ssafychat.domain.member.dto.TokenInfoDto;
import com.ssafychat.domain.member.model.Member;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface MemberService {
    boolean registUser(MemberDto memberInfo);
    Map<String,String> loginUser(String email, String password);
//    String createToken(Member member);
    Map<String,Object> userInfo(Member member);

    MyPageDto getMypage(Member member);

    Map<String, String> reissue(TokenInfoDto reissue);

    Map<String, String> logout(HttpServletRequest request);

}
