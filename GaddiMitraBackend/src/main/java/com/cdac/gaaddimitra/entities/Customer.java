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
@Table(name = "Customer")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int customerid;
	
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
	
	
	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VeichleRequest> veichlerequest;

	public Customer() {
		super();
	}

	public List<VeichleRequest> getVeichlerequest() {
		return veichlerequest;
	}

	public void setVeichlerequest(List<VeichleRequest> veichlerequest) {
		this.veichlerequest = veichlerequest;
	}

	public Customer(int customerid, String name, String email, String phone, String address, String password) {
		super();
		this.customerid = customerid;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.password = password;
	}

	public int getCustomerid() {
		return customerid;
	}

	public void setCustomerid(int customerid) {
		this.customerid = customerid;
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

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "Customer [customerid=" + customerid + ", name=" + name + ", email=" + email + ", phone=" + phone
				+ ", address=" + address + ", password=" + password + "]";
	}
	
	
	
}
