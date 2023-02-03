package com.ssafychat.domain.mentoring.model;

import com.ssafychat.domain.member.model.Member;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
public class ApplyMentoring {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int applyMentoringId;

    @ManyToOne
    @JoinColumn(name = "mentee_uid", nullable = false)
    private Member mentee;

    @Column(columnDefinition = "VARCHAR(20)", nullable = false)
    private String job;

    @Column(columnDefinition = "VARCHAR(30)", nullable = false)
    private String company;

    //양방향 연결을 위한 설정 : DB에 영향을 주지는 않는다
    @OneToMany(mappedBy = "applyMentoring", cascade = CascadeType.ALL, orphanRemoval=true)
    private List<MentoringDate> mentoringDateList = new ArrayList<>();

}
