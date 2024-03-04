import * as modules from "./result.js";

document.getElementById("conf").addEventListener("click",total);

function total(event) {
    
      document.getElementById("purchaseConfirm").style.display = "block";
      
      const itemSum = document.getElementById("cart");
      let rowElems = itemSum.rows;
      let sum = 0;
      console.log(rowElems[1].cells[4].innerHTML);
      
      for(let i = 1, len = rowElems.length - 1; i <= len; i++){
          let price = rowElems[i].cells[4].innerHTML;
          sum += parseInt(modules.result(price));
        }
      
      const postage = document.getElementById("postage_area").innerText;
      const confirmPrice = sum;
      const all = Number(Math.trunc(confirmPrice) + parseInt(modules.result(postage)));
      
       document.getElementById("confirm_area").textContent = "商品計: " + `${confirmPrice.toLocaleString()}` + " 円";
       
      if (postage == "送料: 未登録 円" ) {
        document.getElementById("claimPrice").textContent = "請求金額: " + `${confirmPrice.toLocaleString()}` + " 円";
      }else {
        document.getElementById("claimPrice").textContent = "請求金額: " + `${all.toLocaleString()}` + " 円";
      }
      
     }