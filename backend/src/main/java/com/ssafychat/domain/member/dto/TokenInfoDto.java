package com.ssafychat.domain.member.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
public class TokenInfoDto {

        private String grantType;
        private String accessToken;
        private String refreshToken;
        private Long refreshTokenExpirationTime;
}
