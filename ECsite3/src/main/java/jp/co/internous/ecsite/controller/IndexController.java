package jp.co.internous.ecsite.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import jp.co.internous.ecsite.model.domain.CouponTbl;
import jp.co.internous.ecsite.model.domain.MstGoods;
import jp.co.internous.ecsite.model.domain.MstUser;
import jp.co.internous.ecsite.model.domain.PostageTbl;
import jp.co.internous.ecsite.model.dto.HistoryDto;
import jp.co.internous.ecsite.model.form.CartForm;
import jp.co.internous.ecsite.model.form.CouponForm;
import jp.co.internous.ecsite.model.form.HistoryForm;
import jp.co.internous.ecsite.model.form.LoginForm;
import jp.co.internous.ecsite.model.mapper.CouponTblMapper;
import jp.co.internous.ecsite.model.mapper.MstGoodsMapper;
import jp.co.internous.ecsite.model.mapper.MstUserMapper;
import jp.co.internous.ecsite.model.mapper.TblPurchaseMapper;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/ecsite")
public class IndexController {
	
	@Autowired
	private MstGoodsMapper goodsMapper;
	
	@Autowired
	private MstUserMapper userMapper;
	
	@Autowired
	private CouponTblMapper couponMapper;
	
	@Autowired
	private TblPurchaseMapper purchaseMapper;
	
	private Gson gson = new Gson();
	
	@GetMapping("/")
	public String index(Model model) {
		
		Date date = new Date();
		Calendar calendar = Calendar.getInstance();
		
		calendar.setTime(date);
		
		int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
		
		String[] weekDays = {"", "日","月","火","水","木","金","土"};
		
		if (weekDays[dayOfWeek].equals("木")) {
		   List<MstGoods> goods = goodsMapper.discountPrice();
		   model.addAttribute("goods", goods);
	   }else {
		   List<MstGoods> goods = goodsMapper.findAll();
		   model.addAttribute("goods", goods);
	   }
		   return "index";
	}
	
	@Configuration
	@EnableWebSecurity
	public class WebSecurityConfig {
		@SuppressWarnings("removal")
		@Bean
		SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
			http.authorizeHttpRequests(authorize -> authorize
					.requestMatchers("/css/**", "/webjars/**","/js/**").permitAll()
					.requestMatchers("/ecsite/").permitAll()
			        .requestMatchers("/ecsite/information").permitAll())
			       .formLogin();
			return http.build();
		}
	}
	
	@RequestMapping("/information")
	public String information(Model model) {
		List<MstGoods> goods = goodsMapper.max();
		model.addAttribute("goods", goods);
		
		return "information";
	}
	
	@ResponseBody
	@PostMapping("/api/login")
	public String loginApi(@RequestBody LoginForm f) {
		MstUser user = userMapper.findByUserNameAndPassword(f);
		
		if (user == null) {
			user = new MstUser();
			user.setFullName("ゲスト");
		}
		
		return gson.toJson(user);
	}
	
	@ResponseBody
	@PostMapping("/api/postage")
	public String postageApi(@RequestBody LoginForm f) {
		MstUser address = userMapper.findAddress(f);
		
		if (address == null) {
			address = new MstUser();
			address.setAddress("未登録");
		}
		
		return gson.toJson(address);
	}
	
	@ResponseBody
	@PostMapping("/api/select")
	public String selectApi(@RequestBody LoginForm f) {
		PostageTbl postage = userMapper.findPostage(f);
		
		if (postage == null) {
			postage = new PostageTbl();
			postage.setPostage("未登録");
		}
		
		return gson.toJson(postage);
	}
	
	@ResponseBody
	@PostMapping("/api/coupon")
	public String couponApi(@RequestBody CouponForm f) {
		CouponTbl coupon = couponMapper.findCoupon(f);
		
		return gson.toJson(coupon);
	}
	
	@ResponseBody
	@PostMapping("/api/purchase")
	public int purchaseApi(@RequestBody CartForm f) {
		
		f.getCartList().forEach((c) -> {
			int total = c.getPrice() * c.getCount();
			purchaseMapper.insert(f.getUserId(), c.getId(), c.getGoodsName(), c.getCount(), total);
		});
		
		return f.getCartList().size();
	}
	
	@ResponseBody
	@PostMapping("/api/history")
	public String historyApi(@RequestBody HistoryForm f) {
		int userId = f.getUserId();
		List<HistoryDto> history = purchaseMapper.findHistory(userId);
		
		return gson.toJson(history);
	}
	
	
}
