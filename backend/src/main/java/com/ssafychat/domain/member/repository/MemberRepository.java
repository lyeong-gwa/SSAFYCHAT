package com.ssafychat.domain.member.repository;

import com.ssafychat.domain.member.dto.PossibleMentoringDto;
import com.ssafychat.domain.member.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findByEmail(String email);
    Member findByUserId(int userId);
    List<PossibleMentoringDto> findDistinctByJobAndBelong(String job, String belong);
    List<PossibleMentoringDto> findDistinctByJob(String job);
    List<PossibleMentoringDto> findDistinctByBelong(String belong);

    @Query("select distinct new com.ssafychat.domain.member.dto.PossibleMentoringDto(job, belong) " +
            "from Member " +
            "where belong not in (:ssafy, :blank)")
    List<PossibleMentoringDto> getAllJobAndBelong(String ssafy, String blank);

    Long countByRole(String role);

    @Query(value = "select * from member where user_id = :userId", nativeQuery = true)
    Member findByUserIdForRanker(int userId);

}