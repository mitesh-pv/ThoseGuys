package io.thoseguys.project.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
public class MobileInsuranceForm implements Serializable {

    @Id
    @Column(name = "ins_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @NotBlank(message = "name cannot be empty")
    private String name;

    @NotNull(message = "price cannot be empty")
    private Double price;

    @NotBlank(message = "insurance type cannot be empty")
    private String insuranceType;

    @NotBlank(message = "IMEI no. cannot be empty")
    private String imeiNumber;

    @NotNull(message = "mobile number cannot be blank")
    private Long mobileNumber;

    // File
    @NotBlank(message = "bill number cannot be blank")
    private String billNumber;

    @NotBlank(message = "Status cannot be empty")
    private String status;

    @ManyToOne
    private User user;

    public User getUser() {
        return user;
    }

    public Long getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(Long mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getBillNumber() {
        return billNumber;
    }

    public void setBillNumber(String billNumber) {
        this.billNumber = billNumber;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getInsuranceType() {
        return insuranceType;
    }

    public void setInsuranceType(String insuranceType) {
        this.insuranceType = insuranceType;
    }

    public String getImeiNumber() {
        return imeiNumber;
    }

    public void setImeiNumber(String imeiNumber) {
        this.imeiNumber = imeiNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
