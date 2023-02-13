package com.ssafychat.domain.member.dto;

import com.ssafychat.domain.mentoring.dto.MyPageCompleteDto;
import com.ssafychat.domain.mentoring.dto.MyPageMatchDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MyPageDto {
    private ProfileDto member;
    private List<MyPageMatchDto> matchMentorings;
    private List<MyPageCompleteDto> completeMentorings;
}
