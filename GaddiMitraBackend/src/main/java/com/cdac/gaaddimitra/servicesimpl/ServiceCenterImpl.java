package com.cdac.gaaddimitra.servicesimpl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.ServiceCenter;
import com.cdac.gaaddimitra.entitiesDTO.ServiceCenterDto;
import com.cdac.gaaddimitra.repository.ServiceCenterRepo;
import com.cdac.gaaddimitra.services.ServiceCenterIntf;


@Service
public class ServiceCenterImpl implements ServiceCenterIntf{
	
	@Autowired
	ServiceCenterRepo serviceRepo;
	
	@Autowired
	ServiceCenterDto proxyCenter;
	
	@Override
	public void addServiceCenter(ServiceCenterDto objDTO) {
		ServiceCenter obj = new ServiceCenter();
		BeanUtils.copyProperties(objDTO, obj);
		serviceRepo.save(obj);
	}

	@Override
	public List<ServiceCenterDto> getAllServiceCenter() {
		
		List<ServiceCenterDto> allCenters = new ArrayList<>();
 		Iterator<ServiceCenter> itr =  serviceRepo.findAll().iterator();
		
		while(itr.hasNext()) {
			BeanUtils.copyProperties(itr.next(),proxyCenter);
			allCenters.add(proxyCenter);
		}
		
		return allCenters;
		
	}
	
	@Override
	public ServiceCenterDto getOneCenter(int id) {
		
		Optional<ServiceCenter> center = serviceRepo.findById(id);
		BeanUtils.copyProperties(center.get(),proxyCenter);
		return proxyCenter;
	}


}
