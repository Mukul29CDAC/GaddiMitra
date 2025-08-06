package com.cdac.gaaddimitra.entities;

import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Customer extends Users {

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VeichleRequest> veichlerequest;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Quotation> quotation;

    public Customer() {
        super();
    }

    public Customer(int userid, String name, String email, String phone, String password, String address, String role,
                    List<VeichleRequest> veichlerequest, List<Quotation> quotation) {
        super(userid, name, email, phone, password, address, role);
        this.veichlerequest = veichlerequest;
        this.quotation = quotation;
    }

    public List<VeichleRequest> getVeichlerequest() {
        return veichlerequest;
    }

    public void setVeichlerequest(List<VeichleRequest> veichlerequest) {
        this.veichlerequest = veichlerequest;
    }

    public List<Quotation> getQuotation() {
        return quotation;
    }

    public void setQuotation(List<Quotation> quotation) {
        this.quotation = quotation;
    }

    @Override
    public String toString() {
        return "Customer [veichlerequest=" + veichlerequest + ", quotation=" + quotation + "]";
    }
}
