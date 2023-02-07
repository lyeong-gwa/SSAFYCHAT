package com.ssafychat.domain.member.service;

import com.ssafychat.domain.member.dto.MemberDto;
import com.ssafychat.domain.member.dto.MyPageDto;
import com.ssafychat.domain.member.model.Member;
import com.ssafychat.domain.member.repository.MemberRepository;
import com.ssafychat.domain.mentoring.model.CompleteMentoring;
import com.ssafychat.domain.mentoring.model.Mentoring;
import com.ssafychat.domain.mentoring.repository.CompleteMentoringRepository;
import com.ssafychat.domain.mentoring.repository.MentoringRepository;
import com.ssafychat.global.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder bcryptPasswordEncoder;

    @Autowired
    private MentoringRepository mentoringRepository;

    @Autowired
    private CompleteMentoringRepository completeMentoringRepository;

    //유효성 검사 적용안함, 기능구현까지 -> 나중에 검사하는 로직도 필요
    @Override
    public boolean registUser(MemberDto member_info) {
        Optional<Member> check_member = memberRepository.findByEmail(member_info.getEmail());
        if(check_member.isEmpty()){
            Member regist_user = Member.builder().
                    job(member_info.getJob()).
                    belong(member_info.getBelong()).
                    name(member_info.getName()).
                    email(member_info.getEmail()).
                    password(bcryptPasswordEncoder.encode(member_info.getPassword())).
                    studentNumber(member_info.getStudent_number()).
                    social("싸피").
                    role("role_mentee").
                    build();
            memberRepository.save(regist_user);
            return true;
        }
        return false;
    }

    @Override
    public Map<String,String> loginUser(MemberDto member_info) {
        Optional<Member> check_member = memberRepository.findByEmail(member_info.getEmail());

        if(bcryptPasswordEncoder.matches(member_info.getPassword(),check_member.get().getPassword())){
            String access_token = this.createToken(check_member.get());
            Map<String,String> info = new HashMap<>();
            info.put("accessToken",access_token);
            info.put("refreshToken",check_member.get().getRefreshToken());
            info.put("name",check_member.get().getName());
            return info;
        }
        return null;
    }

    @Override
    public String createToken(Member member) {
        String access_token = jwtService.createAccessToken("user_id", member.getUserId());
        String refresh_token = jwtService.createRefreshToken("user_id", member.getUserId());

        //member 리프레쉬토큰 넣고 DB update
        member.changeRefreshToken(refresh_token);
        memberRepository.save(member);
        return access_token;
    }

    @Override
    public Map<String,Object> userInfo(Member member){
        Map<String,Object> info = new HashMap<>();
        Member token_user = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        info.put("name",token_user.getName());
        info.put("email",token_user.getEmail());
        info.put("studentNumber",token_user.getStudentNumber());
        info.put("social",token_user.getSocial());
        info.put("job",token_user.getJob());
        info.put("belong",token_user.getBelong());
        info.put("totalScore",token_user.getTotalScore());
        info.put("role",token_user.getRole());

        return info;
    }

    @Override
    public MyPageDto getMypage(Member member) {
        // user 정보에서 role 확인해서 서비스 호출
        String role = member.getRole();
        List<Mentoring> matchMentorings = new ArrayList<>();
        List<CompleteMentoring> completeMentorings = new ArrayList<>();

        // 멘티라면 mentee_uid로 조회 : mentoring 테이블, completeMentoring 테이블
        // 멘토라면 mentor_uid로 조회 : mentoring 테이블, completeMentoring 테이블
        if (role.equals("role_mentee")){
            matchMentorings = mentoringRepository.findByMentee(member);
            completeMentorings = completeMentoringRepository.findByMentee(member);
        } else if (role.equals("role_mentor")) {
            matchMentorings = mentoringRepository.findByMentor(member);
            completeMentorings = completeMentoringRepository.findByMentor(member);
        }

        // 멤버 정보까지 담아서 반환
        return MyPageDto.builder()
                .member(member)
                .matchMentorings(matchMentorings)
                .completeMentorings(completeMentorings)
                .build();
    }

}
