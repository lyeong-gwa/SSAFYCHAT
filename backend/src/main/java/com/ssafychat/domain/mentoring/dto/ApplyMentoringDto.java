package com.ssafychat.domain.mentoring.dto;

import lombok.*;

import java.sql.Timestamp;

@Data
public class ApplyMentoringDto {

    private String job;
    private String company;
    private Timestamp[] times;


}
