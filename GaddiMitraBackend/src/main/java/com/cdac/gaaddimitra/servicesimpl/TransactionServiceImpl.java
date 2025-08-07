package com.cdac.gaaddimitra.servicesimpl;

import com.cdac.gaaddimitra.entities.*;
import com.cdac.gaaddimitra.entitiesDTO.TransactionDto;
import com.cdac.gaaddimitra.repository.*;
import com.cdac.gaaddimitra.services.TransactionService;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

	@Autowired
	private TransactionRepo transactionRepo;
	@Autowired
	private CustomerRepo customerRepo;
	@Autowired
	private VeichleRequestRepo veichleRequestRepo;
	@Autowired
	private VeichleRepo veichleRepo;

	// --> ADD THIS: Inject the secret key for verification
	@Value("${razorpay.key.secret}")
	private String razorpayKeySecret;

	@Override
	@Transactional
	public void createInitialTransaction(TransactionDto tDto, String razorpayOrderId, String status) {
		// ... (This method is correct as you wrote it)
		Customer customer = customerRepo.findById(tDto.getCustomerId())
				.orElseThrow(() -> new RuntimeException("Customer not found"));
		VeichleRequest request = veichleRequestRepo.findById(tDto.getRequestId())
				.orElseThrow(() -> new RuntimeException("Request not found"));
		Veichles vehicle = veichleRepo.findById(tDto.getVeichleId())
				.orElseThrow(() -> new RuntimeException("Vehicle not found"));

		Transaction transaction = new Transaction();
		transaction.setCustomer(customer);
		transaction.setRequest(request);
		transaction.setVeichle(vehicle);
		transaction.setReceiverType(tDto.getReceiverType());
		transaction.setReceiverId(tDto.getReceiverId());
		transaction.setTransactionType(tDto.getTransactionType());
		transaction.setAmount(tDto.getAmount());
		transaction.setStatus(status);
		transaction.setDateTime(LocalDateTime.now());
		transaction.setRazorpayOrderId(razorpayOrderId);

		transactionRepo.save(transaction);
	}

	/**
	 * CRITICAL: Implementation of the verification logic.
	 */
	@Override
	@Transactional
	public String verifyAndUpdateTransaction(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature)
			throws RazorpayException {
		Transaction transaction = transactionRepo.findByRazorpayOrderId(razorpayOrderId)
				.orElseThrow(() -> new RuntimeException("Transaction not found for order id: " + razorpayOrderId));

		JSONObject options = new JSONObject();
		options.put("razorpay_order_id", razorpayOrderId);
		options.put("razorpay_payment_id", razorpayPaymentId);
		options.put("razorpay_signature", razorpaySignature);

		boolean isValid = Utils.verifyPaymentSignature(options, this.razorpayKeySecret);

		if (isValid) {
			transaction.setStatus("PAID");
			transactionRepo.save(transaction);
			return "Payment verified successfully and status updated.";
		} else {
			transaction.setStatus("FAILED");
			transactionRepo.save(transaction);
			return "Payment verification failed.";
		}
	}

	@Override
	public List<TransactionDto> getAllTransactions() {
		List<Transaction> transactions = transactionRepo.findAll();
		if (transactions.isEmpty()) {
			throw new RuntimeException("No transactions found");
		}
		return transactions.stream().map(this::mapEntityToDto).collect(Collectors.toList());
	}

	@Override
	public void addTransaction(TransactionDto transactionDto) {
		Transaction transaction = mapDtoToEntity(transactionDto);
		transactionRepo.save(transaction);
	}

	@Override
	public TransactionDto getTransactionById(int id) {
		Transaction transaction = transactionRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
		return mapEntityToDto(transaction);
	}

	@Override
	public long totalTransactions() {
		return transactionRepo.count();
	}

	// map entity to dto helper method
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
            // Assuming Customer entity has a getUserid() method
            dto.setCustomerId(transaction.getCustomer().getUserid());
        }
        if (transaction.getRequest() != null) {
            // Assuming VeichleRequest entity has a getRequestid() method
            dto.setRequestId(transaction.getRequest().getRequestid());
        }
        if (transaction.getVeichle() != null) {
            // Assuming Veichles entity has an getId() method
            dto.setVeichleId(transaction.getVeichle().getId());
        }
        return dto;
    }

    /**
     * Maps a TransactionDto to a new Transaction entity.
     * It fetches related objects from the database using the IDs in the DTO.
     */
    private Transaction mapDtoToEntity(TransactionDto dto) {
        // Fetch related entities from the DB
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

        // Note: razorpayOrderId is usually set during the createInitialTransaction flow, 
        // not typically in a generic addTransaction method unless it's a manual entry.
        // If your DTO includes it, you should set it:
        // transaction.setRazorpayOrderId(dto.getRazorpayOrderId()); 
        
        return transaction;
    }
}