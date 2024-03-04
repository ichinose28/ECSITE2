package jp.co.internous.ecsite.model.form;

import java.io.Serializable;

public class CouponForm implements Serializable {
	
	private String couponCode;

	public String getCouponCode() {
		return couponCode;
	}

	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}

	
}
