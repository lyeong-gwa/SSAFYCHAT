package com.ssafychat.domain.mentoring.controller;

import com.ssafychat.domain.member.dto.PossibleMentoringDto;
import com.ssafychat.domain.member.model.Member;
import com.ssafychat.domain.mentoring.dto.*;
import com.ssafychat.domain.mentoring.model.ApplyMentoring;
import com.ssafychat.domain.mentoring.model.CompleteMentoring;
import com.ssafychat.domain.mentoring.model.Mentoring;
import com.ssafychat.domain.mentoring.service.MentoringService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mentoring")
@CrossOrigin("*")
@Slf4j
public class MentoringController {
    @Autowired
    private MentoringService mentoringService;

    @GetMapping("/")
    public ResponseEntity<?> aliveCheck() {
        return new ResponseEntity<>("Alive", HttpStatus.OK);
    }
    @GetMapping
    public List<Mentoring> findMentoring() {
        return mentoringService.findMentoring();
    }


    @GetMapping("/main-info")
    public ResponseEntity<?> mainInfo(CompleteMentoring completeMentoring) {
        MainInfoDto mainInfoDto = mentoringService.mainInfo(completeMentoring);
        return new ResponseEntity<>(mainInfoDto, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> SearchPossibleMentoring(@RequestParam(defaultValue = "") String job, @RequestParam(defaultValue = "") String belong) {
        List<PossibleMentoringDto> possibleMentorings = mentoringService.getPossibleMentoringList(job, belong);
        return new ResponseEntity<>(possibleMentorings, HttpStatus.OK);
    }

    @PostMapping("/apply")
    @Transactional
    public ResponseEntity<?> applyMentoring(@RequestBody ApplyMentoringDto applyMentoringDto, HttpServletRequest request) {
        Member mentee = (Member) request.getAttribute("USER");
        Map<String,String> response = new HashMap<>();
        try {
            mentoringService.insertApplyMentoringAndMentoringDate(mentee, applyMentoringDto);
            response.put("message", "success");
        } catch (Exception e) {
            response.put("message", "fail");
        }
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/reservation")
    public ResponseEntity<?> reservationMentoring(HttpServletRequest request) {

        Member user = (Member) request.getAttribute("USER");
        int userId = user.getUserId();

        List<ApplyMentoringViewDto> appliedMentoringList = mentoringService.getApplyMentoringList(userId);
        List<MentoringListForMenteeDto> matchedMentoringList = mentoringService.getMatchedMentoringList(userId);
        List<CanceledMentoringListDto> canceledMentoringListForMentee = mentoringService.getCancledMentoringList(userId);

        CheckMentoringReservationForMenteeDto checkMentoringListForMentee =
                CheckMentoringReservationForMenteeDto.builder()
                        .appliedList(appliedMentoringList).matchedList(matchedMentoringList)
                                .canceledList(canceledMentoringListForMentee).build();

        return new ResponseEntity<>(checkMentoringListForMentee, HttpStatus.OK);
    }

    @DeleteMapping("/cancel/appointment") // 멘토가 멘토링을 취소
    @Transactional
    public ResponseEntity<?> appointmentCancel(@RequestBody CancelReasonDto cancelReasonDto, HttpServletRequest request) {
        Member user = (Member) request.getAttribute("USER");
        int userId = user.getUserId();
        Map<String,String> response = new HashMap<>();
        try {
            // 멘토링 테이블에서 delete하면서 멘토링 정보 반환
            Mentoring mentoring = mentoringService.deleteMentoring(cancelReasonDto.getMentoringId());
            // 멘토링 취소 테이블에 insert (멘토링 테이블 정보 + reaseon, canceler)
            mentoringService.insertCancelMentoring(userId, cancelReasonDto.getReason(), mentoring);
            response.put("message", "success");
        } catch (Exception e) {
            response.put("message", "fail");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/cancel/matched-reservation")
    @Transactional
    public ResponseEntity<?> matchedReservationCancel(@RequestBody CancelReasonDto cancelReasonDto, HttpServletRequest request) {
        Member user = (Member) request.getAttribute("USER");
        int userId = user.getUserId();
        Map<String,String> response = new HashMap<>();
        try {
            Mentoring mentoring = mentoringService.deleteMentoring(cancelReasonDto.getMentoringId());
            mentoringService.insertCancelMentoring(userId, cancelReasonDto.getReason(), mentoring);
            response.put("message", "success");
        } catch (Exception e) {
            response.put("message", "fail");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/cancel/reservation")
    public ResponseEntity<?> reservationCancel(HttpServletRequest request, @RequestBody MentoringDateDto mentoringDateDto) {
        Member user = (Member) request.getAttribute("USER");
        int userId = user.getUserId();
        int applyMentoringId = mentoringDateDto.getApplyMentoringId();
        Date time = mentoringDateDto.getTime();
        int rowsDeleted = mentoringService.deleteMentoringDate(applyMentoringId);
        ApplyMentoring applyMentoring = mentoringService.deleteApplyMentoring(applyMentoringId);
        Map<String,String> response = new HashMap<>();
        try {
            mentoringService.deleteApplyMentoring(applyMentoringId);
            response.put("message", "success");
        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "fail");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/appointment") // 멘토에게 들어온 멘토링 목록, 매칭된 멘토링 목록
    public ResponseEntity<?> appointmentSearch(HttpServletRequest request) {

        // 로그인 정보에서 식별자를 받아와서
        Member user = (Member) request.getAttribute("USER");
        int userId = user.getUserId();

        // 예약 정보 받아오기
        List<ApplyMentoringForMentorDto> applyList = mentoringService.getApplyMentoringListForMentor(userId);
        // 매칭 정보 받아오기
        List<MatchMentoringForMentorDto> matchList = mentoringService.getMatchMentoringListForMentor(userId);
        // MentoringListForMentorDto에 두 List 담아서 반환
        MentoringListForMentorDto list = MentoringListForMentorDto.builder().applys(applyList).matches(matchList).build();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @PostMapping("/appointment") // apply_mentoring_id에 해당하는 멘토링 요청을 수락처리
    @Transactional
    public ResponseEntity<?> appointmentAccept(HttpServletRequest request, @RequestBody MentoringDateDto mentoringDateDto) {
        Member user = (Member) request.getAttribute("USER");
        int userId = user.getUserId();
        int applyMentoringId = mentoringDateDto.getApplyMentoringId();
        Date time = mentoringDateDto.getTime();
        Map<String,String> response = new HashMap<>();
        try {
            // mentoring_date 테이블에서 삭제한다.
            mentoringService.deleteMentoringDate(applyMentoringId);
            // apply_mentoring 테이블에서 삭제하면서 apply_mentoring정보 반환 받는다.
            ApplyMentoring applyMentoring = mentoringService.deleteApplyMentoring(applyMentoringId);
            // mentoring 테이블에 넣는다.
            mentoringService.insertMentoring(userId, applyMentoring, time);
            response.put("message", "success");
        } catch (Exception e) {
            response.put("message", "fail");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/review")
    public ResponseEntity<?> getReviewRollingPaper(HttpServletRequest request) {
        // 멤버 정보로 해당 후기 가져오기
        Member mentor = (Member) request.getAttribute("USER");
        return new ResponseEntity<>(mentoringService.getRollingPaper(mentor), HttpStatus.OK);
    }
    @PatchMapping("/review")
    public ResponseEntity<?> moveReviewRollingPaper(@RequestBody RollingPaperDto rollingPaperDto) {
        // 후기 좌표 변경 혹은 선택 여부 변경
        mentoringService.updateRollingPaper(rollingPaperDto);
        return new ResponseEntity<>("review", HttpStatus.OK);
    }

    @PostMapping("/review")
    public ResponseEntity<?> postReviewAndScore(@RequestBody ReviewAndScoreDto reviewAndScoreDto) {
        Map<String,String> response = new HashMap<>();
        try {
            mentoringService.addReviewAndScore(reviewAndScoreDto);
            response.put("message", "success");
        } catch (Exception e) {
            response.put("message", "fail");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/report")
    public ResponseEntity<?> postReport(HttpServletRequest request, @RequestBody Map<String, String> report) {
        int completeMentoringId = Integer.parseInt(report.get("completeMentoringId"));
        String reason = report.get("reason");
        Member reporter = (Member) request.getAttribute("USER");
        Map<String,String> response = new HashMap<>();
        try {
            mentoringService.reportBadUser(reporter, completeMentoringId, reason);
            response.put("message", "success");
        } catch (Exception e) {
            response.put("message", "fail");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/complete") // 멘토링 정상 완료. 비정상 완료는 도커에서 mysql 스케줄러로
    @Transactional
    public ResponseEntity<?> completeMentoring(@RequestBody MentoringDto mentoringDto) {
        Map<String,String> response = new HashMap<>();
        try {
            Mentoring mentoring = mentoringService.deleteMentoring(mentoringDto.getMentoringId());
            mentoringService.insertCompleteMentoring(mentoring);
            response.put("message", "success");
        } catch (Exception e) {
            response.put("message", "fail");
            log.error(e.getMessage());
        }
            return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
