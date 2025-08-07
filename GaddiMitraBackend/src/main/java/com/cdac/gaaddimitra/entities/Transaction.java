package com.cdac.gaaddimitra.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "transaction")
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int transactionid;

	@ManyToOne
	@JoinColumn(name = "customerid", nullable = false)
	private Customer customer;

	@ManyToOne
	@JoinColumn(name = "requestid", nullable = false)
	private VeichleRequest request;

	@Column(name = "receivertype")
	private String receiverType;

	@Column(name = "receiverid")
	private int receiverId;

	@ManyToOne
	@JoinColumn(name = "veichleid", nullable = false)
	private Veichles veichle;

	@Column(name = "transactiontype")
	private String transactionType;

	@Column(name = "amount")
	private int amount;

	@Column(name = "status")
	private String status;

	@Column(name = "datetime")
	private LocalDateTime dateTime;

	// --- NEW FIELD ---
	@Column(name = "razorpay_order_id")
	private String razorpayOrderId;

	public Transaction() {
		super();
	}

	public Transaction(int transactionid, Customer customer, VeichleRequest request, String receiverType,
			int receiverId, Veichles veichle, String transactionType, int amount, String status,
			LocalDateTime dateTime) {
		this.transactionid = transactionid;
		this.customer = customer;
		this.request = request;
		this.receiverType = receiverType;
		this.receiverId = receiverId;
		this.veichle = veichle;
		this.transactionType = transactionType;
		this.amount = amount;
		this.status = status;
		this.dateTime = dateTime;
	}

	public int getTransactionid() {
		return transactionid;
	}

	public void setTransactionid(int transactionid) {
		this.transactionid = transactionid;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public VeichleRequest getRequest() {
		return request;
	}

	public void setRequest(VeichleRequest request) {
		this.request = request;
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

	public Veichles getVeichle() {
		return veichle;
	}

	public void setVeichle(Veichles veichle) {
		this.veichle = veichle;
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

	public String getRazorpayOrderId() {
		return razorpayOrderId;
	}

	public void setRazorpayOrderId(String razorpayOrderId) {
		this.razorpayOrderId = razorpayOrderId;
	}

	@Override
	public String toString() {
		return "Transaction{" + "transactionid=" + transactionid + ", customer=" + customer + ", request=" + request
				+ ", receiverType='" + receiverType + '\'' + ", receiverId=" + receiverId + ", veichle=" + veichle
				+ ", transactionType='" + transactionType + '\'' + ", amount=" + amount + ", status='" + status + '\''
				+ ", dateTime=" + dateTime + '}';
	}

}
