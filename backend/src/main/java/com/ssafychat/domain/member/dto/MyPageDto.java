package com.ssafychat.domain.member.dto;

import com.ssafychat.domain.member.model.Member;
import com.ssafychat.domain.mentoring.model.CompleteMentoring;
import com.ssafychat.domain.mentoring.model.Mentoring;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MyPageDto {
    private Member member;
    private List<Mentoring> matchMentorings;
    private List<CompleteMentoring> completeMentorings;
}
