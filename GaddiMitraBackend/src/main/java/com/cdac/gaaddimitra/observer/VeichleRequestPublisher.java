package com.cdac.gaaddimitra.observer;

//import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cdac.gaaddimitra.controllers.NotificationController;
import com.cdac.gaaddimitra.entities.Dealer;
import com.cdac.gaaddimitra.entities.Notification;
import com.cdac.gaaddimitra.entities.ServiceCenter;
import com.cdac.gaaddimitra.entities.VeichleRequest;
//import com.cdac.gaaddimitra.entitiesDTO.VeichleRequestDto;
import com.cdac.gaaddimitra.repository.DealerRepo;
//import com.cdac.gaaddimitra.repository.NotificationRepo;
import com.cdac.gaaddimitra.repository.ServiceCenterRepo;

@Component
public class VeichleRequestPublisher {
		
	@Autowired
	DealerRepo repoDealer;
	
	@Autowired
	NotificationController notifyController;

	 private final ServiceCenterRepo serviceCenterRepo;

	    public VeichleRequestPublisher(ServiceCenterRepo serviceCenterRepo) {
	        this.serviceCenterRepo = serviceCenterRepo;
	    }

	    public void publish(VeichleRequest vec) {
	    	
	    	
	        if(vec.getRequesttype().equalsIgnoreCase("Service")) {
	        	List<ServiceCenter> centers = serviceCenterRepo.findAll();
		        for (ServiceCenter center : centers) {
		        	Notification notification = notifyController.createNotification(vec,"servicecenter");
		        	notifyController.sendNotification(notification);
//		            System.out.println("Notifying " + center.getName() + " about: " + notification);    
		        }
	        }else {
	        	List<Dealer> dealers = repoDealer.findAll();
		        for (Dealer dealer : dealers) {
		        	Notification notification = notifyController.createNotification(vec,"dealer");
		        	notifyController.sendNotification(notification);
//		            System.out.println("Notifying " + dealer.getName() + " about: " + notification);
		        }
	        }
	    }
	    
	   
}
