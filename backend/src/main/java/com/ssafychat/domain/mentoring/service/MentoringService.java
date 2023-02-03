package com.ssafychat.domain.mentoring.service;

import com.ssafychat.domain.member.dto.PossibleMentoringDto;
import com.ssafychat.domain.mentoring.dto.ApplyMentoringDto;
import com.ssafychat.domain.mentoring.dto.ApplyMentoringForMentorDto;
import com.ssafychat.domain.mentoring.dto.MainInfoDto;
import com.ssafychat.domain.mentoring.dto.MatchMentoringForMentorDto;
import com.ssafychat.domain.mentoring.model.ApplyMentoring;
import com.ssafychat.domain.mentoring.model.Mentoring;

import java.sql.Timestamp;
import java.util.List;

public interface MentoringService {

    List<Mentoring> findMentoring();

    ApplyMentoring toEntity(ApplyMentoringDto applyMentoringDto);

    void applyMentoring(ApplyMentoring applyMentoring);

    List<PossibleMentoringDto> getPossibleMentoringList(String job, String company);

    List<ApplyMentoringForMentorDto> getApplyMentoringListForMentor(int userId);
    List<MatchMentoringForMentorDto> getMatchMentoringListForMentor(int userId);

    int deleteMentoringDate(int applyMentoringId);
    ApplyMentoring deleteApplyMentoring(int applyMentoringId);
    Mentoring insertMentoring(int userId, ApplyMentoring applyMentoring, Timestamp time);

    Mentoring deleteMentoring(int mentoringId);
    void insertCancelMentoring(int canceler, String reason, Mentoring mentoring);

    List<Integer> ranking();

    MainInfoDto mainInfo();

}
