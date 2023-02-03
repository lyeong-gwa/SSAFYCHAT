package com.ssafychat.domain.member.service;

import com.ssafychat.domain.member.dto.MemberDto;
import com.ssafychat.domain.member.model.Member;

import java.util.Map;

public interface MemberService {
    public boolean registUser(MemberDto member_info);
    public Map<String,String> loginUser(MemberDto member_info);
    public String createToken(Member member);
    public Map<String,Object> userInfo(Member member);
}
