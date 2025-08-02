package com.cdac.gaaddimitra.entities;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
public class Dealer extends Users {
	
	
	
	public Dealer() {
		super();
	}

	public Dealer(int userid, String name, String email, String phone, String password, String address,String role) {
		super(userid,name,email,phone,password,address,role);
	}

	@Override
	public String toString() {
		return "Dealer []";
	}


	
	
	
	


	



}
