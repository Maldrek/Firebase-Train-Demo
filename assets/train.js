// Link to Firebase
let config = {
    apiKey: "AIzaSyCPsL6GxLYabuK6v0U8-RUk8nxglWeWusw",
    authDomain: "maldrek-countdown-counter.firebaseapp.com",
    databaseURL: "https://maldrek-countdown-counter.firebaseio.com",
    projectId: "maldrek-countdown-counter",
    storageBucket: "maldrek-countdown-counter.appspot.com",
    messagingSenderId: "977661607836"
  };
  
  firebase.initializeApp(config);
  
  let database = firebase.database();
  
  let empName;
  let title;
  let startMonth;
  let rate;
  
  $("#addEmployee").on("click", function () {
  
    event.preventDefault();
  
    let empName = $("#nameInput").val().trim();
    let title = $("#role").val().trim();
    let startMonth = $("#startDate").val();
    let rate = $("#monthRate").val().trim();
  
    console.log(empName);
    console.log(title);
    console.log(startMonth);
    console.log(rate);
    console.log("--------------------------------------------------");
  
  })