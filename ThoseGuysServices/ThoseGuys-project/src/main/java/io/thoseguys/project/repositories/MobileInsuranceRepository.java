package io.thoseguys.project.repositories;

import io.thoseguys.project.domain.MobileInsuranceForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MobileInsuranceRepository extends JpaRepository<MobileInsuranceForm, Long> {
}
