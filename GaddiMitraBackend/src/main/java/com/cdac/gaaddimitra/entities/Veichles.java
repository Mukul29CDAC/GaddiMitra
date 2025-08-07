package com.cdac.gaaddimitra.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.Arrays;

@Entity
@Table(name = "veichles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Veichles {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column
	private String brand;

	@Column
	private String model;

	@Column
	private int userid;

	@Column
	private String variant;

	@Column
	private int year;

	@Column
	private String fueltype;

	@Column
	private String transmission;

	@Column
	private String bodytype;

	@Column
	private String price;

	@Column
	private String imageurl;

	@Column
	private String description;

	private String imagename;
	private String imagetype;

	@Lob
	@ToString.Exclude
	private byte[] imagedata;

	@ToString.Exclude
	@ManyToOne
	@JoinColumn(name = "userid", insertable = false, updatable = false)
	// Foreign key in notification table
	private Dealer dealer;
}