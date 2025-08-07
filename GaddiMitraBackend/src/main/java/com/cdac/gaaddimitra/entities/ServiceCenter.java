package com.cdac.gaaddimitra.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class ServiceCenter extends Users {
    
    @Column(name = "type")
    private String type;
}