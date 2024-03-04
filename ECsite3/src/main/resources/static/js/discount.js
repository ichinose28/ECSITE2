import * as modules from "./result.js";

document.getElementById("couponForm").addEventListener("submit",discount);

function discount(event) {
       
       event.preventDefault();
        
      const confirmPrice = document.getElementById("confirm_area").innerHTML;
      const postage = document.getElementById("postage_area").innerHTML;
      
      //最大値を求める 
      const rows = document.getElementById("cart").rows;
      
      let max = 0;
      for(let i=1; i<rows.length; i++){
        let Remax = rows[i].cells[2].textContent;
        max = Math.max(
          max, parseInt(modules.result(Remax))
        );
      }
      
       const postObj = {"couponCode":document.querySelector("input[name=couponCode]").value};  
  
    fetch("/ecsite/api/coupon", {
      method:"POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(postObj),
    })
      .then(response => response.text())
      .then(result => {
       const coupon = JSON.parse(result);
      
       alert(`${coupon.couponName}クーポンが適用されました！`);
       document.querySelector("input[name=couponCode]").value = "";
       
       const confirmNP = Number( (parseInt(modules.result(confirmPrice)) + (max * `${coupon.discount}`) - max) ); 
       const confirmP = Number( ((parseInt(modules.result(confirmPrice)) + (max * `${coupon.discount}`)) - max ) + parseInt(modules.result(postage)) ); 
       
       if (postage == "送料: 未登録 円" ) {
        document.getElementById("claimPrice").innerText = "請求金額: " + `${confirmNP.toLocaleString()}` + " 円(" + `${coupon.couponName}` + ")";
      }else{
        document.getElementById("claimPrice").innerText = "請求金額: " + `${confirmP.toLocaleString()}` + " 円(" + `${coupon.couponName}` + ")";
      }
      
    })
    
   }
      