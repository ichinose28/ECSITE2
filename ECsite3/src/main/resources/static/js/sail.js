  //毎週木曜日のみ表示
  
  window.onload = function() {
        let today = new Date();
        let weekday = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
        document.getElementById(weekday[today.getDay()]).style.display = "block";
  }