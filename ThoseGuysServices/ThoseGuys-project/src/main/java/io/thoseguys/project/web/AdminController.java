package io.thoseguys.project.web;

import io.thoseguys.project.domain.MobileInsuranceForm;
import io.thoseguys.project.payload.LoginRequest;
import io.thoseguys.project.services.AdminLoginService;
import io.thoseguys.project.services.MobileInsuranceFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    MobileInsuranceFormService mobileInsuranceFormService;

    @Autowired
    private AdminLoginService adminLoginService;

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

    // admin approves or rejects
    @PostMapping("/action")
    public ResponseEntity<?> rejectRequest(@RequestBody MobileInsuranceForm mobileInsuranceForm){
        return ResponseEntity.ok(
                mobileInsuranceFormService.setMobileInsuranceFormStatus(mobileInsuranceForm)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){

        boolean isTrue = adminLoginService.findUsername(loginRequest);

        if(!isTrue){
            return ResponseEntity.badRequest().body("incorrect username or password");
        }

        return ResponseEntity.ok(loginRequest.getUsername());
    }
}
