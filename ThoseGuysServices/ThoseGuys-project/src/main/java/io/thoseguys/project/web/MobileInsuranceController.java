package io.thoseguys.project.web;

import io.thoseguys.project.domain.Insurance;
import io.thoseguys.project.repositories.InsuranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("insurance")
public class MobileInsuranceController {

    @Autowired
    private InsuranceRepository insuranceRepository;

    @GetMapping(path="/all")
    public ResponseEntity<?> getAllInsurance(){
        return ResponseEntity.ok(insuranceRepository.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addInsurance(@RequestBody Insurance insurance){
        Insurance insurance1 = insuranceRepository.save(insurance);
        return  new ResponseEntity<Insurance>(insurance1, HttpStatus.CREATED);
    }
}
