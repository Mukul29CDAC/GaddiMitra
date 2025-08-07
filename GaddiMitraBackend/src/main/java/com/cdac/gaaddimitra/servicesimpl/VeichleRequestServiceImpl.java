package com.cdac.gaaddimitra.servicesimpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.gaaddimitra.entities.Users;
import com.cdac.gaaddimitra.entities.VeichleRequest;
import com.cdac.gaaddimitra.entitiesDTO.VeichleRequestDto;
import com.cdac.gaaddimitra.observer.VeichleRequestPublisher;
import com.cdac.gaaddimitra.repository.VeichleRequestRepo;
import com.cdac.gaaddimitra.services.VeichleRequestIntf;
import com.cdac.gaaddimitra.utility.NotificationStatus;



@Service
public class VeichleRequestServiceImpl{
	
	@Autowired
	VeichleRequestRepo repoRequest;
	

	@Autowired
    private VeichleRequestPublisher publisher;


	public void addRequest(VeichleRequestDto req,MultipartFile image) {
		VeichleRequest vec = new VeichleRequest();
		vec.setImagename(image.getOriginalFilename());
        vec.setImagetype(image.getContentType());
        try {
			vec.setImagedata(image.getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		BeanUtils.copyProperties(req, vec);
		repoRequest.save(vec);
//		publisher.publish(vec);
		
	}




    public List<VeichleRequestDto> allRequests(int id) {
       
        List<VeichleRequest> requests = repoRequest.findByCustomerId(id);

        List<VeichleRequestDto> proxylist = new ArrayList<>();
        for (VeichleRequest request : requests) { // Iterate directly over the List
        	
            VeichleRequestDto dto = new VeichleRequestDto();
            BeanUtils.copyProperties(request, dto);

            if (request.getImagedata() != null) {
                dto.setImagedata(Base64.getEncoder().encodeToString(request.getImagedata()));
            }
            proxylist.add(dto);
        }
        return proxylist;
    }

	public List<VeichleRequestDto> getAllServiceRequest(String role) {
		List<VeichleRequestDto> listDto = new ArrayList();
		Iterator<VeichleRequest> veichleRequests = null;
		if(role.equals("servicecenter")) {
			veichleRequests = repoRequest.findByRequestType("service").iterator();
		}else if(role.equals("dealer")) {
			veichleRequests = repoRequest.findByRequestType("buy").iterator();
		}
		
		if (!veichleRequests.hasNext()) {
			throw new RuntimeException("No service requests found");
		}
		else {
			while(veichleRequests.hasNext()) {
				VeichleRequestDto obj = new VeichleRequestDto();
				BeanUtils.copyProperties(veichleRequests.next(), obj);
				listDto.add(obj);
			}
		}
		return listDto;
	}

	
	public void updateRequestStatus(int id) {
		Optional<VeichleRequest> request = repoRequest.findById(id);
		VeichleRequest req = request.get();
		System.out.print(request);
		req.setStatus("READ");
		
	}
	public long totalRequests() {
		// TODO Auto-generated method stub
		return repoRequest.count();
		
	}

}
