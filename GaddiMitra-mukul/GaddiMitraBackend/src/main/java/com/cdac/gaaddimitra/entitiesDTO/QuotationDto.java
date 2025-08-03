package com.cdac.gaaddimitra.entitiesDTO;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.cdac.gaaddimitra.entities.VeichleRequest;


@Component
public class QuotationDto {

	private int quotationid;
	
	private int requestid;

	private String sendertype;

	private int senderid;
	
	private int ammount;

	private LocalDateTime estimatedtime;

	private String description;
	
	private VeichleRequest veichleRequest;

	public QuotationDto() {
		super();
	}

	public QuotationDto(int quotationid, int requestid, String sendertype, int senderid, int ammount,
			LocalDateTime estimatedtime, String description, VeichleRequest veichleRequest) {
		super();
		this.quotationid = quotationid;
		this.requestid = requestid;
		this.sendertype = sendertype;
		this.senderid = senderid;
		this.ammount = ammount;
		this.estimatedtime = estimatedtime;
		this.description = description;
		this.veichleRequest = veichleRequest;
	}

	public int getQuotationid() {
		return quotationid;
	}

	public void setQuotationid(int quotationid) {
		this.quotationid = quotationid;
	}

	public int getRequestid() {
		return requestid;
	}

	public void setRequestid(int requestid) {
		this.requestid = requestid;
	}

	public String getSendertype() {
		return sendertype;
	}

	public void setSendertype(String sendertype) {
		this.sendertype = sendertype;
	}

	public int getSenderid() {
		return senderid;
	}

	public void setSenderid(int senderid) {
		this.senderid = senderid;
	}

	public int getAmmount() {
		return ammount;
	}

	public void setAmmount(int ammount) {
		this.ammount = ammount;
	}

	public LocalDateTime getEstimatedtime() {
		return estimatedtime;
	}

	public void setEstimatedtime(LocalDateTime estimatedtime) {
		this.estimatedtime = estimatedtime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public VeichleRequest getVeichleRequest() {
		return veichleRequest;
	}

	public void setVeichleRequest(VeichleRequest veichleRequest) {
		this.veichleRequest = veichleRequest;
	}

	@Override
	public String toString() {
		return "Quotation [quotationid=" + quotationid + ", requestid=" + requestid + ", sendertype=" + sendertype
				+ ", senderid=" + senderid + ", ammount=" + ammount + ", estimatedtime=" + estimatedtime
				+ ", description=" + description + ", veichleRequest=" + veichleRequest + "]";
	}
}
