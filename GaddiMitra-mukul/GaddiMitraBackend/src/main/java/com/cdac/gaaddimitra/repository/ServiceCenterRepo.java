package com.cdac.gaaddimitra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cdac.gaaddimitra.entities.ServiceCenter;

@Repository
public interface ServiceCenterRepo extends JpaRepository<ServiceCenter, Integer>{

	
	@Query(value = "SELECT * FROM service_center WHERE email = :email", nativeQuery = true)
	ServiceCenter findByEmail(@Param("email") String email);
}
