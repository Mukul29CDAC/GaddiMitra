package com.cdac.gaaddimitra.servicesimpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
        System.out.println("Service: allRequests() called for customer ID: " + id);

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

        System.out.println("Service: Found " + proxylist.size() + " requests for customer ID: " + id);
        return proxylist;
    }

	public long totalRequests() {
		// TODO Auto-generated method stub
		return repoRequest.count();
		
	}

}
