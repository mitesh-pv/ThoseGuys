package io.thoseguys.project.web;

import io.thoseguys.project.pojo.SelectedInsuranceCategory;
import io.thoseguys.project.services.CalculateMobileInsurancePolicyPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/calculatePolicyPrice")
public class InsurancePriceCalculatorController {

    @Autowired
    private CalculateMobileInsurancePolicyPriceService calculateMobileInsurancePolicyPriceService;

    @PostMapping(value = "/checkInsurancePrice", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> checkInsurancePolicyPrice(
            @RequestBody SelectedInsuranceCategory selectedInsuranceCategory) {

        Double mobilePrice = Double.valueOf(selectedInsuranceCategory.getMobilePrice());
        Double mobileInsurancePrice = calculateMobileInsurancePolicyPriceService.calculateInsurancePolicyPrice(mobilePrice);

        return ResponseEntity.ok(mobileInsurancePrice);
    }
}
