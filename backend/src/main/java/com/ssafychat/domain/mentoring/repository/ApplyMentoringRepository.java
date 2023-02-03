package com.ssafychat.domain.mentoring.repository;

import com.ssafychat.domain.mentoring.model.ApplyMentoring;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ApplyMentoringRepository extends JpaRepository<ApplyMentoring, Long> {

    List<ApplyMentoring> findByJobAndCompany(String job, String belong);
    ApplyMentoring findByApplyMentoringId(int applyMentoringId);
    int deleteApplyMentoringByApplyMentoringId(int applyMentoringId);

}
