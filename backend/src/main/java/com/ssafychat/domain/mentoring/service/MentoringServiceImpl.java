package com.ssafychat.domain.mentoring.service;

import com.ssafychat.domain.member.repository.MemberRepository;
import com.ssafychat.domain.member.dto.PossibleMentoringDto;
import com.ssafychat.domain.member.model.Member;
import com.ssafychat.domain.mentoring.dto.*;
import com.ssafychat.domain.mentoring.model.*;
import com.ssafychat.domain.mentoring.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class MentoringServiceImpl implements MentoringService {

    @Autowired
    private MentoringRepository mentoringRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ApplyMentoringRepository applyMentoringRepository;

    @Autowired
    private MentoringDateRepository mentoringDateRepository;
    @Autowired
    private CancelMentoringRepository cancelMentoringRepository;

    @Autowired
    private CompleteMentoringRepository completeMentoringRepository;

    @Override
    public List<Mentoring> findMentoring(){
        return mentoringRepository.findAll();
    }


//    @Transactional
//    public ApplyMentoring toEntity(ApplyMentoringDto applyMentoringDto){
//
//        Optional<Member> memberOptional = memberRepository.findById(applyMentoringDto.getMenteeUid());
//        Member member = memberOptional.get();
//        return ApplyMentoring.builder()
//                .applyMentoringId(applyMentoringDto.getApplyMentoringId())
//                .mentee(member)
//                .job(applyMentoringDto.getJob())
//                .company(applyMentoringDto.getCompany())
//                .build();
//    }
    @Override
    public void applyMentoring(ApplyMentoring applyMentoring) {
        this.applyMentoringRepository.save(applyMentoring);

    }

    public List<PossibleMentoringDto> getPossibleMentoringList(String job, String belong) {
        return memberRepository.findDistinctByJobAndBelong(job, belong);
    }

    @Override
    public List<ApplyMentoringForMentorDto> getApplyMentoringListForMentor(int userId) {

        System.out.println("getApplyMentoringListForMentor() 호출");
        List<ApplyMentoringForMentorDto> applyList = new ArrayList<>();
        // 식별자로 직무, 회사 조회.
        Member mentor = memberRepository.findByUserId(userId).get();
        String job = mentor.getJob();
        String belong = mentor.getBelong();
        // applymentoring 테이블에서 본인 직무, 회사에 맞는 목록 불러오기
        List<ApplyMentoring> applyMentoringsForMentor = applyMentoringRepository.findByJobAndCompany(job, belong);

        for (int i = 0; i < applyMentoringsForMentor.size(); i++) {
            System.out.println(applyMentoringsForMentor.get(i));
            ApplyMentoring applyMentoring = applyMentoringsForMentor.get(i);
            Member mentee = applyMentoring.getMentee();
            System.out.println(mentee.getName());
            System.out.println(applyMentoring.getApplyMentoringId());
//            System.out.println(mentoringDateRepository.findByApplyMentoring(2));
            MentoringDateDto mentoringDateDto = MentoringDateDto.builder().applyMentoringId(applyMentoring.getApplyMentoringId()).build();
//            System.out.println("mentoringDateDto 생성");
//            MentoringDate mentoringDate = this.toEntity(mentoringDateDto);
            System.out.println("mentoringDateDto => mentoringDate");
//            System.out.println(new Date());
//            System.out.println(mentoringDate);
//            System.out.println(mentoringDate.getApplyMentoring());


            List<MentoringDate> dates = mentoringDateRepository.findByApplyMentoring_ApplyMentoringId(mentoringDateDto.getApplyMentoringId());
            System.out.println("dates 조회 후"); // 여기까지 됐다!
            Timestamp[] times = new Timestamp[dates.size()];
            for (int j = 0; j < times.length; j++) {
                times[j] = dates.get(j).getTime();
            }
            applyList.add(
                    ApplyMentoringForMentorDto.builder()
                            .applyMentoringId(applyMentoring.getApplyMentoringId())
                            .name(mentee.getName())
                            .studentNumber(mentee.getStudentNumber())
                            .numberth(Integer.parseInt(mentee.getStudentNumber().substring(0,2)))
                            .email(mentee.getEmail())
                            .times(times)
                            .build()
            );
        }
        return applyList;
    }

    @Override
    public List<MatchMentoringForMentorDto> getMatchMentoringListForMentor(int userId) {
        // List<Mentoring>에 mentoring 테이블에서 멘토 uid와 일치하는 목록 담기

        System.out.println("getMatchMentoringListForMentor() 호출");
        List<MatchMentoringForMentorDto> matchList = new ArrayList<>();
        // 본인 식별자로 mentoring(멘토링) 테이블 조회
        List<Mentoring> mathcMentoringsForMentor = mentoringRepository.findByMentor_UserId(userId);

        for (int i = 0; i < mathcMentoringsForMentor.size(); i++) {
            System.out.println(mathcMentoringsForMentor.get(i));
            Mentoring mentoring = mathcMentoringsForMentor.get(i);
            Member mentee = mentoring.getMentee();
            System.out.println(mentee.getName());
            System.out.println(mentoring.getMentoringId());

            matchList.add(
                    MatchMentoringForMentorDto.builder()
                            .MentoringId(mentoring.getMentoringId())
                            .name(mentee.getName())
                            .studentNumber(mentee.getStudentNumber())
                            .numberth(Integer.parseInt(mentee.getStudentNumber().substring(0,2)))
                            .email(mentee.getEmail())
                            .time(mentoring.getTime())
                            .build()
            );
        }
        return matchList;
    }

    @Override
    public int deleteMentoringDate(int applyMentoringId) {
        return mentoringDateRepository.deleteMentoringDatesByApplyMentoring_ApplyMentoringId(applyMentoringId);
    }

    @Override
    public ApplyMentoring deleteApplyMentoring(int applyMentoringId) {
        ApplyMentoring applyMentoring = applyMentoringRepository.findByApplyMentoringId(applyMentoringId);
        applyMentoringRepository.deleteApplyMentoringByApplyMentoringId(applyMentoringId);
        return applyMentoring;
    }

    @Override
    public Mentoring insertMentoring(int userId, ApplyMentoring applyMentoring, Timestamp time) {
        // userId는 mentor_uid가 된다.
        // applyMentoring에서 job, company, mentee_uid를 가져온다.
        // time을 넣는다.
        Mentoring mentoring = Mentoring.builder()
                .mentor(memberRepository.findByUserId(userId).get())
                .mentee(applyMentoring.getMentee())
                .job(applyMentoring.getJob())
                .company(applyMentoring.getCompany())
                .time(time)
                .build();
        // insert!
        mentoringRepository.save(mentoring);
        return mentoring;
    }

    @Override
    public Mentoring deleteMentoring(int mentoringId) {
        System.out.println(mentoringId);
        Mentoring mentoring = mentoringRepository.findByMentoringId(mentoringId);
        System.out.println(mentoring);

        mentoringRepository.deleteMentoringByMentoringId(mentoringId);
        return mentoring;
    }

    @Override
    public void insertCancelMentoring(int canceler, String reason, Mentoring mentoring) {
        CancelMentoring cancelMentoring = CancelMentoring.builder()
                .mentor(mentoring.getMentor())
                .mentee(mentoring.getMentee())
                .company(mentoring.getCompany())
                .job(mentoring.getJob())
                .time(mentoring.getTime())
                .canceler(canceler)
                .reason(reason)
                .build();
        cancelMentoringRepository.save(cancelMentoring);
    }

    @Override
    public Member[] ranking() {

        List<Integer> rankerIds = completeMentoringRepository.findRanking();
        Member[] rankers = new Member[3];
        for (int i = 0; i < 3; i++) {
            rankers[i] = memberRepository.findByUserIdForRanker(rankerIds.get(i));
        }
        return rankers;
    }

    @Override
    public MainInfoDto mainInfo() {
        MainInfoDto mainInfoDto = MainInfoDto.builder()
                .completeMentoringCount(completeMentoringRepository.completeMentoringCount())
                .mentorCount(memberRepository.countByRole("role_mentor"))
                .menteeCount(memberRepository.countByRole("role_mentee"))
                .rankers(ranking())
                .build();

        return mainInfoDto;
    }

    @Override
    public void insertApplyMentoringAndMentoringDate(Member mentee, ApplyMentoringDto applyMentoringDto) {
        // applyMentoring 테이블에 job, company, mentee 빌딩해서 insert 후
        ApplyMentoring applyMentoring = ApplyMentoring.builder()
                .mentee(mentee)
                .company(applyMentoringDto.getCompany())
                .job(applyMentoringDto.getJob())
                .build();
        ApplyMentoring savedApplyMentoring = applyMentoringRepository.save(applyMentoring);
        // applyMentoring id 반환 받아서
        // date 테이블에 time과 applyMentoring id 배열 크기만큼 반복하면서 insert
        for (Timestamp time : applyMentoringDto.getTimes()) {
            MentoringDate mentoringDate = MentoringDate.builder()
                    .applyMentoring(savedApplyMentoring)
                    .time(time)
                    .build();
            mentoringDateRepository.save(mentoringDate);
        }
    }

    @Override
    public List<RollingPaperDto> getRollingPaper(Member mentor) {
        // completeMentoring에서 userId == mentor_uid인 데이터 조회
        List<CompleteMentoring> completeMentorings = completeMentoringRepository.findByMentor(mentor);
        // rollingPaperDto에 담아서 반환
        List<RollingPaperDto> rollingPapers = new ArrayList<>();
        for (CompleteMentoring completeMentoring : completeMentorings) {
            RollingPaperDto rollingPaper = RollingPaperDto.builder()
                    .completeMentoringId(completeMentoring.getCompleteMentoringId())
                    .reviewTitle(completeMentoring.getReviewTitle())
                    .reviewContent(completeMentoring.getReviewContent())
                    .reviewHeight(completeMentoring.getReviewHeight())
                    .reviewWidth(completeMentoring.getReviewWidth())
                    .reviewSelected(completeMentoring.getReviewSelected())
                    .build();
            rollingPapers.add(rollingPaper);
        }
        return rollingPapers;
    }

    @Override
    public void updateRollingPaper(RollingPaperDto rollingPaperDto) {
        // 서비스에서 rollingPaperDto 정보 completeMentoring 엔티티에 담아서 update
        CompleteMentoring completeMentoring = completeMentoringRepository.findByCompleteMentoringId(rollingPaperDto.getCompleteMentoringId());
        completeMentoring.setReviewTitle(rollingPaperDto.getReviewTitle());
        completeMentoring.setReviewContent(rollingPaperDto.getReviewContent());
        completeMentoring.setReviewSelected(rollingPaperDto.getReviewSelected());
        completeMentoring.setReviewWidth(rollingPaperDto.getReviewWidth());
        completeMentoring.setReviewHeight(rollingPaperDto.getReviewHeight());
        completeMentoringRepository.save(completeMentoring);
    }

}
