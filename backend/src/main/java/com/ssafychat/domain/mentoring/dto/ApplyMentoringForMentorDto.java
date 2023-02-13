package com.ssafychat.domain.mentoring.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ApplyMentoringForMentorDto {

    // 이름, 학번(기수), 이메일, 시간들

    private int applyMentoringId;
    private String name;
    private String studentNumber;
    private int numberth;
    private String email;
    private Date[] times;
}
