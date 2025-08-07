package com.cdac.gaaddimitra.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter @Setter // Replaces all getters/setters
@NoArgsConstructor // Replaces default constructor
@AllArgsConstructor // Replaces parameterized constructor
@ToString(callSuper = true) // Includes parent class (Users) in toString()
public class Customer extends Users {

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VeichleRequest> veichlerequest;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Quotation> quotation;
}