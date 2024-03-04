document.getElementById("loginForm").addEventListener('submit', postage);
 
function postage(event) {
      
       event.preventDefault();
       
      const postObj = {"userName":document.querySelector("input[name=userName]").value};
    
    fetch("/ecsite/api/select", {
      method:"POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(postObj),
    })
      .then(response => response.text())
      .then(result => {
       const postage = JSON.parse(result);
      
       document.getElementById("postage_area").innerText = `送料: ${postage.postage} 円`;
      
    })
  }
  