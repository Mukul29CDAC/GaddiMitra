package com.cdac.gaaddimitra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdac.gaaddimitra.entities.Notification;

public interface NotificationRepo extends JpaRepository<Notification, Integer> {

	@Query("SELECT n FROM Notification n WHERE n.customerid = :customerId")
	public List<Notification> findByCustomerId(@Param("customerId") int customerId);
}
