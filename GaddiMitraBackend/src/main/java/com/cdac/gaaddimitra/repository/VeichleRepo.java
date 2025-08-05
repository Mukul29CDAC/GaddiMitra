package com.cdac.gaaddimitra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cdac.gaaddimitra.entities.Veichles;

@Repository
public interface VeichleRepo extends JpaRepository<Veichles, Integer> {

	@Query(value = "SELECT * FROM veichles where userid=:userid" ,nativeQuery= true)
	public List<Veichles> findByDealerId(@Param("userid") int userid);
}
