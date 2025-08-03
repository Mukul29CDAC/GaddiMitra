package com.cdac.gaaddimitra.observer;

//import java.time.LocalDateTime;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.cdac.gaaddimitra.controllers.NotificationController;
import com.cdac.gaaddimitra.entities.Notification;
import com.cdac.gaaddimitra.entities.ServiceCenter;
import com.cdac.gaaddimitra.entities.Users;
import com.cdac.gaaddimitra.entities.VeichleRequest;
import com.cdac.gaaddimitra.repository.ServiceCenterRepo;
import com.cdac.gaaddimitra.repository.UserRepository;

@Component
public class VeichleRequestPublisher {
		
	@Autowired
	UserRepository repoDealer;
	
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
 
		        }
	        }else {
	        	List<Users> dealers = (List<Users>) repoDealer.findByRole("dealer");
		        for (Users dealer : dealers) {
		        	Notification notification = notifyController.createNotification(vec,"dealer");
		        	notifyController.sendNotification(notification);

		        }
	        }
	    }
	    
	   
}
