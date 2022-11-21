"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

console.log('console.chat');
connection.on("ReceiveMessage", function (user, message) {
    
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    console.log(`${user} says ${message}`);
});

connection.start().then(function () {
    
    console.log('start conection')
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("btnEnviar").addEventListener("click", function (event) {
    var user = 'Gugu' //document.getElementById("txtNome").value;
    var message = document.getElementById("txtMessage").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});