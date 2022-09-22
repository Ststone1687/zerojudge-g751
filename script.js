
  
  function f(x) {
    x = x%30000;
    return Math.floor(((x * x) + 87 - Math.floor(x / 3) - (x % 7)+48763*10) % 48763);
  }
  
  function g(x) {
    x = x%30000;
    return Math.floor(((x - 1) * (x + 2) + Math.floor(x / 4) - (x % 3)+48763*10) % 48763);
  }
  
  function q(x) {
    x = x%30000;
    x = x + x * x + (449*x)%48763;
    return Math.floor((((x % 3) + (x % 5) + (x % 7) + (x % 2) + (x % 11) + (x % 101)) % 48763));
  }
  
  function action1(){
    document.getElementById("reports").style.display = "block";
    document.getElementById("make_seed").style.display = "none";
    document.getElementById("guess_answer").style.display = "none";
  }
  function action2(){
    document.getElementById("reports").style.display = "none";
    document.getElementById("make_seed").style.display = "block";
    document.getElementById("guess_answer").style.display = "none";
  }
  function action3(){
    document.getElementById("reports").style.display = "none";
    document.getElementById("make_seed").style.display = "none";
    document.getElementById("guess_answer").style.display = "block";
  }
  function leap_year(y){
    if(y%4==0&&y%100!=0||y%400==0){
      return 1;
    }
    else{
      return 0;
    }
  }
  function cnt_seed(){
    var days = [0,31,28,31,30,31,30,31,31,30,31,30,31];
    var year = parseInt(document.getElementById("year").value);
    var month = parseInt(document.getElementById("month").value);
    var day = parseInt(document.getElementById("day").value);
    if(leap_year(year)){
      days[2] = 29;
    }
    if(month<=0||month>12){
      document.getElementById("seeds").innerHTML = "48763";
    }
    else if(day<=0||day>days[month]){
      document.getElementById("seeds").innerHTML = "48763";
    }
    else{
      var sd = (f(year)+g(month)+q(day))%48763;
      document.getElementById("seeds").innerHTML = sd;
    }
  }
  function cnt() {
    //get data from element
    var seed = parseInt(document.getElementById("seed").value);
    var old_guess = document.getElementById("guess").value;
    var guess = [...old_guess];
    var answer_array = [4, 8, 7, 6, 3, 4, 8, 7, 6, 3, 4, 8, 7, 6, 3, 4, 8, 7, 6, 3, 4, 8, 7, 6, 3];
    //console.log(answer_array);
    var total = 0;
    //console.log(guess.length);
    for (var i = 0; i < guess.length; i++) {
      total += guess[i].codePointAt(0);
      answer_array.push(guess[i].codePointAt(0));
      //console.log(guess[i].codePointAt(0));
    }
    //console.log(answer_array);
    total = (f(total) + g(total) + q(total)) % 48763;
    console.log(total);
    for (var i = 0; i < answer_array.length; i++) {
      var swap_seed = (seed + f(total) + g(total) + q(total));
      console.log(swap_seed);
      if (i % 3 == 0) {
        swap_seed = (swap_seed + f(answer_array[i]+ seed) ) % 48763;
      }
      else if (i % 3 == 1) {
        swap_seed = (swap_seed + g(answer_array[i])) % 48763;
      }
      else {
        swap_seed = (swap_seed + q(answer_array[i])) % 48763;
      }
      console.log(swap_seed);
      var px = i;
      var py = (f(swap_seed) + g(swap_seed + seed) + q(swap_seed + seed)) % answer_array.length;
      var temp = answer_array[py];
      answer_array[py] = answer_array[px];
      answer_array[px] = temp;
      console.log(px);
      console.log(py);
      console.log("-----");
    }
    var score = 0;
    for (var i = 0; i < answer_array.length; i++) {
          //console.log(score)
          if(i%3==0){
              score = (score+f(answer_array[i]))%48763;
          }
          else if(i%3==1){
              score = (score+g(answer_array[i]+seed))%48763;
          }
          else{
              score = (score+q(answer_array[i]+seed))%48763;
          }
      //
    }
    console.log(answer_array);
    document.getElementById("score").innerHTML = (score/487.63).toFixed(2);
  }
  //