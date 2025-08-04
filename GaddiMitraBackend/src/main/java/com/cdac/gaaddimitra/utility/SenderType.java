package com.cdac.gaaddimitra.utility;

public enum SenderType {
	
		DEALER("Dealer"),
		SERVICE_CENTER("Service Center");
		
		private final String type;
		
		SenderType(String type) {
			this.type = type;
		}
		public String getSenderType() {
			return type;
		}
}
