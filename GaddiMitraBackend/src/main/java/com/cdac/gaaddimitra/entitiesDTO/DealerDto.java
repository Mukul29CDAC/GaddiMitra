package com.cdac.gaaddimitra.entitiesDTO;

import org.springframework.stereotype.Component;

@Component
public class DealerDto {

	private int dealerid;
	
	private String name;
	
	private String email;

	private String phone;
	
	private String address;
	
	private String password;
	

	public DealerDto() {
		super();
	}

	public DealerDto(int dealerid, String name, String email, String phone, String address, String password) {
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
		return "Dealer [dealerid=" + dealerid + ", name=" + name + ", email=" + email + ", phone=" + phone
				+ ", address=" + address + ", password=" + password + "]";
	}
	
	
}
