package io.thoseguys.project.repositories;

import io.thoseguys.project.domain.UserInsDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInsDetailsRepository extends JpaRepository<UserInsDetails, Long> {
}
