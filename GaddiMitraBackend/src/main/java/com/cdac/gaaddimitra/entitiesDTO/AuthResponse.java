package com.cdac.gaaddimitra.entitiesDTO;

import org.springframework.stereotype.Component;

@Component
public class AuthResponse {
	private String token;
	private String role;
	private String email;
	private String name;
	private int userid;
	
	public AuthResponse(String token, String role, String email, String name, int userid) {
		super();
		this.token = token;
		this.role = role;
		this.email = email;
		this.name = name;
		this.userid = userid;
	}

	public AuthResponse() {
		super();
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
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

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	@Override
	public String toString() {
		return "AuthResponse [token=" + token + ", role=" + role + ", email=" + email + ", name=" + name + ", userid="
				+ userid + "]";
	}

}
