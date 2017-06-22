/*
*   Comp 20: Messages Part 2
*
*   Javascript file to parse JSON 
*
*   Hazen Breen
*/


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = parse();


function parse() {
    if (this.readyState == 4 && this.status == 200) {

       var object = JSON.parse(this.responseText);

       document.getElementById("messages").innerHTML = object[0].content + " " + object[0].username + "<br /><br />";
       document.getElementById("messages").innerHTML += object[1].content + " " + object[1].username;


    }
}



xhttp.open("GET", "data.json", true);
xhttp.send();