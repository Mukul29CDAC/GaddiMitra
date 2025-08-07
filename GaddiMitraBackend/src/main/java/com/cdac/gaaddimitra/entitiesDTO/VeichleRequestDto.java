package com.cdac.gaaddimitra.entitiesDTO;

import com.cdac.gaaddimitra.entities.Customer;
import lombok.*;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"imagedata", "customer"})
public class VeichleRequestDto {
    private int requestid;
    private int customerid;
    private String requesttype;
    private String veichletype;
    private String brand;
    private String model;
    private LocalDateTime datetime = LocalDateTime.now();
    private String description;
    private String status;
    private String imageurl;
    private String imagedata;
    private Customer customer;
}
////
////@ManyToOne
////@JoinColumn(name = "customerid") // Foreign key in orders table