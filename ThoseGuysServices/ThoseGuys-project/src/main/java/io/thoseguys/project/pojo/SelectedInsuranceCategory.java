package io.thoseguys.project.pojo;

import java.io.Serializable;

public class SelectedInsuranceCategory implements Serializable {

    String insuranceType;
    String mobilePrice;

    public SelectedInsuranceCategory() {
    }

    public SelectedInsuranceCategory(String insuranceType, String mobilePrice) {
        this.insuranceType = insuranceType;
        this.mobilePrice = mobilePrice;
    }

    public String getInsuranceType() {
        return insuranceType;
    }

    public void setInsuranceType(String insuranceType) {
        this.insuranceType = insuranceType;
    }

    public String getMobilePrice() {
        return mobilePrice;
    }

    public void setMobilePrice(String mobilePrice) {
        this.mobilePrice = mobilePrice;
    }
}
