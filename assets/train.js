// Link to Firebase
let config = {
    apiKey: "AIzaSyAnQcAl5x-mx9urK9G22mTO6HDMLTjI2Go",
    authDomain: "maldrek-train-demo.firebaseapp.com",
    databaseURL: "https://maldrek-train-demo.firebaseio.com",
    projectId: "maldrek-train-demo",
    storageBucket: "maldrek-train-demo.appspot.com",
    messagingSenderId: "159054208161"
};

firebase.initializeApp(config);

let database = firebase.database();

let name = "";
let destination = "";
let startTime = "";
let frequency = "";

$("#addTrain").on("click", function () {

    event.preventDefault();

    // grab input values and then trim them so they don't have extra spaces
    let name = $("#nameInput").val().trim();
    let destination = $("#destination").val().trim();
    let startTime = $("#trainStart").val();
    let frequency = $("#frequency").val().trim();

    // check to make sure the correct values are being grabbed
    console.log("name: " + name);
    console.log("destination: " + destination);
    console.log("start time: " + startTime);
    console.log("frequency: " + frequency);
    console.log("--------------------------------------------------");

    // set the values of the input sections on forms back to empty strings
    $("#nameInput").val("");
    $("#destination").val("");
    $("#trainStart").val("");
    $("#frequency").val("");

    // Add the new variables to Firebase server
    database.ref().push({
        tName: name,
        tDestination: destination,
        tTime: startTime,
        tFrequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

database.ref().on("child_added", function (snapshot) {
    // create a variable that holds the value of function(snapshot)
    let value = snapshot.val();

    // create a new row and store it in a variable
    let newRow = $("<tr>");

    // append train name here
    let nameCell = $("<td>");
    nameCell.text(value.name);
    newRow.append(nameCell);

    // append destination here
    let destinationCell = $("<td>");
    destinationCell.text(value.destination);
    newRow.append(destinationCell);

    // append frequency here
    let frequencyCell = $("<td>");
    frequencyCell.text(value.frequency);
    newRow.append(frequencyCell);

    // create next arrival time and append it here
    let timeConverted = moment(value.startTime, "HH:mm").subtract(1, "days");
    let currentTime = moment();
    let diffTime = moment().diff(moment(timeConverted), "minutes");
    let tRemainder = diffTime % value.frequency;
    let minTillTrain = value.frequency - tRemainder;
    let nextTrain = moment().add(minTillTrain, "minutes");
    let arriveNext = $("<td>");
    arriveNext.text(moment(nextTrain).format("hh:mm A"));
    newRow.append(arriveNext);

    // append minutes away here
    let minAway = $("<td>");
    minAway.text(minTillTrain);
    newRow.append(minAway);

    // append everything to the addTrainTable div
    $("#addTrainTable").append(newRow);

    // if there are errors, console log them here
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});