package com.ssafychat.domain.mentoring.repository;

import com.ssafychat.domain.mentoring.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Integer> {
}
