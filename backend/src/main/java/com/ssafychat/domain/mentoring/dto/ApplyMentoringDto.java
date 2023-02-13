package com.ssafychat.domain.mentoring.dto;

import lombok.*;

import java.util.Date;

@Data
public class ApplyMentoringDto {

    private String job;
    private String company;
    private Date[] times;


}
