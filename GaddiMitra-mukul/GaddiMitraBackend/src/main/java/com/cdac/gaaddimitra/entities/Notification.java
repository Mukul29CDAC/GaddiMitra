package com.cdac.gaaddimitra.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
	
	@Column(name="recievertype")
	private String recievertype;
	
	@Column(name="veichletype")
	private String veichletype;
	
	@Column(name="brand")
	private String brand;
	
	@Column(name="model")
	private String model;
	
	@Column(name="message")
	private String message;
	
	@Column(name="datetime")
	private LocalDateTime datetime;
	
	@ManyToOne
	@JoinColumn(name = "requestid",insertable=false, updatable=false) // Foreign key in notification table
	private VeichleRequest request;
	
	public Notification() {
		super();
	}

	public Notification(int notificationid, int requestid, String recievertype, String veichletype, String brand,
			String model, String message, LocalDateTime datetime) {
		super();
		this.notificationid = notificationid;
		this.requestid = requestid;
		this.recievertype = recievertype;
		this.veichletype = veichletype;
		this.brand = brand;
		this.model = model;
		this.message = message;
		this.datetime = datetime;
	}

	
	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getVeichletype() {
		return veichletype;
	}

	public void setVeichletype(String veichletype) {
		this.veichletype = veichletype;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}


	public VeichleRequest getRequest() {
		return request;
	}

	public void setRequest(VeichleRequest request) {
		this.request = request;
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

	@Override
	public String toString() {
		return "Notification [notificationid=" + notificationid + ", requestid=" + requestid + ", recievertype="
				+ recievertype + ", veichletype=" + veichletype + ", brand=" + brand + ", model=" + model + ", message="
				+ message + ", datetime=" + datetime + "]";
	}

	

	
	
	
	
	
}
