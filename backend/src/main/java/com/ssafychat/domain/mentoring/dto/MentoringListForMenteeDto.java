package com.ssafychat.domain.mentoring.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
@Data
@Builder
public class MentoringListForMenteeDto {

    private int mentoringId;

    private String name;

    private String job;

    private String company;

    int numberth;

    private Date time;
}
