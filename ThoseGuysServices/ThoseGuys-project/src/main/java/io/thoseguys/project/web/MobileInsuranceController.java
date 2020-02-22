package io.thoseguys.project.web;

import io.thoseguys.project.domain.Insurance;
import io.thoseguys.project.domain.MobileInsuranceForm;
import io.thoseguys.project.domain.UserInsDetails;
import io.thoseguys.project.repositories.InsuranceRepository;
import io.thoseguys.project.services.MobileInsuranceFormService;
import io.thoseguys.project.services.UserInsDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping("insurance")
@CrossOrigin
public class MobileInsuranceController {

    @Autowired
    private InsuranceRepository insuranceRepository;

    @Autowired
    private MobileInsuranceFormService mobileInsuranceFormService;

    @Autowired
    private UserInsDetailsService userInsDetailsService;

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
            @RequestBody UserInsDetails userInsDetails){

        String msg = "invalid imei number";

//        return ResponseEntity.ok(userInsDetails.getInsuranceFormList());

        for(MobileInsuranceForm mobileInsuranceForm : userInsDetails.getInsuranceFormList()){
            if(!mobileInsuranceFormService.validateIMEINumber(mobileInsuranceForm.getImeiNumber())){
                return ResponseEntity.badRequest().body("IMEI no. is not valid");
            }
        }

        for(MobileInsuranceForm mobileInsuranceForm: userInsDetails.getInsuranceFormList()){

            LocalDate purchaseDate = LocalDate.parse(mobileInsuranceForm.getDateOfPurchase());
            LocalDate currentDate = LocalDate.now();

            if(ChronoUnit.DAYS.between(purchaseDate, currentDate)>31L){
                return ResponseEntity
                        .badRequest()
                        .body("Mobile not eligible for insurance. " +
                                "Date of purchased is more than one month");
            }
        }


//        MobileInsuranceForm mobileInsuranceForm1 =
//                mobileInsuranceFormService.saveToInsuranceRepository(mobileInsuranceForm);
        UserInsDetails userInsDetails1 = userInsDetailsService.saveUserDetails(userInsDetails);

//        if(mobileInsuranceForm1 != null){
//            mobileInsuranceFormService.updateMobileInsFormUserId(mobileInsuranceForm1.getUsername());
//        }
        return ResponseEntity.ok(userInsDetails1);
    }

    @GetMapping("/allRequest/{username}")
    public ResponseEntity<?> getAllMobileInsReq(@PathVariable("username") String username){

//        List<MobileInsuranceForm> mobileInsuranceFormsList = mobileInsuranceFormService.getAllRequestFromAUser(username);

//        if(mobileInsuranceFormsList == null){
//            return ResponseEntity.noContent().build();
//        }

//        return ResponseEntity.ok(username);

        return ResponseEntity.ok(mobileInsuranceFormService.getAllRequestFromAUser(username));

    }
}
