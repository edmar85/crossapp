/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        userid:""
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }




};


var titleTxt = document.getElementById("title");
var dateTxt = document.getElementById("date1");
var timeTxt = document.getElementById("time");
var tempDate = document.getElementById("date");
var displayEvents = document.getElementById("displayEvents");

function save(title, date, time) {

    // Get a reference to the database service
    var firebaseRef = firebase.database().ref();
     title = titleTxt.value;
     date = dateTxt.value;
     time = timeTxt.value;

    firebaseRef.child("calendar/" + app.userid).push().set({
        Title: title,
        Date: date,
        Time: time
    });


}

function filterEvents(selectedDate) {

    selectedDate = tempDate.textContent;
    console.log(selectedDate);

    displayEvents.innerHTML = "";


    var eventRef = firebase.database().ref("calendar/" + app.userid);

    eventRef.orderByChild("Date").equalTo(selectedDate).on("child_added", function(data) {

    displayEvents.innerHTML += "<div class='panel-heading' id='br'>" + data.val().Title + " At " + data.val().Time + "</div>";


        console.log(data.val().Title + " At " + data.val().Time);
    });
}

function logUserOut(){
    firebase.auth().signOut().then(function() {
        // user is signed out

    }).catch(function(error) {
       // notifyUser(error.message);
    });
}

//firebase observer for user state
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var btnLogout = document.getElementById("logoutbtn");
        var userAccount = document.getElementById("user");
        var uid = user.uid;
        app.userid = uid;
        btnLogout.style.visibility = "visible";
        app.useremail = user.email;

        userAccount.innerHTML = "Hi, " + user.email;
        console.log(app.userid);

    } else {
        // User is signed out.
        // put things to do here when the user is signed out
        window.location.href="index.html";
        app.id = "";

    }
});





app.initialize();