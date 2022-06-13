song="";
leftwrist_x=0;
rightwrist_x=0;
leftwrist_y=0;
rightwrist_y=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function preload()
{
song=loadSound('music.mp3')
}

function setup()
{
canvas=createCanvas(600,400);
canvas.position(700,400);
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Started")
}

function draw()
{
image(video,0,0,600,500);
fill("#acf0fc");
stroke("#a2dbd9");
if (scoreLeftWrist>0.2)
{
    circle(leftwrist_x,leftwrist_y,20);
    num=number(leftwrist_y);
    remove_decimal=floor(num);
    volume=remove_decimal/500;
    document.getElementById('B').innerHTML="Volume="+volume;
    song.setVolume(volume);
    console.log("VOLUME IS ="+volume);
}
if(scoreRightWrist>0.2)
{
    circle(rightwrist_x,rightwrist_y,20);
    if(rightwrist_y>0&&rightwrist_y<100){
document.getElementById("A").innerHTML="Speed"+"0.5"
song.rate(0.5)
    }
    else if(rightwrist_y>=100&&rightwrist_y<200){
        document.getElementById("A").innerHTML="Speed"+"1"
        song.rate(1)
            }


            else if(rightwrist_y>=200&&rightwrist_y<300){
                document.getElementById("A").innerHTML="Speed"+"1.5"
                song.rate(1.5)
                    }


                    else if(rightwrist_y>=300&&rightwrist_y<400){
                        document.getElementById("A").innerHTML="Speed"+"2"
                        song.rate(2)
                            }
                            

                            else if(rightwrist_y>=400&&rightwrist_y<500){
                                document.getElementById("A").innerHTML="Speed"+"2.5"
                                song.rate(2.5)
                                    }
}
}



function play(){
    song.play();
    song.setVolume(0.1);
    song.rate(2);
}


function gotPoses(results)
{
    if (results.length>0)
    {
        scoreLeftWrist=results[0].keypoints[9].score;
        console.log("score Left Wrist="+scoreLeftWrist);
        console.log(results);
        leftwrist_x=results[0].pose.leftWrist.x;
        leftwrist_y=results[0].pose.leftWrist.y;
        rightwrist_x=results[0].pose.leftWrist.x;
       rightwrist_y=results[0].pose.leftWrist.y;
       console.log("LeftWrist X="+leftwrist_x+"  LeftWrist Y="+leftwrist_y)
       console.log("RightWrist X="+rightwrist_x+"  RightWrist Y="+rightwrist_y)
    } 

    if(results.length>0){
scoreRightWrist=results[0].keypoints[10].score;
console.log('score right wrist ='+scoreRightWrist);
console.log(results);

    }
}