package com.cdac.gaaddimitra.entitiesDTO;

import java.util.List;

import org.springframework.stereotype.Component;

import com.cdac.gaaddimitra.entities.VeichleRequest;

@Component
public class CustomerDto extends UserDto{
	

	public CustomerDto() {
		super();
	}
	
	public CustomerDto(int id, String name, String email,String password, String phone, String address,String role) {
		super(id,name,email,password,phone,address,role);
		
	}
	
	private List<VeichleRequest> veichlerequest;

	public List<VeichleRequest> getVeichlerequest() {
		return veichlerequest;
	}
	
	public void setVeichlerequest(List<VeichleRequest> veichlerequest) {
		this.veichlerequest = veichlerequest;
	}
	
	@Override
	public String toString() {
		return "CustomerDto [veichlerequest=" + veichlerequest + "]";
	}
	
}
