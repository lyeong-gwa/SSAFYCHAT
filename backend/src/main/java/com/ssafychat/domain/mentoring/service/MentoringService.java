package com.ssafychat.domain.mentoring.service;

import com.ssafychat.domain.member.dto.PossibleMentoringDto;
import com.ssafychat.domain.member.model.Member;
import com.ssafychat.domain.mentoring.dto.*;
import com.ssafychat.domain.mentoring.model.ApplyMentoring;
import com.ssafychat.domain.mentoring.model.Mentoring;

import java.sql.Timestamp;
import java.util.List;

public interface MentoringService {

    List<Mentoring> findMentoring();

//    ApplyMentoring toEntity(ApplyMentoringDto applyMentoringDto);

    void applyMentoring(ApplyMentoring applyMentoring);

    List<PossibleMentoringDto> getPossibleMentoringList(String job, String company);

    List<ApplyMentoringForMentorDto> getApplyMentoringListForMentor(int userId);
    List<MatchMentoringForMentorDto> getMatchMentoringListForMentor(int userId);

    int deleteMentoringDate(int applyMentoringId);
    ApplyMentoring deleteApplyMentoring(int applyMentoringId);
    Mentoring insertMentoring(int userId, ApplyMentoring applyMentoring, Timestamp time);

    Mentoring deleteMentoring(int mentoringId);
    void insertCancelMentoring(int canceler, String reason, Mentoring mentoring);

    Member[] ranking();

    MainInfoDto mainInfo();

    void insertApplyMentoringAndMentoringDate(Member mentee, ApplyMentoringDto applyMentoringDto);

    List<RollingPaperDto> getRollingPaper(Member mentor);
    void updateRollingPaper(RollingPaperDto rollingPaperDto);

    void addReviewAndScore(ReviewAndScoreDto reviewAndScoreDto);

    void reportBadUser(Member reporter, int completeMentoringId, String reason);

    List<ApplyMentoringViewDto> getApplyMentoringList(int userId);

    List<MentoringListForMenteeDto> getMatchedMentoringList(int userId);

    List<CanceledMentoringListDto> getCancledMentoringList(int userId);


}
