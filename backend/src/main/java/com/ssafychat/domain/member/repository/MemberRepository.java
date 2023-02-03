package com.ssafychat.domain.member.repository;

import com.ssafychat.domain.member.dto.PossibleMentoringDto;
import com.ssafychat.domain.member.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByUserId(int user_id);
    List<PossibleMentoringDto> findDistinctByJobAndBelong(String job, String belong);
    Long countByRole(String role);
}