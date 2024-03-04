package jp.co.internous.ecsite.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import jp.co.internous.ecsite.model.domain.MstUser;
import jp.co.internous.ecsite.model.domain.PostageTbl;
import jp.co.internous.ecsite.model.form.LoginForm;

@Mapper
public interface MstUserMapper {
	
	@Select(value="SELECT * FROM mst_user WHERE user_name = #{userName} AND password = #{password}")
	MstUser findByUserNameAndPassword(LoginForm form);
	
	@Select(value="SELECT address FROM mst_user WHERE user_name = #{userName}")
	MstUser findAddress(LoginForm form);
	
	@Select(value="SELECT postage FROM postage_tbl WHERE address in (SELECT address FROM mst_user WHERE address = (SELECT address FROM mst_user WHERE user_name = #{userName}))")
    PostageTbl findPostage(LoginForm form);
}
