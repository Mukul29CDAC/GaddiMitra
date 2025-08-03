package com.cdac.gaaddimitra.observer;

import com.cdac.gaaddimitra.entities.VeichleRequest;

public interface ServiceCenterObserver {
	
	 void notify(VeichleRequest request);

}
