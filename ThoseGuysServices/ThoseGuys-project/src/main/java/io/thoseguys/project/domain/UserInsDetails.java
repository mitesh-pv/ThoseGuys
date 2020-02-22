package io.thoseguys.project.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
public class UserInsDetails implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String username;    // email

    private String fullName;

    @OneToMany(targetEntity = MobileInsuranceForm.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_mob_fk", referencedColumnName = "id")
    private List<MobileInsuranceForm> insuranceFormList;


    public UserInsDetails() {
    }

    public UserInsDetails(Long id,
                          String username,
                          String fullName,
                          List<MobileInsuranceForm> insuranceFormList) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.insuranceFormList = insuranceFormList;
    }

    public List<MobileInsuranceForm> getInsuranceFormList() {
        return insuranceFormList;
    }

    public void setInsuranceFormList(List<MobileInsuranceForm> insuranceFormList) {
        this.insuranceFormList = insuranceFormList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}
