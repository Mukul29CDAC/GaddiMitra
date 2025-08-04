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
	UserRepository repoUser;
	
	@Autowired
	NotificationController notifyController;


	    public void publish(VeichleRequest vec) {
	    	
	    		    	
	        if(vec.getRequesttype().equalsIgnoreCase("Service")) {
	        	
	        	List<Users> users = repoUser.findByRole("servicecenter");

	        	
		        for (Users center : users) {
		        	System.out.println(center);

		        	Notification notification = notifyController.createNotification(vec,"servicecenter");
		        	notifyController.sendNotification(notification);
 
		        }
	        }else {
	        	List<Users> users = repoUser.findByRole("dealer");
		        for (Users dealer : users) {
		        	Notification notification = notifyController.createNotification(vec,"dealer");
		        	notifyController.sendNotification(notification);

		        }
	        }
	    }
	    
	   
}
