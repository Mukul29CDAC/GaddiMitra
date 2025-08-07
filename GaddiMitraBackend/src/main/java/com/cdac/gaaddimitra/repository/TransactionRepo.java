package com.cdac.gaaddimitra.repository;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import com.cdac.gaaddimitra.entities.Transaction;

public interface TransactionRepo  extends JpaRepository<Transaction, Integer> {

	/**
     * Finds a transaction by the Razorpay Order ID.
     * This is crucial for verifying the payment status after the user pays.
     */
    Optional<Transaction> findByRazorpayOrderId(String razorpayOrderId);
}
