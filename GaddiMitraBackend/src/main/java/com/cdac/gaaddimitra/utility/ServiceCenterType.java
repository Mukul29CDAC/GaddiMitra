package com.cdac.gaaddimitra.utility;

public enum ServiceCenterType {
	
	LOC("Local"),
	AUTH("Authorised");
	
	private final String type;

	ServiceCenterType(String type) {
        this.type = type;
    }

    public String getServiceCenterType() {
        return type;
    }
}
