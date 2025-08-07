package com.cdac.gaaddimitra.controllers;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.gaaddimitra.entitiesDTO.TransactionDto;
import com.cdac.gaaddimitra.servicesimpl.TransactionServiceImpl;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@CrossOrigin(origins = "*") // For production, consider being more specific, e.g., "http://your-frontend-domain.com"
@RestController
@RequestMapping("/api")
public class TransactionController {

    @Autowired
    private TransactionServiceImpl transactionService;

    // Use the injected values from application.properties
    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    @PostMapping("/transaction/createTransaction") // Renamed for correctness
    public String createTransaction(@RequestBody TransactionDto tDto) throws RazorpayException {
        
        // 1. Get the amount from the incoming DTO
        int amount = tDto.getAmount(); // Using the corrected getter

        // 2. Create a Razorpay client (using the secure keys from properties)
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        // 3. Prepare the order options
        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // Amount in the smallest currency unit (paise)
        options.put("currency", "INR");
        options.put("receipt", "receipt_for_request_" + tDto.getRequestId()); // Create a meaningful receipt ID

        // 4. Create the Razorpay order
        Order order = razorpayClient.Orders.create(options);
        
        // This is the Razorpay Order ID
        String razorpayOrderId = order.get("id");
        System.out.println("Created Razorpay Order ID: " + razorpayOrderId);

        // 5. **IMPORTANT: Save the transaction details to your database**
        // We pass the incoming DTO and the newly created razorpayOrderId to the service.
        transactionService.createInitialTransaction(tDto, razorpayOrderId, order.get("status"));
        
        // 6. Return the order details to the frontend
        return order.toString();
    }
    
    // You will need a verification endpoint here later!
}