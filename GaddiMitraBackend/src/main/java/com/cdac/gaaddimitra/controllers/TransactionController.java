package com.cdac.gaaddimitra.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.gaaddimitra.entitiesDTO.TransactionDto;
import com.cdac.gaaddimitra.servicesimpl.TransactionServiceImpl;
import com.cdac.gaaddimitra.servicesimpl.VeichleRequestServiceImpl;

@CrossOrigin(origins = "*")
@RestController
public class TransactionController {
	
	@Autowired
	TransactionServiceImpl transactionService;
	
//	@GetMapping("/transactions")
//	public List<TransactionDto> getAllTransactions() {
//		// Logic to fetch all transactions
//		return transactionService.getAllTransactions();
//	}

}
