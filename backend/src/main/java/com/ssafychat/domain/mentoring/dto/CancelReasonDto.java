package com.ssafychat.domain.mentoring.dto;

import lombok.Data;

@Data
public class CancelReasonDto {

    private int mentoringId;
    private String reason;

}
