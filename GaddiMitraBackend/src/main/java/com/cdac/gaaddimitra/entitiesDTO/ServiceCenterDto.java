package com.cdac.gaaddimitra.entitiesDTO;

import org.springframework.stereotype.Component;

//import com.cdac.gaaddimitra.utility.ServiceCenterType;


@Component
public class ServiceCenterDto extends UserDto{
	
	private String type;

	public ServiceCenterDto() {
		super();
	}

	
	public ServiceCenterDto(int id, String name, String email,String password, String phone, String address,String role,String type) {
		super(id,name,email,password,phone,address,role);
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
		return "ServiceCenterDto [type=" + type + "]";
	}
 
	
	
}
