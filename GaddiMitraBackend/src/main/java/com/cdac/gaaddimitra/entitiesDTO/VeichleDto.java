package com.cdac.gaaddimitra.entitiesDTO;

import jakarta.persistence.Lob;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "imagedata") // Exclude large binary data from toString()
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
    
    @Lob
    private String imagedata;
}