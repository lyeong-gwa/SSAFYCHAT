package com.ssafychat.domain.mentoring.model;

import lombok.*;

import javax.persistence.*;

@Getter
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
@IdClass(ReportInterface.class)
public class Report {

    @Id
    private int reporter;

    @Id
    @ManyToOne
    @JoinColumn(name = "complete_mentoring_id")
    private CompleteMentoring completeMentoring;

    @Column(nullable = false)
    private int reported;

    @Column(columnDefinition = "TEXT",  nullable = false)
    private String reason;

}