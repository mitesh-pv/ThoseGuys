package io.thoseguys.project.services;

import io.thoseguys.project.domain.AdminLogin;
import io.thoseguys.project.domain.User;
import io.thoseguys.project.exceptions.UsernameAlreadyExistsException;
import io.thoseguys.project.payload.LoginRequest;
import io.thoseguys.project.repositories.AdminLoginRepository;
import io.thoseguys.project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminLoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminLoginRepository adminLoginRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AdminLogin getFullNameFromAdminLoginRepository(String username){
        return adminLoginRepository.findByUsername(username);
    }

    public boolean findUsername(LoginRequest loginRequest) {
        return adminLoginRepository.findByUsername(loginRequest.getUsername()).getPassword().equals(loginRequest.getPassword());
    }
}
