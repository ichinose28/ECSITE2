  document.getElementById("historyBtn").addEventListener("click",showHistory);
  
      /*
       * showHistory関数
       *  「履歴」ボタンのclickイベントにより呼び出される
       */
      
      function showHistory(event) {
        
        
        // JavaにPOST送信するオブジェクトを取得・設定する
        const postObj = {"userId":document.getElementById("hiddenUserId").value};
        
        fetch("/ecsite/api/history", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(postObj),
        })
        .then(response => response.text())
        .then(result => {
          const historyList = JSON.parse(result);
          
          // id:historyのテーブルからtbodyを取得する
          const tbody = document.querySelector("#history tbody");
          
          //履歴表をすべてクリアする
          while(tbody.lastChild) {
            tbody.removeChild(tbody.lastChild);
          }
          
          historyList.forEach((history,index) => {
            // 行(tr)作成
            const tr = document.createElement("tr");
            
            //履歴表示の中から、表に出力するキーを限定するため配列化しておく
            const keys = ["goodsName","itemCount","createdAt"];
            
            // for of ループで keys を回し、表のtdを作成、trに追加する
            for (key of keys) {
              const td = document.createElement("td");
              td.innerText = history[key];
              tr.appendChild(td);
            }
            tbody.appendChild(tr);
          });
        })
        .catch(error => {
          console.error("Error:",error);
        });
      }
      