package com.ssafychat.domain.member.service;

import com.ssafychat.domain.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class MemberDetailsImpl implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername " + userId);
        if (userId.contains("@")){
            return memberRepository.findByEmail(userId);
        }
        return memberRepository.findByUserId(Integer.parseInt(userId));
    }

}
