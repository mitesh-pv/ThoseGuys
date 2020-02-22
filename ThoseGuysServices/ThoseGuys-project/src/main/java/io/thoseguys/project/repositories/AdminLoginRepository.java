package io.thoseguys.project.repositories;

import io.thoseguys.project.domain.AdminLogin;
import io.thoseguys.project.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface AdminLoginRepository extends CrudRepository<AdminLogin, Long> {

    AdminLogin findByUsername(String username);
    AdminLogin getById(Long id);
}
