package com.ssafychat.domain.mentoring.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MainInfoDto {

    private Long completeMentoringCount;
    private Long mentorCount;
    private Long menteeCount;
    private RankerDto[] rankers; // 이름, 회사, 직무, 레벨(total score), 멘토링 건수

}
