document.getElementById("couponCode").addEventListener('focus', (e) => {
  e.target.style.background = "pink";
})

document.getElementById("couponCode").addEventListener('blur', (e) => {
  e.target.style.background = "";
})