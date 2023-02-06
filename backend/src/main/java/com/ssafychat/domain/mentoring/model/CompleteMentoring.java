package com.ssafychat.domain.mentoring.model;

import com.ssafychat.domain.member.model.Member;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
public class CompleteMentoring {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int completeMentoringId;

    @ManyToOne
    @JoinColumn(name = "mentee_uid", nullable = false)
    private Member mentee;

    @ManyToOne
    @JoinColumn(name = "mentor_uid", nullable = false)
    private Member mentor;

    @Column(nullable = false)
    private Timestamp time;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String chatLog;

    @Column(columnDefinition = "VARCHAR(20)", nullable = false)
    private String job;

    @Column(columnDefinition = "VARCHAR(30)", nullable = false)
    private String company;

    @Column(nullable = false)
    private int score;

    private String reviewTitle;

    @Column(columnDefinition = "TEXT")
    private String reviewContent;

    @Column(columnDefinition = "int default '0'")
    private int reviewWidth;

    @Column(columnDefinition = "int default '0'")
    private int reviewHeight;

    @Column(columnDefinition = "BOOLEAN", nullable = false)
    private int reviewSelected;

    private boolean completed;

}
