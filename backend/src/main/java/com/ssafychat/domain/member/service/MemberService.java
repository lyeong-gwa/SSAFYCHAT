package com.ssafychat.domain.member.service;

import com.ssafychat.domain.member.dto.MemberDto;
import com.ssafychat.domain.member.dto.MyPageDto;
import com.ssafychat.domain.member.model.Member;

import java.util.Map;

public interface MemberService {
    boolean registUser(MemberDto memberInfo);
//    Map<String,String> loginUser(MemberDto memberInfo);
    Map<String,String> loginUser(String email, String password);
    String createToken(Member member);
    Map<String,Object> userInfo(Member member);

    MyPageDto getMypage(Member member);

    void deleRefreshToken(int id, String empty);

}
