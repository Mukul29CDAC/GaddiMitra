package com.cdac.gaaddimitra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cdac.gaaddimitra.entities.VeichleRequest;

@Repository
public interface VeichleRequestRepo extends JpaRepository<VeichleRequest, Integer>{

	
}

