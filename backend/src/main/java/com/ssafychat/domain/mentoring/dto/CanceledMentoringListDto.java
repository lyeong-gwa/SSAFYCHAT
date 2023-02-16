package com.ssafychat.domain.mentoring.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class CanceledMentoringListDto {

    private int cancelMentoringId;

    private String name;

    private String job;

    private String company;

    private Date time;

}
