package com.ssafychat.domain.mentoring.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewAndScoreDto {

    private int completeMentoringId;
    private int score;
    private String reviewTitle;
    private String reviewContent;
}
