"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
connection.on("ReceiveMessage", function (user, message) {    
    console.log(`${user}: ${message}`);
    postMessage(message,user);
});

connection.on("UsersCount", function (connectionId, qtdUser) {    
    console.log(`entrou/saiu: ${connectionId}`);
    
     if(!isNaN(qtdUser))
        document.getElementById("qtdUser").innerHTML = parseInt(qtdUser) + 1

});
    

connection.start().then(function () {
    
    console.log('start conection')
}).catch(function (err) {
    return console.error(err.toString());
});
 