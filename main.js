function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses)
}
function modelLoaded(){
    console.log('Model is Loaded');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scorelw=results[0].pose.keypoints[9].score;
        console.log(scorelw);
        scorerw=results[0].pose.keypoints[10].score;
        console.log(scorerw);   
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    
    }
}
scorelw=0;
scorerw=0;
status1="";
status2="";
peterpan="";
harrypotter="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
function preload(){
    peterpan=loadSound("music2.mp3");
    harrypotter=loadSound("music.mp3");
}
function draw(){
    image(video,0,0,600,500)
    fill("white");
    stroke("purple");
    status1=peterpan.isPlaying();
    status2=harrypotter.isPlaying();
    if(scorelw>0.2){
        circle(leftWrist_x,leftWrist_y,30);
        harrypotter.stop();
        if(status1==false){
            peterpan.play();
            document.getElementById("sn").innerHTML="Playing PeterPan theme song";
        }
    }
    if(scorerw>0.2){
        circle(rightWrist_x,rightWrist_y,30);
        peterpan.stop();
        if(status2==false){
            harrypotter.play();
            document.getElementById("sn").innerHTML="Playing Harry Potter theme song";
        }
    }
}