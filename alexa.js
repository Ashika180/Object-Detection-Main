var status = "";
var object = [];

function preload(){
    img = loadImage("alexa.png");
}

function setup(){
    canvas = createCanvas(700, 525);
    canvas.position(450, 255);

    cocossd = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detection has started.";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    cocossd.detect(img, getResults);
}

function getResults(error, results){

    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        object = results;
    }
}

function draw(){
    image(img, 0, 0, 700, 525);

    if(status != ""){
        document.getElementById("status").innerHTML = "Objects Detected.";
        document.getElementById("note").innerHTML = "CocoSSD has detected 1 object out of 3.";

        for(i = 0; i < object.length; i++){
            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            noFill();
            stroke("FF0000");
            text(object[i].label + " " + percent + "%", object[i].x+15, object[i].y+15);
            rect(object[i].width, object[i].height, object[i].x, object[i].y);
        }
    }
}

function back1(){
    window.location = "index.html";
}