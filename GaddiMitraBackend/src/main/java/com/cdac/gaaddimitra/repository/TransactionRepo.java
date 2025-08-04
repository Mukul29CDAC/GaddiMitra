package com.cdac.gaaddimitra.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import com.cdac.gaaddimitra.entities.Transaction;

public interface TransactionRepo  extends JpaRepository<Transaction, Integer> {

	
}
