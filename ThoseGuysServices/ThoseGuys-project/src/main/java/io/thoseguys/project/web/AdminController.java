package io.thoseguys.project.web;

import io.thoseguys.project.services.MobileInsuranceFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    MobileInsuranceFormService mobileInsuranceFormService;

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingApprovalsForAdmin(){
        return ResponseEntity.ok(mobileInsuranceFormService.getAllRequest("p"));
    }

    @GetMapping("/notApproved")
    public ResponseEntity<?> getNotApprovedApprovalsForAdmin(){
        return ResponseEntity.ok(mobileInsuranceFormService.getAllRequest("na"));
    }

    @GetMapping("/approved")
    public ResponseEntity<?> getApprovedApprovalsForAdmin(){
        return ResponseEntity.ok(mobileInsuranceFormService.getAllRequest("a"));
    }

}
