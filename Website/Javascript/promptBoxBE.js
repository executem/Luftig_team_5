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

const textBox = document.getElementById("promptBoxText");
function updateText(newText){
  textBox.textContent = newText;
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




