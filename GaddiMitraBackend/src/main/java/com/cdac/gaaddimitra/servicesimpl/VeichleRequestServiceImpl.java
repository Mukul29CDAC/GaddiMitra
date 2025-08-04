package com.cdac.gaaddimitra.servicesimpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.gaaddimitra.entities.VeichleRequest;
import com.cdac.gaaddimitra.entitiesDTO.VeichleRequestDto;
import com.cdac.gaaddimitra.observer.VeichleRequestPublisher;
import com.cdac.gaaddimitra.repository.VeichleRequestRepo;
import com.cdac.gaaddimitra.services.VeichleRequestIntf;



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
		publisher.publish(vec);
		
	}


	public List<VeichleRequestDto> allRequests(int id) {
		List<VeichleRequestDto> proxylist = new ArrayList<>();
		Iterator<VeichleRequest> itr = repoRequest.findByCustomerId(id).iterator();
		
		while(itr.hasNext()) {
			VeichleRequest request = itr.next();
			VeichleRequestDto dto =  new VeichleRequestDto();
			BeanUtils.copyProperties(itr.next(), dto);	
			
			  if (request.getImagedata() != null) {
				  dto.setImagedata(Base64.getEncoder().encodeToString(request.getImagedata()));
		        }
			
			proxylist.add(dto);
		}

		return proxylist;
	}

	public List<VeichleRequestDto> getAllServiceRequest() {
		List<VeichleRequestDto> veichleRequests = repoRequest.findByRequestType("service");
		if (veichleRequests.isEmpty()) {
			throw new RuntimeException("No service requests found");
		}
		else {
			return veichleRequests;
		}
	}

	public long totalRequests() {
		// TODO Auto-generated method stub
		return repoRequest.count();
		
	}

}
