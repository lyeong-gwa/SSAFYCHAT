package com.ssafychat.domain.mentoring.repository;

import com.ssafychat.domain.mentoring.model.CancelMentoring;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CancelMentoringRepository extends JpaRepository<CancelMentoring, Integer> {

    List<CancelMentoring> findByMentee_UserId(int userId);
}
