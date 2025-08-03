package com.cdac.gaaddimitra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.gaaddimitra.entities.Veichles;

@Repository
public interface VeichleRepo extends JpaRepository<Veichles, Integer> {

}
