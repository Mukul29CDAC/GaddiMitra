package com.cdac.gaaddimitra.services;

import com.cdac.gaaddimitra.entitiesDTO.TransactionDto;
import com.razorpay.RazorpayException; // Import this
import java.util.List;

public interface TransactionService {
    
    List<TransactionDto> getAllTransactions();
    long totalTransactions();
    void addTransaction(TransactionDto transactionDto);
    TransactionDto getTransactionById(int id);
    void createInitialTransaction(TransactionDto tDto, String razorpayOrderId, String status);

    /**
     * Verifies the payment signature and updates the transaction status in the database.
     * @param razorpayOrderId The order_id from Razorpay.
     * @param razorpayPaymentId The payment_id from Razorpay.
     * @param razorpaySignature The signature from Razorpay.
     * @return A message indicating success or failure.
     * @throws RazorpayException
     */
    String verifyAndUpdateTransaction(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) throws RazorpayException;
}