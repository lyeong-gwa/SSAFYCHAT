package com.ssafychat.domain.mentoring.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MentoringListForMentorDto {
    private List<ApplyMentoringForMentorDto> applys;
    private List<MatchMentoringForMentorDto> matches;
}
