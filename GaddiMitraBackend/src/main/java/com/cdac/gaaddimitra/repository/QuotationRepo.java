package com.cdac.gaaddimitra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cdac.gaaddimitra.entities.Quotation;
//import com.cdac.gaaddimitra.entitiesDTO.QuotationDto;

@Repository
public interface QuotationRepo extends JpaRepository<Quotation, Integer>{
	
	@Query(value="select * from quotation where customerid=:customerid",nativeQuery=true)
	List<Quotation> findByCustomerId(int customerid);
	

	@Query(value="select * from quotation where senderid=:senderid",nativeQuery=true)
	List<Quotation> findBySenderId(int senderid );

}
