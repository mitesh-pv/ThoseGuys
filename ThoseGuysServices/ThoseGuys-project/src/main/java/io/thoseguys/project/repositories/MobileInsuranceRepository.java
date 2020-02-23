package io.thoseguys.project.repositories;

import io.thoseguys.project.domain.MobileInsuranceForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MobileInsuranceRepository extends JpaRepository<MobileInsuranceForm, Long> {

//     List<MobileInsuranceForm> findByStatus(String status);

//    @Modifying
//
//    @Query("update mobile_insurance_form f set f.user_id=:id where exist (select u.id from user u where u.username=f.username)")
//    MobileInsuranceForm updateMobileInsFormUserId(@Param("username") String username);

     List<MobileInsuranceForm> findByStatus(String status);
     List<MobileInsuranceForm> findAllByUsername(String username);
}
