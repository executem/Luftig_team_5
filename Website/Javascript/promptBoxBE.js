const box = document.getElementById("promptBox");
window.addEventListener('keydown',toggleVisibility);

function toggleVisibility(ev){
  if(box.style.visibility == 'hidden' && ev.key=="k"){
    box.style.visibility = 'visible';
    document.body.style.overflow="hidden";
    document.body.style.backdropFilter = "blur(20px)"
  } else if(ev.key=="k"){
    box.style.visibility = 'hidden';
    document.body.style.overflow="visible";
  }
  

}
function toggleVisibility(){
  if(box.style.visibility == "hidden"){
    box.style.visibility="visible";
  } else{
    box.style.visibility = "hidden"
  }
}

const textBox = document.getElementById("promptBoxText");

function updateText(text){
  textBox.textContent = text;
}
function updateBox(text){
  toggleVisibility()
  updateText(text);
}

// SEND IN ACCEPT CALLBACKFUNCTION
function acceptChanges(callBack){
  box.style.visibility = 'hidden';
  updateText("Accept");
  callBack(true);
}

// SEND IN DECLINE CALLBACKFUNCTION
function declineChanges(callback){
  box.style.visibility = 'hidden';
  updateText("Decline");
  callback(false);

}




