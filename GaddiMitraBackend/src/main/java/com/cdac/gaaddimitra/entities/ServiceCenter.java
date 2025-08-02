package com.cdac.gaaddimitra.entities;

//import com.cdac.gaaddimitra.utility.ServiceCenterType;


import jakarta.persistence.Column;

import jakarta.persistence.Entity;
//import jakarta.persistence.EnumType;
//import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
//@Table(name="ServiceCenter")
public class ServiceCenter extends Users{
	

	
//	@Enumerated(EnumType.STRING)
//	private ServiceCenterType type;
	
	@Column(name ="type")
	private String type;

	public ServiceCenter() {
		super();
	}

	public ServiceCenter(String type) {
		super();
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "ServiceCenter [type=" + type + "]";
	}


	
}
