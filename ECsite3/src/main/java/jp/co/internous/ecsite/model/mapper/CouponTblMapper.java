package jp.co.internous.ecsite.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import jp.co.internous.ecsite.model.domain.CouponTbl;
import jp.co.internous.ecsite.model.form.CouponForm;

@Mapper
public interface CouponTblMapper {
	
	@Select(value="select coupon_name, discount from coupon_tbl where coupon_code = #{couponCode}")
	CouponTbl findCoupon(CouponForm form);

}
