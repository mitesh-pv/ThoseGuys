package io.thoseguys.project.services;

import io.thoseguys.project.domain.MobileInsuranceForm;
import io.thoseguys.project.repositories.MobileInsuranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MobileInsuranceFormService {

    @Autowired
    private MobileInsuranceRepository mobileInsuranceRepository;

    private static int sumDig(int n)
    {
        int a = 0;
        while (n > 0)
        {
            a = a + n % 10;
            n = n / 10;
        }
        return a;
    }


    // service
    public boolean validateIMEINumber(String imei){

        Long n = Long.valueOf(imei);
        int len = imei.length();

        if (len != 15)
            return false;

        int sum = 0;
        for (int i = len; i >= 1; i--)
        {
            int d = (int)(n % 10);

            // Doubling every alternate digit
            if (i % 2 == 0)
                d = 2 * d;

            // Finding sum of the digits
            sum += sumDig(d);
            n = n / 10;
        }

        return (sum % 10 == 0);
    }

    public MobileInsuranceForm saveToInsuranceRepository(MobileInsuranceForm mobileInsuranceForm) {

        return mobileInsuranceRepository.save(mobileInsuranceForm);
    }

    public List<MobileInsuranceForm> getAllRequest(String status) {
        return mobileInsuranceRepository.findByStatus(status);
    }

    public MobileInsuranceForm setMobileInsuranceFormStatus(MobileInsuranceForm mobileInsuranceForm){
        return mobileInsuranceRepository.save(mobileInsuranceForm);
    }

//    public MobileInsuranceForm updateMobileInsFormUserId(String username){
//        return mobileInsuranceRepository.updateMobileInsFormUserId(username);
//    }

    public List<MobileInsuranceForm> getAllRequestFromAUser(String username){
        return mobileInsuranceRepository.findAllByUsername(username);
    }
}
