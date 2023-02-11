package com.ssafychat.domain.mentoring.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RollingPaperDto {
    // 프론튼에서 필요한 정보 : 후기 제목, 후기 내용, 선택 여부, 좌표(height, width)
    // 백에서 필요한 정보 : 수정에 대비하여 완료멘토링id
    // 리뷰 제목 제거
    private int completeMentoringId;
    private String reviewContent;
    private int reviewSelected;
    private int reviewWidth;
    private int reviewHeight;
}
