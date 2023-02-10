package com.ssafychat.domain.mentoring.model;

import com.ssafychat.domain.member.model.Member;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
public class Mentoring {

    @Id
    private int mentoringId;

    @ManyToOne
    @JoinColumn(name = "mentee_uid", nullable = false)
    private Member mentee;

    @ManyToOne
    @JoinColumn(name = "mentor_uid", nullable = false)
    private Member mentor;

    @Column(nullable = false)
    private Date time;

    @Column(columnDefinition = "VARCHAR(20)", nullable = false)
    private String job;

    @Column(columnDefinition = "VARCHAR(30)", nullable = false)
    private String company;

}
