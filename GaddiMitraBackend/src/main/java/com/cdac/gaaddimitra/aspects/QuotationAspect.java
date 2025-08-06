package com.cdac.gaaddimitra.aspects;

import java.util.Optional;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cdac.gaaddimitra.entities.ServiceCenter;
import com.cdac.gaaddimitra.entities.Users;
import com.cdac.gaaddimitra.entitiesDTO.QuotationDto;
import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.repository.ServiceCenterRepo;
import com.cdac.gaaddimitra.repository.UserRepository;
import com.cdac.gaaddimitra.servicesimpl.EmailService;

@Component
@Aspect
public class QuotationAspect {
	
	@Autowired
	UserRepository repoUser;
	
	@Autowired
	ServiceCenterRepo repoService;
	
	@Autowired
	EmailService emailService;

	
	@AfterReturning("execution(* com.cdac.gaaddimitra.controllers.QuotationController.sendQuotation(..))")
	public void afterAddQuotation(JoinPoint joinPoint) {
		Object[] args= joinPoint.getArgs();
		
		 for (Object arg : args) {
			 if (arg instanceof QuotationDto quotation) {
				 int userid = quotation.getCustomerid();
//				 System.out.println("Myid"+userid);
				 Optional<Users> reciever = repoUser.findById(userid);
				 Optional<ServiceCenter> sender = repoService.findById(quotation.getSenderid());
				 if (reciever.isPresent()) {
				     Users user = reciever.get();
				     if (user.getEmail() != null && !user.getEmail().isEmpty()) {
				         emailService.sendSimpleEmail(
				             user.getEmail(),
				             "Quotation Received!",
				             "You got a new Quotation"
				         );
				         
				         emailService.sendSimpleEmail(
				        		 sender.get().getEmail(),
					             "Quotation Sent!",
					             "You send a Quotation"
					         );
				     } else {
				         System.out.println("User email is null or empty.");
				     }
				 } else {
				     System.out.println("No user found with id: " + userid);
				 }

	            }
		 }
		
		
	}
}


