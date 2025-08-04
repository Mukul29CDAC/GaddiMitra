package com.cdac.gaaddimitra.utility;

public enum NotificationStatus {
	PENDING,
	READ,
	ACCEPTED;
	
	private String status;
	private NotificationStatus() {
		// Default constructor
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
