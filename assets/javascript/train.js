var firebaseConfig = {
    apiKey: "AIzaSyBwHXS0mqXuBtF9_qWkejbFIZ5oZ7EP9lI",
    authDomain: "train-scheduler-ab994.firebaseapp.com",
    databaseURL: "https://train-scheduler-ab994.firebaseio.com",
    projectId: "train-scheduler-ab994",
    storageBucket: "",
    messagingSenderId: "708171158293",
    appId: "1:708171158293:web:b8c85c0494aa5ce7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database()

$('.form').on('submit', function (event) {
    event.preventDefault();
    var nt = $("input[name=next-train]").val();
    var freq = $("input[name=frequency]").val();
    var re = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    var trainName;
    var destination;
    var nextTrain;
    var frequency;

    //validation
    if ($("input[name=train-name]").val().length == '') {
        alert('Train Name is mandatory')
    } else {
        trainName = $("input[name=train-name]").val().trim()
    }

    if ($("input[name=destination]").val().length == '') {
        alert('Destination is mandatory')
    } else {
        destination = $("input[name=destination]").val().trim()
    }
    if (nt.length != '' && !nt.match(re)) {
        alert('Military time is mandatory in this format HH:mm.')

    } else {
        nextTrain = nt.trim();
        console.log(nextTrain)

    }
    if (freq.length != '' && isNaN(freq)) {
        alert('Frequency should be a number')
    } else {
        frequency = $("input[name=frequency]").val().trim()
    }

    database.ref("/trains").push({
        tname: trainName,
        dest: destination,
        next: nextTrain,
        mins: frequency,
    })

    $("input[name=train-name]").val('');
    $("input[name=destination]").val('');
    $("input[name=next-train]").val('');
    $("input[name=frequency]").val('');
});

database.ref('/trains').on('child_added', function (response) {
    var trainN = $('<div>').addClass('column').text(response.val().tname);
    var des = $('<div>').addClass('column').text(response.val().dest);
    var trainTime = $('<div>').addClass('column').text(response.val().mins);
    var minutes = $('<div>').addClass('column').text(response.val().next);
    var minsA = $('<div>').addClass('column').text('');

    $('#trainTimes').append(trainN, des, trainTime, minutes, minsA);
})
   








































