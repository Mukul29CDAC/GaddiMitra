package com.cdac.gaaddimitra.entities;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="Dealer")
public class Dealer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int dealerid;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "phone")
	private String phone;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "address")
	private String address;
	

	public Dealer() {
		super();
	}

	public Dealer(int dealerid, String name, String email, String phone, String address, String password) {
		super();
		this.dealerid = dealerid;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.password = password;
	}

	public int getDealerid() {
		return dealerid;
	}

	public void setDealerid(int dealerid) {
		this.dealerid = dealerid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String location) {
		this.address = location;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "Dealer [dealerid=" + dealerid + ", name=" + name + ", email=" + email + ", phone=" + phone
				+ ", address=" + address + ", password=" + password + "]";
	}
	
	


}
