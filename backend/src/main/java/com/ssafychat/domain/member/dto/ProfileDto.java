package com.ssafychat.domain.member.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProfileDto {
    // 이름, 회사, 직무, 레벨(토탈 스코어), 기수, 이메일

    private int userId;
    private String name;
    private String belong;
    private String job;
    private String email;
    private int level;
    private String student_number;
}
