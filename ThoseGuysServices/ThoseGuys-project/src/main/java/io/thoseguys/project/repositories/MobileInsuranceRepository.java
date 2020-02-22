package io.thoseguys.project.repositories;

import io.thoseguys.project.domain.MobileInsuranceForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MobileInsuranceRepository extends JpaRepository<MobileInsuranceForm, Long> {

     List<MobileInsuranceForm> findByStatus(String status);
     List<MobileInsuranceForm> findAllByUsername(String username);
}
