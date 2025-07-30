package com.cdac.gaaddimitra.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.gaaddimitra.entities.Notification;

public interface NotificationRepo extends JpaRepository<Notification, Integer> {

}
