package com.ssafychat.domain.mentoring.dto;

import com.ssafychat.domain.member.dto.ProfileDto;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@Data
public class MyPageCompleteDto {

    private int completeMentoringId;

    private ProfileDto mentor;

    private ProfileDto mentee;

    private Date time;

}
