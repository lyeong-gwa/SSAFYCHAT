package com.ssafychat.domain.mentoring.dto;

import lombok.Builder;
import lombok.Data;

import java.sql.Date;

@Data
@Builder
public class MentoringDto {
    private int mentoringId;

    private int menteeUid;

    private int mentorUid;

    private Date time;

    private String job;

    private String company;
}
