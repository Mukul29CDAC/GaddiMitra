package com.cdac.gaaddimitra.entities;

import java.time.*;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="veichlerequest")
public class VeichleRequest {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int requestid;
	
	@Column(name="customerid")
	private int customerid;
	
	@Column(name="requesttype")
	private String requesttype;
	
	@Column(name="veichletype")
	private String veichletype;
	
	@Column(name="brand")
	private String brand;
	
	@Column(name="model")
	private String model;
	
	@Column(name="datetime",insertable=false, updatable=false)
	private LocalDateTime datetime;
	
	@Column(name="description")
	private String description;
	
	@Column(name="status")
	private String status;
	
	
	@ManyToOne
	@JoinColumn(name = "customerid",insertable=false, updatable=false) // Foreign key in VeichleRequest  table
	private Customer customer;
	

	@OneToMany(mappedBy = "request", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Notification> notification;
	
	@OneToMany(mappedBy="veichleRequest",cascade = CascadeType.ALL)
	private List<Quotation> quotations;


	public VeichleRequest() {
		super();
	}

	public VeichleRequest(int requestid, int customerid, String requesttype, String veichletype, String brand,
			String model, String description, String status) {
		super();
		this.requestid = requestid;
		this.customerid = customerid;
		this.requesttype = requesttype;
		this.veichletype = veichletype;
		this.brand = brand;
		this.model = model;
		this.datetime = LocalDateTime.now();
		this.description = description;
		this.status = status;
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

	public String getRequesttype() {
		return requesttype;
	}

	public void setRequesttype(String requesttype) {
		this.requesttype = requesttype;
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

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public LocalDateTime getDatetime() {
		return datetime;
	}

	public void setDatetime(LocalDateTime datetime) {
		this.datetime = datetime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "VeichleRequest [requestid=" + requestid + ", customerid=" + customerid + ", requesttype=" + requesttype
				+ ", veichletype=" + veichletype + ", brand=" + brand + ", model=" + model + ", datetime=" + datetime
				+ ", description=" + description + ", status=" + status + "]";
	}
		
}
