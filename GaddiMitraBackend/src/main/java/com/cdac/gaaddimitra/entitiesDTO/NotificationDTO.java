package com.cdac.gaaddimitra.entitiesDTO;

import com.cdac.gaaddimitra.utility.NotificationStatus;
import lombok.*;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private int notificationid;
    private int requestid;
    private int customerid;
    private String recievertype;
    private String model;
    private String message;
    private NotificationStatus status;
}