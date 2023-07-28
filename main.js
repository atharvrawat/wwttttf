  status = "";
object=[];

function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video=createCapture(VIDEO)
  video.hide()
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  inputobj=document.getElementById("object").value;
}
 function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  
}
 function draw() {
  image(video, 0, 0, 480, 380);
  if(status!=""){
objectDetector.detect(video,gotresult);
for(i=0;i<object.length;i++){
  document.getElementById("status").innerHTML="status: object detected";
  //document.getElementById("number_of_objects").innerHTML="number of objects detected are: "+object.length;
  fill("red");
stroke("red");
percent=floor(object[i].confidence*100);
text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
noFill();
rect(object[i].x,object[i].y,object[i].width,object[i].height);
}
if(object[i].label==inputobj){
video.stop()
objectDetector.detect(gotresult);
document.getElementById("number_of_objects").innerHTML="Object Found Is: "+inputobj;
synth=window.speechSynthesis;
utterthis=new SpeechSynthesisUtterance(inputobj+" found")
synth.speak(utterthis);
}
else{
  document.getElementById("number_of_objects").innerHTML="Object Not Found ";
}
  }
}
function gotresult(error,results){
if(error){
  console.error(error);
}
else{
  console.log(results);
 object=results;

}
}
