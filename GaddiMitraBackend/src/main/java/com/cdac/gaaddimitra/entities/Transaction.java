package com.cdac.gaaddimitra.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transaction")
@Data // Generates getters, setters, toString, equals, and hashCode
@NoArgsConstructor // Generates no-args constructor
@AllArgsConstructor // Generates all-args constructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionid;

    @ManyToOne
    @JoinColumn(name = "customerid", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "requestid", nullable = false)
    private VeichleRequest request;

    @Column(name = "receivertype")
    private String receiverType;

    @Column(name = "receiverid")
    private int receiverId;

    @Column(name = "transactiontype")
    private String transactionType;

    @Column(name = "amount")
    private int amount;

    @Column(name = "status")
    private String status;

    @Column(name = "datetime")
    private LocalDateTime dateTime;

    @Column(name = "razorpay_order_id")
    private String razorpayOrderId;
}