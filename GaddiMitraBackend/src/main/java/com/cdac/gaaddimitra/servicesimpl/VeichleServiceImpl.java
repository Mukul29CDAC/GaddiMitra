package com.cdac.gaaddimitra.servicesimpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.gaaddimitra.entities.Veichles;
import com.cdac.gaaddimitra.entitiesDTO.VeichleDto;
import com.cdac.gaaddimitra.repository.VeichleRepo;
import com.cdac.gaaddimitra.services.VeichleServiceIntf;


@Service
public class VeichleServiceImpl {

	@Autowired
	VeichleRepo repoVeichle;
	

	
	public void addVeichle(VeichleDto obj,MultipartFile image,int id) {
		Veichles vec = new Veichles();
	
		            vec.setImagename(image.getOriginalFilename());
		            vec.setImagetype(image.getContentType());
		            vec.setUserid(id);
		            try {
						vec.setImagedata(image.getBytes());
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
		        
		BeanUtils.copyProperties(obj, vec);
		repoVeichle.save(vec);
		
	}


	public List<VeichleDto> getAllVeichle() {
	    List<VeichleDto> list = new ArrayList<>();
	    Iterator<Veichles> itr = repoVeichle.findAll().iterator();

	    while (itr.hasNext()) {
	        Veichles veichle = itr.next(); // Store the current entity
	        VeichleDto vech = new VeichleDto();
	        BeanUtils.copyProperties(veichle, vech);

	        if (veichle.getImagedata() != null) {
	            vech.setImagedata(Base64.getEncoder().encodeToString(veichle.getImagedata()));
	        }

	        list.add(vech);
	    }

	    return list;
	}

	public List<VeichleDto> getDealerVeichle(int dealerid) {
	    List<Veichles> veichlesFromDb = repoVeichle.findByDealerId(dealerid);
	    List<VeichleDto> dtoList = new ArrayList<>();

	    for (Veichles entity : veichlesFromDb) {
	        VeichleDto dto = new VeichleDto();
	        BeanUtils.copyProperties(entity, dto);

	        if (entity.getImagedata() != null) {
	            dto.setImagedata(Base64.getEncoder().encodeToString(entity.getImagedata()));
	        }

	        dtoList.add(dto);
	    }

	    return dtoList;
	}



	public int totalVeichle() {
		return (int) repoVeichle.count();
	}

	public void deleteVeichle(int id) {
		// TODO Auto-generated method stub
		Optional<Veichles> vec = repoVeichle.findById(id);
		
		
		repoVeichle.delete(vec.get());
		
		
	}
	
	public VeichleDto getVeichleDetails(int id) {
		
		Optional<Veichles> veichleOpt = repoVeichle.findById(id);
		if (!veichleOpt.isPresent()) {
	        throw new RuntimeException("Vehicle not found with id: " + id);
	    }
		
		Veichles veichle = veichleOpt.get();
		
		VeichleDto vech = new VeichleDto();
		
		BeanUtils.copyProperties(veichle, vech);

        if (veichle.getImagedata() != null) {
            vech.setImagedata(Base64.getEncoder().encodeToString(veichle.getImagedata()));
        }
        
        return vech;
	}
}
