package com.ssafychat.domain.mentoring.dto;

import com.ssafychat.domain.member.model.Member;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MainInfoDto {

    private Long completeMentoringNum;
    private Long mentorNum;
    private Long menteeNum;
    private Member[] rankers;
}
