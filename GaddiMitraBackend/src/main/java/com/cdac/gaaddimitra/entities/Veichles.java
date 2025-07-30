package com.cdac.gaaddimitra.entities;

import java.util.Arrays;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name="veichles")
public class Veichles {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column
	private String brand;
	
	@Column
	private String model;
	
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
	private byte[] imagedata;

	public Veichles() {
		super();
	}

	public Veichles(int id, String brand, String model, String variant, int year, String fueltype, String transmission,
			String bodytype, String price, String imageurl, String description, String imagename, String imagetype,
			byte[] imagedata) {
		super();
		this.id = id;
		this.brand = brand;
		this.model = model;
		this.variant = variant;
		this.year = year;
		this.fueltype = fueltype;
		this.transmission = transmission;
		this.bodytype = bodytype;
		this.price = price;
		this.imageurl = imageurl;
		this.description = description;
		this.imagename = imagename;
		this.imagetype = imagetype;
		this.imagedata = imagedata;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getVariant() {
		return variant;
	}

	public void setVariant(String variant) {
		this.variant = variant;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getFueltype() {
		return fueltype;
	}

	public void setFueltype(String fueltype) {
		this.fueltype = fueltype;
	}

	public String getTransmission() {
		return transmission;
	}

	public void setTransmission(String transmission) {
		this.transmission = transmission;
	}

	public String getBodytype() {
		return bodytype;
	}

	public void setBodytype(String bodytype) {
		this.bodytype = bodytype;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getImageurl() {
		return imageurl;
	}

	public void setImageurl(String imageurl) {
		this.imageurl = imageurl;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImagename() {
		return imagename;
	}

	public void setImagename(String imagename) {
		this.imagename = imagename;
	}

	public String getImagetype() {
		return imagetype;
	}

	public void setImagetype(String imagetype) {
		this.imagetype = imagetype;
	}

	public byte[] getImagedata() {
		return imagedata;
	}

	public void setImagedata(byte[] imagedata) {
		this.imagedata = imagedata;
	}

	@Override
	public String toString() {
		return "Veichles [id=" + id + ", brand=" + brand + ", model=" + model + ", variant=" + variant + ", year="
				+ year + ", fueltype=" + fueltype + ", transmission=" + transmission + ", bodytype=" + bodytype
				+ ", price=" + price + ", imageurl=" + imageurl + ", description=" + description + ", imagename="
				+ imagename + ", imagetype=" + imagetype + ", imagedata=" + Arrays.toString(imagedata) + "]";
	}
	
	
	
	
	
	
}
