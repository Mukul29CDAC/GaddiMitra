package com.cdac.gaaddimitra.entities;

import java.time.LocalDateTime;

import com.cdac.gaaddimitra.utility.NotificationStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name="notification")
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int notificationid;
	
	@Column(name="requestid")
	private int requestid;
	
	@Column(name="customerid")
	private int customerid;
	
	@Column(name="recievertype")
	private String recievertype;
	
	@Column(name="message")
	private String message;
	
	@Column(name="datetime")
	private LocalDateTime datetime;
	
	@Enumerated(value = jakarta.persistence.EnumType.STRING)
	private NotificationStatus status;
	
	@ManyToOne
	@JoinColumn(name = "requestid",insertable=false, updatable=false) // Foreign key in notification table
	private VeichleRequest request;
	
	public Notification() {
		super();
	}

	public Notification(int requestid, int customerid, String recievertype, 
			String message, LocalDateTime datetime, NotificationStatus status) {
		super();
		this.requestid = requestid;
		this.customerid = customerid;
		this.recievertype = recievertype;
		this.message = message;
		this.datetime = datetime;
		this.status = status;
	}

	public int getNotificationid() {
		return notificationid;
	}

	public void setNotificationid(int notificationid) {
		this.notificationid = notificationid;
	}

	public int getRequestid() {
		return requestid;
	}

	public void setRequestid(int requestid) {
		this.requestid = requestid;
	}

	public int getCustomerid() {
		return customerid;
	}

	public void setCustomerid(int customerid) {
		this.customerid = customerid;
	}

	public String getRecievertype() {
		return recievertype;
	}

	public void setRecievertype(String recievertype) {
		this.recievertype = recievertype;
	}



	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getDatetime() {
		return datetime;
	}

	public void setDatetime(LocalDateTime datetime) {
		this.datetime = datetime;
	}

	public NotificationStatus getStatus() {
		return status;
	}

	public void setStatus(NotificationStatus status) {
		this.status = status;
	}

	public VeichleRequest getRequest() {
		return request;
	}

	public void setRequest(VeichleRequest request) {
		this.request = request;
	}

	@Override
	public String toString() {
		return "Notification [notificationid=" + notificationid + ", requestid=" + requestid + ", customerid="
				+ customerid + ", recievertype=" + recievertype +", message="
				+ message + ", datetime=" + datetime + ", status=" + status + ", request=" + request + "]";
	}
	
	
	
	
	
	
}
