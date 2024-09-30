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

function acceptChanges(){
  updateText("Accept");
}


function declineChanges(){
  updateText("Decline");
}




