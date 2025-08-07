package com.cdac.gaaddimitra.entities;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "quotation")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"veichleRequest", "customer"})
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

	
}