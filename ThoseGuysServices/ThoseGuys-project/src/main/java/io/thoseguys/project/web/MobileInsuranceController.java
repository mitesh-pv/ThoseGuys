package io.thoseguys.project.web;

import io.thoseguys.project.domain.Insurance;
import io.thoseguys.project.domain.MobileInsuranceForm;
import io.thoseguys.project.repositories.InsuranceRepository;
import io.thoseguys.project.services.MobileInsuranceFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("insurance")
@CrossOrigin
public class MobileInsuranceController {

    @Autowired
    private InsuranceRepository insuranceRepository;

    @Autowired
    private MobileInsuranceFormService mobileInsuranceFormService;

    @GetMapping(path="/all")
    public ResponseEntity<?> getAllInsurance(){
        return ResponseEntity.ok(insuranceRepository.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addInsurance(@RequestBody Insurance insurance){
        Insurance insurance1 = insuranceRepository.save(insurance);
        return  new ResponseEntity<Insurance>(insurance1, HttpStatus.CREATED);
    }

    @PostMapping("/applyInsurance")
    public ResponseEntity<?> getInsuranceApprovalResponse(
            @RequestBody MobileInsuranceForm mobileInsuranceForm){

        String msg = "invalid imei number";



        if(!mobileInsuranceFormService.validateIMEINumber(mobileInsuranceForm.getImeiNumber())){
            return ResponseEntity.badRequest().body(msg);
        }

        return ResponseEntity.ok(mobileInsuranceFormService.saveToInsuranceRepository(mobileInsuranceForm));
//        return ResponseEntity.ok("ok created");
//        return ResponseEntity.ok(mobileInsuranceForm.getPrice());
    }

}
