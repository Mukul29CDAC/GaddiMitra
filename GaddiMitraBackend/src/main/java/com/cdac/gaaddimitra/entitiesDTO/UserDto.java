package com.cdac.gaaddimitra.entitiesDTO;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private int userid;
    private String name;
    private String email;
    private String phone;
    private String password;
    private String address;
    private String role;
    private String type;
}