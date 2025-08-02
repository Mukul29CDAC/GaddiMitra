package com.cdac.gaaddimitra.services;

import com.cdac.gaaddimitra.entitiesDTO.UserDto;

public interface UserServiceIntf {

	public UserDto login(UserDto obj);
	
	public void register(UserDto obj);
}
