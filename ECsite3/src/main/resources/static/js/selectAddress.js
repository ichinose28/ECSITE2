document.getElementById("loginForm").addEventListener("submit",selectAddress);

function selectAddress(event) {
       
      event.preventDefault();
       
      const postObj = {"userName":document.querySelector("input[name=userName]").value};
    
    fetch("/ecsite/api/postage", {
      method:"POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(postObj),
    })
      .then(response => response.text())
      .then(result => {
       const address = JSON.parse(result);
      
       document.getElementById("address").textContent = `住所: ${address.address}`;
      
     })
      
    }