package com.cdac.gaaddimitra.servicesimpl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.Dealer;
import com.cdac.gaaddimitra.entitiesDTO.DealerDto;
import com.cdac.gaaddimitra.repository.DealerRepo;
import com.cdac.gaaddimitra.services.DealerServiceIntf;


@Service
public class DealerServiceImpl implements DealerServiceIntf{
	
	@Autowired
	DealerRepo repoDealer;

	@Override
	public void addDealer(DealerDto objDto) {
		Dealer objDealer = new Dealer();
		BeanUtils.copyProperties(objDto, objDealer);
		repoDealer.save(objDealer);	
	}

	@Override
	public List<DealerDto> getAllDealers() {
		List<DealerDto> allDealers = new ArrayList<>();
		Iterator<Dealer> itr = repoDealer.findAll().iterator();
		
		while(itr.hasNext()) {
			DealerDto proxy = new DealerDto();
			BeanUtils.copyProperties(itr.next(), proxy);
			allDealers.add(proxy);
		}
		return allDealers;
	}

	@Override
	public DealerDto getOneDealer(int id) {
		
		Optional<Dealer> obj = repoDealer.findById(id);
		DealerDto proxy = new DealerDto();
		BeanUtils.copyProperties(obj.get(),proxy);
		return proxy;
	}

}
