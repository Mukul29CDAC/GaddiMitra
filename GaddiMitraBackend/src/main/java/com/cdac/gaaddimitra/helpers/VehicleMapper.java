//package com.cdac.gaaddimitra.helpers;
//
//import java.util.Base64;
//
//import com.cdac.gaaddimitra.entities.Veichles;
//import com.cdac.gaaddimitra.entitiesDTO.VeichleDto;
//
//public class VehicleMapper {
//
//    public static VeichleDto toDTO(Veichles vehicle) {
//    	VeichleDto dto = new VeichleDto();
//        dto.setUserId(vehicle.getUserid());
//        dto.setBrand(vehicle.getBrand());
//        dto.setModel(vehicle.getModel());
//        dto.setVariant(vehicle.getVariant());
//        dto.setYear(vehicle.getYear());
//        dto.setFueltype(vehicle.getFueltype());
//        dto.setTransmission(vehicle.getTransmission());
//        dto.setBodytype(vehicle.getBodytype());
//        dto.setPrice(vehicle.getPrice());
//        dto.setDescription(vehicle.getDescription());
//        if (vehicle.getImagedata() != null) {
//            dto.setImagedata(Base64.getEncoder().encodeToString(vehicle.getImagedata()));
//        }
//        return dto;
//    }
//
//    public static Veichles toEntity(VeichleDto dto) {
//    	Veichles vehicle = new Veichles();
//    	 vehicle.setUserid(dto.getUserId());
//        vehicle.setBrand(dto.getBrand());
//        vehicle.setModel(dto.getModel());
//        vehicle.setVariant(dto.getVariant());
//        vehicle.setYear(dto.getYear());
//        vehicle.setFueltype(dto.getFueltype());
//        vehicle.setTransmission(dto.getTransmission());
//        vehicle.setBodytype(dto.getBodytype());
//        vehicle.setPrice(dto.getPrice());
//        vehicle.setDescription(dto.getDescription());
//        return vehicle;
//    }
//}
//
