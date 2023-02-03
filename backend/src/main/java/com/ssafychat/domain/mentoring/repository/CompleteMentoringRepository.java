package com.ssafychat.domain.mentoring.repository;

import com.ssafychat.domain.mentoring.model.CompleteMentoring;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface CompleteMentoringRepository extends JpaRepository<CompleteMentoring, Integer> {

//    @Query(value = "select * " +
//            "from CompleteMentoring " +
//            "where time " +
//            "BETWEEN :berfore7Days AND :now " +
//            "group by mentor_uid " +
//            "order by count(mentor_uid) desc " +
//            "limit 3"
//    , nativeQuery = true)
//    List<Integer> findRanking(Timestamp berfore7Days, Timestamp now);
//
//    @Query("select * from CompleteMentoring ")
//    CompleteMentoring findByCompleteMentoringId(int id);

//    @Query("select CompleteMentoring.mentor.userId from CompleteMentoring where CompleteMentoring.time" +
//            " BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK ) AND NOW() " +
//            "group by CompleteMentoring.mentor.userId order by count(CompleteMentoring.mentor.userId) desc limit 3")
//    List<Integer> findRanking();

//    @Query()
//    List<>

    @Query("select count(*) " +
            "from CompleteMentoring " +
            "where completed = true")
    Long completeMentoringCount();

}
