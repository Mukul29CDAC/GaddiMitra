package com.cdac.gaaddimitra.controllers;

import com.cdac.gaaddimitra.entitiesDTO.TransactionDto;
import com.cdac.gaaddimitra.services.TransactionService; // --> FIX: Autowire the interface, not the implementation
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/transaction") 
public class TransactionController {

    @Autowired
    private TransactionService transactionService; 

    @Autowired
    private RazorpayClient razorpayClient; 

    /**
     * Endpoint to create a Razorpay order and save the initial transaction record.
     */
    @PostMapping("/create")
    public String createTransactionOrder(@RequestBody TransactionDto tDto) throws RazorpayException {
        
        JSONObject options = new JSONObject();
        options.put("amount", tDto.getAmount() * 100);
        options.put("currency", "INR");
        options.put("receipt", "txn_receipt_" + tDto.getRequestId());

        // --> FIX: Use lowercase 'orders' and the injected client check if Orders is required
        Order order = this.razorpayClient.Orders.create(options);
        
        String razorpayOrderId = order.get("id");
        
        transactionService.createInitialTransaction(tDto, razorpayOrderId, order.get("status"));
          
        return order.toString();
    }

    /**
     * CRITICAL: Endpoint for the frontend to call after a payment is made.
     * It verifies the payment signature and updates the transaction status in the DB.
     */
    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, String> data) throws RazorpayException {
    	System.out.print(data);
        String razorpayOrderId = data.get("razorpay_order_id");
        String razorpayPaymentId = data.get("razorpay_payment_id");
        String razorpaySignature = data.get("razorpay_signature");

        String resultMessage = transactionService.verifyAndUpdateTransaction(razorpayOrderId, razorpayPaymentId, razorpaySignature);
        
        if (resultMessage.contains("successfully")) {
            return ResponseEntity.ok(resultMessage);
        } else {
            return ResponseEntity.status(400).body(resultMessage);
        }
    }
}