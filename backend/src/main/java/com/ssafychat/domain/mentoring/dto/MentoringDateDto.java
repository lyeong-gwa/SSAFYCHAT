package com.ssafychat.domain.mentoring.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;


@Data
@Builder
public class MentoringDateDto {
    private Date time;
    private int applyMentoringId;
}
