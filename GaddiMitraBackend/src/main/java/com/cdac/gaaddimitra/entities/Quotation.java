package com.cdac.gaaddimitra.entities;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "quotation")
public class Quotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int quotationid;

    @Column
    private int requestid;

    @Column
    private int customerid;

    @Column
    private String sendertype;

    @Column
    private int senderid;

    @Column
    private int ammount;

    @Column
    private LocalDateTime estimatedtime;

    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name = "requestid", insertable = false, updatable = false)
    private VeichleRequest veichleRequest;

    @ManyToOne
    @JoinColumn(name = "customerid", insertable = false, updatable = false)
    private Customer customer;

    public Quotation() {
        super();
    }

    public Quotation(int quotationid, int requestid, int customerid, String sendertype, int senderid, int ammount,
                     LocalDateTime estimatedtime, String description, VeichleRequest veichleRequest, Customer customer) {
        super();
        this.quotationid = quotationid;
        this.requestid = requestid;
        this.customerid = customerid;
        this.sendertype = sendertype;
        this.senderid = senderid;
        this.ammount = ammount;
        this.estimatedtime = estimatedtime;
        this.description = description;
        this.veichleRequest = veichleRequest;
        this.customer = customer;
    }

    public int getQuotationid() {
        return quotationid;
    }

    public void setQuotationid(int quotationid) {
        this.quotationid = quotationid;
    }

    public int getRequestid() {
        return requestid;
    }

    public void setRequestid(int requestid) {
        this.requestid = requestid;
    }

    public int getCustomerid() {
        return customerid;
    }

    public void setCustomerid(int customerid) {
        this.customerid = customerid;
    }

    public String getSendertype() {
        return sendertype;
    }

    public void setSendertype(String sendertype) {
        this.sendertype = sendertype;
    }

    public int getSenderid() {
        return senderid;
    }

    public void setSenderid(int senderid) {
        this.senderid = senderid;
    }

    public int getAmmount() {
        return ammount;
    }

    public void setAmmount(int ammount) {
        this.ammount = ammount;
    }

    public LocalDateTime getEstimatedtime() {
        return estimatedtime;
    }

    public void setEstimatedtime(LocalDateTime estimatedtime) {
        this.estimatedtime = estimatedtime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public VeichleRequest getVeichleRequest() {
        return veichleRequest;
    }

    public void setVeichleRequest(VeichleRequest veichleRequest) {
        this.veichleRequest = veichleRequest;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public String toString() {
        return "Quotation [quotationid=" + quotationid + ", requestid=" + requestid + ", customerid=" + customerid
                + ", sendertype=" + sendertype + ", senderid=" + senderid + ", ammount=" + ammount
                + ", estimatedtime=" + estimatedtime + ", description=" + description + ", veichleRequest="
                + veichleRequest + ", customer=" + customer + "]";
    }
}
