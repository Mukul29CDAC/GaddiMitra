package com.cdac.gaaddimitra.entitiesDTO;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.cdac.gaaddimitra.entities.Customer;


@Component
public class VeichleRequestDto {
	
	private int requestid;

	private int customerid;
	
	
	private String requesttype;

	private String veichletype;
	
	
	private String brand;
	
	
	private String model;
	
	
	private LocalDateTime datetime;
	
	private String description;
	
	private String status;
////	
////	@ManyToOne
////	@JoinColumn(name = "customerid") // Foreign key in orders table
	private Customer customer;


	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public VeichleRequestDto() {
		super();
	}

	public VeichleRequestDto(int requestid, int customerid, String requesttype, String veichletype, String brand,
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
