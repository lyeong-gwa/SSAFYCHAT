package com.ssafychat.domain.mentoring.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class RankerDto {

    private String name;
    private String company;
    private String job;
    private int level;
    private int mentoringCnt;
}
