package com.cdac.gaaddimitra.entitiesDTO;

import java.time.LocalDateTime;

import jakarta.persistence.Column;

public class TransactionDto {
	
	private int transactionId;
	private int customerId;
	private int requestId;
	private String receiverType;
	private int receiverId;
	private int veichleId;
	private String transactionType;
	private int amount;
	private String status;
	private LocalDateTime dateTime;
	
	public TransactionDto() {
		super();
	}
	
	public TransactionDto(int transactionId, int customerId, int requestId, String receiverType, int receiverId,
			int veichleId, String transactionType, int amount, String status, LocalDateTime dateTime) {
		super();
		this.transactionId = transactionId;
		this.customerId = customerId;
		this.requestId = requestId;
		this.receiverType = receiverType;
		this.receiverId = receiverId;
		this.veichleId = veichleId;
		this.transactionType = transactionType;
		this.amount = amount;
		this.status = status;
		this.dateTime = dateTime;
	}

	public int getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(int transactionId) {
		this.transactionId = transactionId;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public int getRequestId() {
		return requestId;
	}

	public void setRequestId(int requestId) {
		this.requestId = requestId;
	}

	public String getReceiverType() {
		return receiverType;
	}

	public void setReceiverType(String receiverType) {
		this.receiverType = receiverType;
	}

	public int getReceiverId() {
		return receiverId;
	}

	public void setReceiverId(int receiverId) {
		this.receiverId = receiverId;
	}

	public int getVeichleId() {
		return veichleId;
	}

	public void setVeichleId(int veichleId) {
		this.veichleId = veichleId;
	}

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}

	@Override
	public String toString() {
		return "TransactionDto [transactionId=" + transactionId + ", customerId=" + customerId + ", requestId="
				+ requestId + ", receiverType=" + receiverType + ", receiverId=" + receiverId + ", veichleId="
				+ veichleId + ", transactionType=" + transactionType + ", amount=" + amount + ", status=" + status
				+ ", dateTime=" + dateTime + "]";
	}
					
	
}
