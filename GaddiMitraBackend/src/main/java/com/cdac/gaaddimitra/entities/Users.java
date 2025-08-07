package com.cdac.gaaddimitra.entities;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class Users implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userid;

    @Column(name = "name")
    private String name;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "password")
    private String password;

    @Column(name = "address")
    private String address;

    @Column(name = "role")
    private String role;

    public Users() {}

    public Users(int userid, String name, String email, String phone, String password, String address, String role) {
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.address = address;
        this.role = role;
    }

    // Getters and Setters
    public int getUserid() { return userid; }
    public void setUserid(int userid) { this.userid = userid; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    @Override
    public String toString() {
        return "Users{" +
                "userid=" + userid +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", password='" + password + '\'' +
                ", address='" + address + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

    // UserDetails interface methods

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> role); // returns a simple GrantedAuthority with the user's role
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

	public User orElseThrow(Object object) {
		// TODO Auto-generated method stub
		return null;
	}
}
