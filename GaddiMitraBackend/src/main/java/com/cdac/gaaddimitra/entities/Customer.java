package com.cdac.gaaddimitra.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
public class Customer extends Users {
	
	
	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VeichleRequest> veichlerequest;

	public Customer() {
		super();
	}



	public Customer(int userid, String name, String email, String phone, String password, String address,String role,List<VeichleRequest> veichlerequest) {
		super(userid,name,email,phone,password,address,role);
		this.veichlerequest = veichlerequest;
	}



	public List<VeichleRequest> getVeichlerequest() {
		return veichlerequest;
	}

	public void setVeichlerequest(List<VeichleRequest> veichlerequest) {
		this.veichlerequest = veichlerequest;
	}



	@Override
	public String toString() {
		return "Customer [veichlerequest=" + veichlerequest + "]";
	}
	
	


	
	
	
}
