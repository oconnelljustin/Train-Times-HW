 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBb2z2_0o4HK07xwWCqeiXRHh1o17AJx9M",
    authDomain: "train-time-projecct.firebaseapp.com",
    databaseURL: "https://train-time-projecct.firebaseio.com",
    projectId: "train-time-projecct",
    storageBucket: "",
    messagingSenderId: "999209291053"
  };
  firebase.initializeApp(config);

var trainData = firebase.database();

$("#AddTrainBtn").on("click", function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#desinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10,"years").format("x");
    var frequency = $("#frequencyInput").val().trim();
    // console.log(firstTrain);

    var newTrain = {
        name: trainName,
        desination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);
    alert("TrainAdded!");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
})

trainData.ref().on("child_added", function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;

    var remainder = moment().diff(moment.unix(firsttrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");
   
   // console.log(remainder);
   // console.log(minutes):
  //  console.log(arrival);

  $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})

