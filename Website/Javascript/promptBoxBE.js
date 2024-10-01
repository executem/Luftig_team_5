const box = document.getElementById("promptBox");
window.addEventListener('keydown',toggleVisibility);

function toggleVisibility(ev){
  if(box.style.visibility == 'hidden' && ev.key=="k"){
    box.style.visibility = 'visible';
  } else if(ev.key=="k"){
    box.style.visibility = 'hidden';
  }
  

}
const textBox = document.getElementById("promptBoxText");
function updateText(newText){
  textBox.textContent = newText;
}
// SEND IN ACCEPT CALLBACKFUNCTION
function acceptChanges(callBack){
  updateText("Accept");
  callBack();
}

// SEND IN DECLINE CALLBACKFUNCTION
function declineChanges(callback){
  updateText("Decline");
  callback();

}



