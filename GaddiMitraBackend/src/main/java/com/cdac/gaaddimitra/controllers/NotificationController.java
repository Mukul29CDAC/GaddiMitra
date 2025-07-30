package com.cdac.gaaddimitra.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestTemplate;

import com.cdac.gaaddimitra.entities.Notification;
import com.cdac.gaaddimitra.entities.VeichleRequest;
import com.cdac.gaaddimitra.repository.NotificationRepo;

@CrossOrigin(origins = "*")
@Component
@RestController
public class NotificationController {

	
	@Autowired
	NotificationRepo repoNotify;
	
	@Autowired
	ServiceCenterController servicecenter;
	
//	@Autowired
//	private RestTemplate restTemplate;
	
	public Notification createNotification(VeichleRequest vec,String type) {
		Notification notify = new Notification();
    	notify.setRequestid(vec.getRequestid());
		notify.setMessage(vec.getDescription());
		notify.setDatetime(vec.getDatetime());
		notify.setBrand(vec.getBrand());
		notify.setModel(vec.getModel());
		notify.setDatetime(LocalDateTime.now() );
		notify.setRecievertype(type);
		notify.setVeichletype(vec.getVeichletype());
		repoNotify.save(notify);
    	return notify;
	}
	
	public void sendNotification(Notification msg) {
//		new RestTemplate().postForEntity("http://localhost:8080/servicecenter/getNotify", msg, Notification.class);
	}
	
	@GetMapping("/getNotification")
	public List<Notification> show(){
		return repoNotify.findAll();
	}

}
