package com.cdac.gaaddimitra.entitiesDTO;

import org.springframework.stereotype.Component;

//import com.cdac.gaaddimitra.utility.ServiceCenterType;


@Component
public class ServiceCenterDto {
	
	private int Servicecenterid;
	
	
	private String name;
	

	private String email;
	
	
	private String phone;
	
	
	private String address;
	
	
	private String password;
	
	
//	private ServiceCenterType type;
	private String type;

	public ServiceCenterDto() {
		super();
	}

	public ServiceCenterDto(int servicecenterid, String name, String email, String phone, String address, String password,
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
