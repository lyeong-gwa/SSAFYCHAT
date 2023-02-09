package com.ssafychat.domain.mentoring.dto;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;


@Data
@Builder
public class MentoringDateDto {
    private Timestamp time;
    private int applyMentoringId;
}
