package com.cdac.gaaddimitra.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
//import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestTemplate;

import com.cdac.gaaddimitra.entities.Notification;
import com.cdac.gaaddimitra.entities.VeichleRequest;
import com.cdac.gaaddimitra.entitiesDTO.NotificationDTO;
import com.cdac.gaaddimitra.entitiesDTO.VeichleRequestDto;
import com.cdac.gaaddimitra.repository.NotificationRepo;
import com.cdac.gaaddimitra.utility.NotificationStatus;

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
		notify.setDatetime(LocalDateTime.now() );
		notify.setRecievertype(type);
//		notify.setVeichletype(vec.getVeichletype());
		notify.setCustomerid(vec.getCustomerid()); //vec.getCustomerid());
		notify.setStatus(NotificationStatus.PENDING);
		repoNotify.save(notify);
    	return notify;
	}

	   
	public void sendNotification(Notification msg) {
//		new RestTemplate().postForEntity("http://localhost:8080/servicecenter/getNotify", msg, Notification.class);
	}
	
	@GetMapping("/getNotification")
	public ResponseEntity<List<NotificationDTO>>  show(){
	
		List<Notification> notify = repoNotify.findAll();
		List<NotificationDTO> notifyDTO = notify.stream().map(n -> {
			NotificationDTO dto = new NotificationDTO();
			BeanUtils.copyProperties(n, dto);
			return dto;
		}).toList();
		return ResponseEntity.ok(notifyDTO); 
	}
	
	@GetMapping("/getNotification/{id}")
	public ResponseEntity<List<NotificationDTO>> customerNotification(@PathVariable int id){
	
		List<Notification> notify = repoNotify.findByCustomerId(id);
		List<NotificationDTO> notifyDTO = notify.stream().map(n -> {
			NotificationDTO dto = new NotificationDTO();
			BeanUtils.copyProperties(n, dto);
			return dto;
		}).toList();
		return ResponseEntity.ok(notifyDTO); 
	}
	
	@GetMapping("/allNotification/{recievertype}")
	public ResponseEntity<List<NotificationDTO>> allNotification(@PathVariable String recievertype){
		List<Notification> notify = repoNotify.findByRecieverType(recievertype);
		List<NotificationDTO> notifyDTO = notify.stream().map(n -> {
			NotificationDTO dto = new NotificationDTO();
			BeanUtils.copyProperties(n, dto);
			return dto;
		}).toList();
		return ResponseEntity.ok(notifyDTO); 
	}


}
