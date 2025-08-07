//package com.cdac.gaaddimitra.observer;
//
////import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import com.cdac.gaaddimitra.controllers.NotificationController;
//import com.cdac.gaaddimitra.entities.Notification;
//import com.cdac.gaaddimitra.entities.Quotation;
//import com.cdac.gaaddimitra.entities.ServiceCenter;
//import com.cdac.gaaddimitra.entities.Users;
//import com.cdac.gaaddimitra.entities.VeichleRequest;
//import com.cdac.gaaddimitra.repository.ServiceCenterRepo;
//import com.cdac.gaaddimitra.repository.UserRepository;
//
//@Component
//public class QuotationRequestPublisher {
//		
//	@Autowired
//	UserRepository repoUser;
//	
//	@Autowired
//	NotificationController notifyController;
//
//
//	    public void publish(Quotation quot) {
//	    	
//	    	Optional<Users> sender = repoUser.findById(quot.getSenderid());
//	        if(sender.get().getRole().equalsIgnoreCase("Servicecenter")) {
//	        	
//		        	Notification notification = notifyController.createNotification(vec,"servicecenter");
//		        	notifyController.sendNotification(notification);
// 
//		        
//	        }else {
//	        	List<Users> users = repoUser.findByRole("dealer");
//		        for (Users dealer : users) {
//		        	Notification notification = notifyController.createNotification(vec,"dealer");
//		        	notifyController.sendNotification(notification);
//
//		        }
//	        }
//	    }
//	    
//	   
//}
