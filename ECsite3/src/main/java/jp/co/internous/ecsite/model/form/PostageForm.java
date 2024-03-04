package jp.co.internous.ecsite.model.form;

import java.io.Serializable;

public class PostageForm implements Serializable {
	
	private String address;
	private String postage;
	
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPostage() {
		return postage;
	}
	public void setPostage(String postage) {
		this.postage = postage;
	}

}
