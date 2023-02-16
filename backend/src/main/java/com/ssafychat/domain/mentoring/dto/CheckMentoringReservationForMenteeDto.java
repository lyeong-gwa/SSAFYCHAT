package com.ssafychat.domain.mentoring.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CheckMentoringReservationForMenteeDto {

    private List<ApplyMentoringViewDto> appliedList;
    private List<MentoringListForMenteeDto> matchedList;
    private List<CanceledMentoringListDto> canceledList;

}