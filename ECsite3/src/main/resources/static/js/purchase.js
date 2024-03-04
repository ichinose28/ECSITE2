document.getElementById("purchaseBtn").addEventListener("click",purchase);

      function purchase(event) {
        
      /*
       * JavaにPOST通信するオブジェクトを取得・設定する
       * (cartListはグローバル変数)
       */ 
       const postObj = {
         "userId": document.getElementById("hiddenUserId").value,
         "cartList": cartList
       };
       
       fetch("/ecsite/api/purchase",{
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(postObj),
       })
       .then(response => response.text())
       .then(result => {
         alert(`${result}種類の商品を購入しました。`);
         const countElements = document.querySelectorAll(".count");
         countElements.forEach( element => {
           element.value = 0;
         });
         
         //カート表のtbody内の要素をクリアする
         initCart();
         initConfirm();
         // グローバル変数 cartList をクリアする
         cartList = [];
         disableCan();
       })
       .catch(error => {
         console.error("Error:",error);
       });
      }