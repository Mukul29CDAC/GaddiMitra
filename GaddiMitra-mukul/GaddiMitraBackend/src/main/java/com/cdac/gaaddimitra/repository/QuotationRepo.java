package com.cdac.gaaddimitra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.gaaddimitra.entities.Quotation;
//import com.cdac.gaaddimitra.entitiesDTO.QuotationDto;

@Repository
public interface QuotationRepo extends JpaRepository<Quotation, Integer>{


}
