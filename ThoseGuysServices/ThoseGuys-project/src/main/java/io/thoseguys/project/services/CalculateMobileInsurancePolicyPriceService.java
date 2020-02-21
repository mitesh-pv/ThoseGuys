package io.thoseguys.project.services;

import org.springframework.stereotype.Service;

@Service
public class CalculateMobileInsurancePolicyPriceService {

    public Double calculateInsurancePolicyPrice(Double price){
        return price*0.2;
    }
}
