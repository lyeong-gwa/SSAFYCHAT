package com.ssafychat.domain.mentoring.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class MatchMentoringForMentorDto {
    // 확정 시간, 멘티 이름, 멘티기수, 멘티 이메일
    private int MentoringId;
    private String name;
    private String studentNumber;
    private int numberth;
    private String email;
    private Date time;
}
