package com.cdac.gaaddimitra.services;

import java.util.List;

import com.cdac.gaaddimitra.entitiesDTO.TransactionDto;

public interface TransactionService {
	
	public List<TransactionDto> getAllTransactions();

	long totalTransactions();

	void addTransaction(TransactionDto transactionDto);

	TransactionDto getTransactionById(int id);
}
