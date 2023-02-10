package com.ssafychat.domain.member.service;

import com.ssafychat.domain.member.dto.MemberDto;
import com.ssafychat.domain.member.dto.MyPageDto;
import com.ssafychat.domain.member.dto.TokenInfoDto;
import com.ssafychat.domain.member.model.Member;
import com.ssafychat.domain.member.repository.MemberRepository;
import com.ssafychat.domain.mentoring.model.CompleteMentoring;
import com.ssafychat.domain.mentoring.model.Mentoring;
import com.ssafychat.domain.mentoring.repository.CompleteMentoringRepository;
import com.ssafychat.domain.mentoring.repository.MentoringRepository;
import com.ssafychat.global.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Service
@Slf4j
public class MemberServiceImpl implements MemberService {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private BCryptPasswordEncoder bcryptPasswordEncoder;

    @Autowired
    private MentoringRepository mentoringRepository;

    @Autowired
    private CompleteMentoringRepository completeMentoringRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private final AuthenticationManager authenticationManager;
    private final RedisTemplate<String, Object> redisTemplate;


    //유효성 검사 적용안함, 기능구현까지 -> 나중에 검사하는 로직도 필요
    @Override
    public boolean registUser(MemberDto memberInfo) {
        Member checkMember = memberRepository.findByEmail(memberInfo.getEmail());

//        if(checkMember.isEmpty()){
        if(checkMember == null){
            Member registUser = Member.builder().
                    job(memberInfo.getJob()).
                    belong(memberInfo.getBelong()).
                    name(memberInfo.getName()).
                    email(memberInfo.getEmail()).
                    password(bcryptPasswordEncoder.encode(memberInfo.getPassword())).
                    studentNumber(memberInfo.getStudent_number()).
                    social("싸피").
                    role("role_mentee").
                    build();
            List<String> roleArray = registUser.getRoles();
            roleArray.add("role_mentee");
            registUser.setRoles(roleArray);
            memberRepository.save(registUser);
            return true;
        }
        return false;
    }


    @Override
    public Map<String,String> loginUser(String email, String password) {

        Member loginMember = memberRepository.findByEmail(email);

        if (loginMember == null) {
            log.error("해당하는 유저가 존재하지 않습니다.");
            return null;
        }

        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenInfoDto tokenInfo = jwtTokenProvider.generateToken(authentication);

        // 4. RefreshToken Redis 저장 (expirationTime 설정을 통해 자동 삭제 처리)
        redisTemplate.opsForValue()
                .set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        Map<String,String> info = new HashMap<>();
        info.put("accessToken", tokenInfo.getAccessToken());
        info.put("refreshToken", tokenInfo.getRefreshToken());
        info.put("name", loginMember.getName());
        return info;
    }

    @Override
    public Map<String, String> reissue(TokenInfoDto reissue) {
        // 1. Refresh Token 검증
        if (!jwtTokenProvider.validateToken(reissue.getRefreshToken())) {
            log.error("Refresh Token 정보가 유효하지 않습니다.");
            return null;
        }

        // 2. Access Token 에서 userId 을 가져옵니다.
        Authentication authentication = jwtTokenProvider.getAuthentication(reissue.getAccessToken());

        // 3. Redis 에서 userId 을 기반으로 저장된 Refresh Token 값을 가져옵니다.
        String refreshToken = (String)redisTemplate.opsForValue().get("RT:" + authentication.getName());
        // (추가) 로그아웃되어 Redis 에 RefreshToken 이 존재하지 않는 경우 처리
        if(ObjectUtils.isEmpty(refreshToken)) {
            log.error("잘못된 요청입니다.");
            return null;
        }
        if(!refreshToken.equals(reissue.getRefreshToken())) {
            log.error("Refresh Token 정보가 일치하지 않습니다.");
            return null;
        }

        // 4. 새로운 토큰 생성
        TokenInfoDto tokenInfo = jwtTokenProvider.generateToken(authentication);

        // 5. RefreshToken Redis 업데이트
        redisTemplate.opsForValue()
                .set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        Map<String, String> response = new HashMap<>();
        response.put("accessToken", tokenInfo.getAccessToken());
        response.put("refreshToken", tokenInfo.getRefreshToken());
        response.put("message", "accessToken 재발급 성공");

        return response;
    }

    @Override
    public Map<String, String> logout(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (!StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            log.error("토큰 없음");
            return null;
        }
        String accessToken = bearerToken.substring(7);

        // 1. Access Token 검증
        if (!jwtTokenProvider.validateToken(accessToken)) {
            log.error("잘못된 요청입니다.");
            return null;
        }

        // 2. Access Token 에서 User id을 가져옵니다.
        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);

        // 3. Redis 에서 해당 User id 로 저장된 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제합니다.
        if (redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
            // Refresh Token 삭제
            redisTemplate.delete("RT:" + authentication.getName());
        }

        // 4. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
        Long expiration = jwtTokenProvider.getExpiration(accessToken);
        redisTemplate.opsForValue()
                .set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);

        Map<String, String> response = new HashMap<>();
        response.put("message", "로그아웃 되었습니다.");

        return response;
    }

    @Override
    public Map<String,Object> userInfo(Member member){
        System.out.println("userInfo 호출");
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
        System.out.println("member " + member);
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
