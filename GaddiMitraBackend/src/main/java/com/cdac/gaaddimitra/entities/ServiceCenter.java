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
@Table(name="ServiceCenter")
public class ServiceCenter {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Servicecenterid;
	
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
	
//	@Enumerated(EnumType.STRING)
//	private ServiceCenterType type;
	
	@Column(name ="type")
	private String type;

	public ServiceCenter() {
		super();
	}

	public ServiceCenter(int servicecenterid, String name, String email, String phone, String address, String password,
			String type) {
		super();
		Servicecenterid = servicecenterid;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.password = password;
		this.type = type;
	}

	public int getServicecenterid() {
		return Servicecenterid;
	}

	public void setServicecenterid(int servicecenterid) {
		Servicecenterid = servicecenterid;
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "ServiceCenter [Servicecenterid=" + Servicecenterid + ", name=" + name + ", email=" + email + ", phone="
				+ phone + ", address=" + address + ", password=" + password + ", type=" + type + "]";
	}
	
	
}
