package com.ssafychat.domain.mentoring.repository;

import com.ssafychat.domain.mentoring.model.MentoringDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentoringDateRepository extends JpaRepository<MentoringDate, Integer> {

    List<MentoringDate> findByApplyMentoring_ApplyMentoringId(int applyMentoringId);
    int deleteMentoringDatesByApplyMentoring_ApplyMentoringId(int applyMentoringId);
}
