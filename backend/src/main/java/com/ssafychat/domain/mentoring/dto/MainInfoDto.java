package com.ssafychat.domain.mentoring.dto;

import com.ssafychat.domain.member.model.Member;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MainInfoDto {

    private Long completeMentoringCount;
    private Long mentorCount;
    private Long menteeCount;
    private Member[] rankers;
    private List<Integer> rankerCompleteCount;

}
