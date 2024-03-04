package jp.co.internous.ecsite.model.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import jp.co.internous.ecsite.model.domain.PostageTbl;

@Mapper
public interface PostageTblMapper {
	
	@Insert("insert into postage_tbl (address, postage) values (#{address},#{postage})")
	int insert(PostageTbl postage);

}
