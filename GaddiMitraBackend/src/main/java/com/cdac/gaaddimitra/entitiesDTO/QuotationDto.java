package com.cdac.gaaddimitra.entitiesDTO;
import com.cdac.gaaddimitra.entities.Quotation;
import com.cdac.gaaddimitra.entities.VeichleRequest;
import lombok.*;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"veichleRequest", "quotations"})
public class QuotationDto {
    private int quotationid;
    private int requestid;
    private String sendertype;
    private int senderid;
    private int ammount;
    private LocalDateTime estimatedtime;
    private String description;
    private VeichleRequest veichleRequest;
    private Quotation quotations;
    private int customerid;
    private String sendername;
}



//
//	public Quotation getQuotations() {
//		return quotations;
//	}

//	public VeichleRequest getVeichleRequest() {
//		return veichleRequest;
//	}
