package com.ssafychat.domain.mentoring.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
@IdClass(MentoringDateInterface.class)
public class MentoringDate {

    @Id
//    @Convert(converter= DateToStringConverter.class)
    @Column(nullable = false)
    private Date time;

    @Id
    @ManyToOne
    @JoinColumn(name = "apply_mentoring_id")
    private ApplyMentoring applyMentoring;

}
