package com.cdac.gaaddimitra.entitiesDTO;

import org.springframework.stereotype.Component;

@Component
public class UserDto {

	private int userid;
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	private String name;
	private String email;
	private String password;
	private String role;
	
	public UserDto() {
		super();
	}
	public UserDto(int id,String email, String password, String role,String name) {
		super();
		this.userid = id;
		this.email = email;
		this.password = password;
		this.role = role;
		this.name = name;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	@Override
	public String toString() {
		return "UserDto [userid=" + userid + ", name=" + name + ", email=" + email + ", password=" + password
				+ ", role=" + role + "]";
	}
	
	
	
	
}
