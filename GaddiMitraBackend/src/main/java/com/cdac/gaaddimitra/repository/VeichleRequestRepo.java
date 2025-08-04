package com.cdac.gaaddimitra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cdac.gaaddimitra.entities.VeichleRequest;

@Repository
public interface VeichleRequestRepo extends JpaRepository<VeichleRequest, Integer>{

	@Query(value = "Select * FROM veichlerequest where customerid:customerid", nativeQuery=true)
	public List<VeichleRequest> findByCustomerId(@Param("customerid") int id);
}

