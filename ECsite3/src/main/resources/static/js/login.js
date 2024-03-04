 document.getElementById("loginForm").addEventListener("submit",login);

function login(event) {
    // HTML フォームのデフォルト動作(ページ遷移)が発生しないようprevent(阻止)する
    event.preventDefault();
    
    document.getElementById("purchaseConfirm").style.display = "none";
    document.getElementById("cart_area").style.display = "none";
    
    // カートテーブルをクリアし、メモリ上のカート配列も初期化する
    initCart();
    initConfirm();
    CartList = [];
    
    // JavaにPOST通信するオブジェクトを取得・設定する
    const postObj = {
      "userName":document.querySelector("input[name=userName]").value,
      "password":document.querySelector("input[name=password]").value
    };
    
    fetch("/ecsite/api/login", {
      method:"POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(postObj),
    })
    .then(response => response.text())
    .then(result => {
      const user = JSON.parse(result);
      document.getElementById("welcome").innerText = `ようこそ！ ${user.fullName} さん`;
      document.getElementById("hiddenUserId").value = user.id;
      document.querySelector("input[name=userName]").value = "";
      document.querySelector("input[name=password]").value = "";
    })
    .catch(error => {
      console.error("Error:",error);
    });
   }
   