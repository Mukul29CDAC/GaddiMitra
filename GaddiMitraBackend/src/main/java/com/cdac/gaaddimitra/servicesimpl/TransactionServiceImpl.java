package com.cdac.gaaddimitra.servicesimpl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.Transaction;
import com.cdac.gaaddimitra.entitiesDTO.TransactionDto;
import com.cdac.gaaddimitra.repository.TransactionRepo;
import com.cdac.gaaddimitra.services.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {

	@Autowired
	TransactionRepo transactionRepo;
	
	@Override
	public List<TransactionDto> getAllTransactions() {
		Iterator<Transaction> transactions = transactionRepo.findAll().iterator();
		List<TransactionDto> transactionDtoList = new ArrayList<>();
		
		if (!transactions.hasNext()) {
			throw new RuntimeException("No transactions found");
		}
		while(transactions.hasNext()) {
			TransactionDto transactionDto = new TransactionDto();
			Transaction transaction = transactions.next();
			BeanUtils.copyProperties(transaction, transactionDto);
			transactionDtoList.add(transactionDto);
		}
		return transactionDtoList;
	}
	
	@Override
	public void addTransaction(TransactionDto transactionDto) {
		Transaction transaction = new Transaction();
		BeanUtils.copyProperties(transactionDto, transaction);
		transactionRepo.save(transaction);
	}
	
	@Override
	public TransactionDto getTransactionById(int id) {
		Optional<Transaction> transactionOptional = transactionRepo.findById(id);
	    if (transactionOptional.isEmpty()) {
	        throw new RuntimeException("Transaction not found with id: " + id);
	    } else {
	        Transaction transaction = transactionOptional.get(); 
	        TransactionDto transactionDto = new TransactionDto();
	        BeanUtils.copyProperties(transaction, transactionDto); 
	        return transactionDto;
	    }
	}
	
	@Override
	public long totalTransactions() {
		return transactionRepo.count();
	}

}
