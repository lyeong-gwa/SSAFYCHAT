package com.ssafychat.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class MemberDto {
    private String email;
    private String password;
    private String student_number;
    private String name;
    private String job;
    private String belong;
}
