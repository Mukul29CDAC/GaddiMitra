package com.cdac.gaaddimitra.entitiesDTO;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.cdac.gaaddimitra.utility.NotificationStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;

@Component
public class NotificationDTO {
	
private int notificationid;
	

	private int requestid;
	

	private int customerid;
	

	private String recievertype;

	
	private String model;
	
	private String message;

	private NotificationStatus status;

	public NotificationDTO(int notificationid, int requestid, int customerid, String recievertype, String model,
			String message, NotificationStatus status) {
		super();
		this.notificationid = notificationid;
		this.requestid = requestid;
		this.customerid = customerid;
		this.recievertype = recievertype;
		this.model = model;
		this.message = message;
		this.status = status;
	}

	public NotificationDTO() {
		super();
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

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public NotificationStatus getStatus() {
		return status;
	}

	public void setStatus(NotificationStatus status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "NotificationDTO [notificationid=" + notificationid + ", requestid=" + requestid + ", customerid="
				+ customerid + ", recievertype=" + recievertype + ", model=" + model + ", message=" + message
				+ ", status=" + status + "]";
	}
	
	


	
	

}
