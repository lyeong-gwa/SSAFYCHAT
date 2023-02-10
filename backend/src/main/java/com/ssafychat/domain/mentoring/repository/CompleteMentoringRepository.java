package com.ssafychat.domain.mentoring.repository;

import com.ssafychat.domain.member.model.Member;
import com.ssafychat.domain.mentoring.model.CompleteMentoring;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CompleteMentoringRepository extends JpaRepository<CompleteMentoring, Integer> {

    @Query(value = "select mentor_uid " +
            "from complete_mentoring " +
            "where completed = 1 " +
            "and time " +
            "BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK ) AND NOW() " +
            "group by mentor_uid " +
            "order by count(mentor_uid) desc " +
            "limit 3"
    , nativeQuery = true)
    List<Integer> findRanking();

    @Query("select count(*) " +
            "from CompleteMentoring " +
            "where completed = 1")
    Long completeMentoringCount();

    List<CompleteMentoring> findByMentee(Member mentee);
    List<CompleteMentoring> findByMentor(Member mentor);
    @Query(value = "select * " +
            "from complete_mentoring " +
            "where mentor_uid = :mentorUid " +
            "and review_title is not null"
            ,nativeQuery = true)
    List<CompleteMentoring> getRollingPaper(int mentorUid);

    CompleteMentoring findByCompleteMentoringId(int completeMentoringid);

}
