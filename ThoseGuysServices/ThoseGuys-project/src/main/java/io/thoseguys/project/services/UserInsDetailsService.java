package io.thoseguys.project.services;

import io.thoseguys.project.domain.UserInsDetails;
import io.thoseguys.project.repositories.UserInsDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInsDetailsService {

    @Autowired
    private UserInsDetailsRepository userInsDetailsRepository;

    public UserInsDetails saveUserDetails(UserInsDetails userInsDetails) {
        return userInsDetailsRepository.save(userInsDetails);
    }
}
