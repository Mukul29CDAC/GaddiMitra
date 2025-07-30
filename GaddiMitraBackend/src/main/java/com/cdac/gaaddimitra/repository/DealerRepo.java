package com.cdac.gaaddimitra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cdac.gaaddimitra.entities.Dealer;

@Repository
public interface DealerRepo extends JpaRepository<Dealer, Integer> {

	@Query(value = "SELECT * FROM dealer WHERE email = :email", nativeQuery = true)
	Dealer findByEmail(@Param("email") String email);
}
