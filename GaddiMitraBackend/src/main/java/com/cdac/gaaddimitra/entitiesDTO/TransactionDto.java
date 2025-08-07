package com.cdac.gaaddimitra.entitiesDTO;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDto {
    private int transactionId;
    private int customerId;
    private int requestId;
    private String receiverType;
    private int receiverId;
    private String transactionType;
    private int amount;
    private String status;
    private LocalDateTime dateTime;
	
}
//		this.veichleId = veichleId;
