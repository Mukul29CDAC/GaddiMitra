package com.cdac.gaaddimitra.entitiesDTO;

import java.util.Arrays;

import org.springframework.stereotype.Component;

import jakarta.persistence.Lob;

@Component
public class VeichleDto {

	private int id;
	private String brand;
	private String model;
	private String variant;
	private int year;
	private String fueltype;
	private String transmission;
	private String bodytype;
	private String price;
	private String imageurl;
	private String description;

	private String imagedata;

	public VeichleDto() {
		super();
	}

	public VeichleDto(int id, String brand, String model, String variant, int year, String fueltype, String transmission,
			String bodytype, String price, String imageurl, String description, 
			String imagedata) {
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



	public String getImagedata() {
		return imagedata;
	}

	public void setImagedata(String imagedata) {
		this.imagedata = imagedata;
	}

	@Override
	public String toString() {
		return "Veichles [id=" + id + ", brand=" + brand + ", model=" + model + ", variant=" + variant + ", year="
				+ year + ", fueltype=" + fueltype + ", transmission=" + transmission + ", bodytype=" + bodytype
				+ ", price=" + price + ", imageurl=" + imageurl + ", description=" + description + ", imagedata=" + imagedata + "]";
	}
	
	
}
