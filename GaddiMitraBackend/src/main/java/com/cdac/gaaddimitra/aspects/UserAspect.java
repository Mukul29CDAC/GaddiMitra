package com.cdac.gaaddimitra.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.servicesimpl.EmailService;

@Aspect
@Component
public class UserAspect {

    @Autowired
    EmailService emailService;

    @AfterReturning("execution(* com.cdac.gaaddimitra.controllers.UserController.login(..))")
    public void afterLogin(JoinPoint joinPoint) {
      
        Object[] args = joinPoint.getArgs();

        for (Object arg : args) {
            if (arg instanceof UserDto user) {
                System.out.println("Login email: " + user.getEmail());
                if (user.getEmail() != null && !user.getEmail().isEmpty()) {
                    emailService.sendSimpleEmail(
                        user.getEmail(),
                        "Login Alert!",
                        "Recently login to a device"
                    );
                } else {
                    System.out.println("User email is null or empty.");
                }
            }
        }
    }
    
    @AfterReturning("execution(* com.cdac.gaaddimitra.controllers.UserController.register(..))")
    public void afterRegister(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();

        for (Object arg : args) {
            if (arg instanceof UserDto user) {
                if (user.getEmail() != null && !user.getEmail().isEmpty()) {
                    emailService.sendSimpleEmail(
                        user.getEmail(),
                        "Registration Alert!",
                        "Successfully Registered to GaadiMitra"
                    );
                } else {
                    System.out.println("User email is null or empty.");
                }
            }
        }
    }
}

