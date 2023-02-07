package com.ssafychat.domain.member.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
public class Member implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(columnDefinition = "VARCHAR(20)")
    private String job;

    @Column(columnDefinition = "VARCHAR(30)")
    private String belong;

    @Column(columnDefinition = "VARCHAR(15)", nullable = false)
    private String role;

    private int totalScore;

    @Column(columnDefinition = "VARCHAR(50)", nullable = false, unique = true)
    private String email;

    //나중에 JsonProperty 어노테이션 추가
    @Column(columnDefinition = "VARCHAR(100)", nullable = false)
    private String password;

    @Column(columnDefinition = "VARCHAR(10)", nullable = false)
    private String social;

    @Column(columnDefinition = "VARCHAR(10)", nullable = false, unique = true)
    private String studentNumber;

    @Column(columnDefinition = "VARCHAR(1000)")
    private String refreshToken;

    @Column(columnDefinition = "VARCHAR(10)", nullable = false)
    private String name;

    public void changeRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }



    //시큐리티 관련
    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override //해당유저의 권한정보 출력
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override // 시큐리티에서 구분하는 사용자 id
    public String getUsername() {
        return Integer.toString(this.userId);
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override //계정 만료되었는지 체크
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override //계정이 잠겼는지 체크
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override //계정 패스워드 만료 체크
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override //계정이 사용가능한지 체크
    public boolean isEnabled() {
        return true;
    }
}
