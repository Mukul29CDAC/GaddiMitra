package com.cdac.gaaddimitra.servicesimpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.Customer;
import com.cdac.gaaddimitra.entities.Transaction;
import com.cdac.gaaddimitra.entities.VeichleRequest;
import com.cdac.gaaddimitra.entities.Veichles;
import com.cdac.gaaddimitra.entitiesDTO.TransactionDto;
import com.cdac.gaaddimitra.repository.CustomerRepo; // You need to create this repository
import com.cdac.gaaddimitra.repository.TransactionRepo;
import com.cdac.gaaddimitra.repository.VeichleRepo; // You need to create this repository
import com.cdac.gaaddimitra.repository.VeichleRequestRepo; // You need to create this repository
import com.cdac.gaaddimitra.services.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {

	@Autowired
	private TransactionRepo transactionRepo;

	// Inject other repositories needed to fetch related entities by their IDs
	@Autowired
	private CustomerRepo customerRepo;

	@Autowired
	private VeichleRequestRepo veichleRequestRepo;

	@Autowired
	private VeichleRepo veichleRepo;

	/**
	 * Creates and saves an initial transaction record for a Razorpay payment attempt.
	 * It fetches related entities using IDs from the DTO, sets the Razorpay Order ID,
	 * and saves the complete Transaction object with a "created" status.
	 */
	@Override
	public void createInitialTransaction(TransactionDto tDto, String razorpayOrderId, String status) {
		// 1. Fetch related entities from the database
		Customer customer = customerRepo.findById(tDto.getCustomerId())
				.orElseThrow(() -> new RuntimeException("Customer not found with id: " + tDto.getCustomerId()));
		
		VeichleRequest request = veichleRequestRepo.findById(tDto.getRequestId())
				.orElseThrow(() -> new RuntimeException("Vehicle Request not found with id: " + tDto.getRequestId()));
		
		Veichles vehicle = veichleRepo.findById(tDto.getVeichleId())
				.orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + tDto.getVeichleId()));

		// 2. Create a new Transaction ENTITY object
		Transaction transaction = new Transaction();
		
		// 3. Manually set the properties on the entity
		transaction.setCustomer(customer);
		transaction.setRequest(request);
		transaction.setVeichle(vehicle);
		transaction.setReceiverType(tDto.getReceiverType());
		transaction.setReceiverId(tDto.getReceiverId());
		transaction.setTransactionType(tDto.getTransactionType());
		transaction.setAmount(tDto.getAmount());
		
		// 4. Set details specific to this payment attempt
		transaction.setStatus(status); // e.g., "created"
		transaction.setDateTime(LocalDateTime.now());
		transaction.setRazorpayOrderId(razorpayOrderId); // Set the Razorpay order ID
		
		// 5. Save the fully constructed transaction record
		transactionRepo.save(transaction);
		
		System.out.println("Initial transaction saved to DB with Razorpay Order ID: " + razorpayOrderId);
	}

	/**
	 * Retrieves all transactions and maps them to a list of TransactionDto objects.
	 */
	@Override
	public List<TransactionDto> getAllTransactions() {
		List<Transaction> transactions = transactionRepo.findAll();
		if (transactions.isEmpty()) {
			throw new RuntimeException("No transactions found");
		}
		// Use a stream to map each Transaction entity to a TransactionDto
		return transactions.stream()
				.map(this::mapEntityToDto)
				.collect(Collectors.toList());
	}
	
	/**
	 * Adds a new transaction. This method assumes the DTO contains all necessary IDs
	 * to build the complete Transaction entity.
	 */
	@Override
	public void addTransaction(TransactionDto transactionDto) {
		// Since the DTO has IDs and the Entity needs objects, we must manually map them.
		Transaction transaction = mapDtoToEntity(transactionDto);
		transactionRepo.save(transaction);
	}
	
	/**
	 * Retrieves a single transaction by its ID and maps it to a TransactionDto.
	 */
	@Override
	public TransactionDto getTransactionById(int id) {
		Transaction transaction = transactionRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
		// Map the found entity to a DTO before returning
		return mapEntityToDto(transaction);
	}
	
	/**
	 * Returns the total count of transactions in the database.
	 */
	@Override
	public long totalTransactions() {
		return transactionRepo.count();
	}

	// =================================================================================
	// HELPER METHODS FOR MAPPING BETWEEN ENTITY AND DTO
	// =================================================================================

	/**
	 * Helper method to map a Transaction entity to a TransactionDto.
	 * This is needed because the entity holds full objects, but the DTO needs primitive IDs.
	 */
	private TransactionDto mapEntityToDto(Transaction transaction) {
		
		TransactionDto dto = new TransactionDto();
		dto.setTransactionId(transaction.getTransactionid());
		dto.setReceiverType(transaction.getReceiverType());
		dto.setReceiverId(transaction.getReceiverId());
		dto.setTransactionType(transaction.getTransactionType());
		dto.setAmount(transaction.getAmount());
		dto.setStatus(transaction.getStatus());
		dto.setDateTime(transaction.getDateTime());

		// Extract IDs from the related objects
		if (transaction.getCustomer() != null) {
			dto.setCustomerId(transaction.getCustomer().getUserid());
		}
		if (transaction.getRequest() != null) {
			dto.setRequestId(transaction.getRequest().getRequestid());
		}
		if (transaction.getVeichle() != null) {
			dto.setVeichleId(transaction.getVeichle().getId());
		}
		return dto;
	}

	/**
	 * Helper method to map a TransactionDto to a new Transaction entity.
	 * It fetches related objects from the database using the IDs in the DTO.
	 */
	private Transaction mapDtoToEntity(TransactionDto dto) {
		// Fetch related entities
		Customer customer = customerRepo.findById(dto.getCustomerId())
				.orElseThrow(() -> new RuntimeException("Customer not found with id: " + dto.getCustomerId()));
		VeichleRequest request = veichleRequestRepo.findById(dto.getRequestId())
				.orElseThrow(() -> new RuntimeException("Vehicle Request not found with id: " + dto.getRequestId()));
		Veichles vehicle = veichleRepo.findById(dto.getVeichleId())
				.orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + dto.getVeichleId()));

		// Create and populate the entity
		Transaction transaction = new Transaction();
		transaction.setCustomer(customer);
		transaction.setRequest(request);
		transaction.setVeichle(vehicle);
		transaction.setReceiverType(dto.getReceiverType());
		transaction.setReceiverId(dto.getReceiverId());
		transaction.setTransactionType(dto.getTransactionType());
		transaction.setAmount(dto.getAmount());
		transaction.setStatus(dto.getStatus());
		transaction.setDateTime(dto.getDateTime() != null ? dto.getDateTime() : LocalDateTime.now());

		return transaction;
	}
}