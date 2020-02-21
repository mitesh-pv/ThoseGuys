package io.thoseguys.project.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class Insurance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    @NotBlank(message = "name is required")
    private String name;
    @NotBlank(message = "type is required")
    private String Type;

    public Insurance(){
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return Type;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        Type = type;
    }
}
