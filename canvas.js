//mise en place du canvas
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.strokeStyle = "#000";
context.lineWidth = 1;

//obtenir la position de la souris sur le canva
function getMousePosition(canvasDom, mouseEvent) {
    var rectangle = canvasDom.getBoundingClientRect();// méthode qui renvoie objet DOMRect formé par l'union des rectangles = zone decrite par les boites de bordure
    return {
        x: mouseEvent.clientX - rectangle.left,
        y: mouseEvent.clientY - rectangle.top
    };// retourne la position sous un objet, client X retourne coordonnée horizontale, client Y coord verticale
};

//gestion evenements de la souris
var draw = false;
var mousePosition = {x:0, y:0};
var lastPosition = mousePosition;
canvas.addEventListener("mousedown", function(e) {
    draw = true;
    lastPosition = getMousePosition(canvas, e);   
    }, false); //false se refere à une option de l'ecouteur mais je ne sais pas laquelle?
canvas.addEventListener("mouseup", function(e) {
    draw =false;
    }, false);
canvas.addEventListener("mousemove", function(e) {
    lastPosition = getMousePosition(canvas, e);
    }, false);





// Get a regular interval for drawing to the screen -> je ne comprends pas l'intérêt de cette partie ni pourquoi on appelle des bibliotheques
window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame || 
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimaitonFrame ||
           function (callback) {
        window.setTimeout(callback, 1000/60);
           };
})();


// Fonction dessin matérialisé
function renderCanvas() {
  if (draw) {
    context.moveTo(lastPosition.x, lastPosition.y);
    context.lineTo(mousePosition.x, mousePosition.y);
    context.stroke();
    lastPosition = mousePosition;
  }
};

// Allow for animation -> je ne comprends pas l'animation
(function drawLoop () {
  requestAnimFrame(drawLoop);
  renderCanvas();
})();


//Gestion du doigt pour tablette et mobile
canvas.addEventListener("touchstart", function (e) {
        mousePosition = getTouchPosition(canvas, e);
  var touch = e.touches[0]; //touches correspond aux doigts sur l'ecra mais le 0?
  //pourquoi new -> pour lier l evenement touch à la souris?
    var mouseEvent = new MouseEvent("mousedown", { //pourquoi on créé un objet ici?
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent); //envoie un evenement à la cible specifiée en appelant els ecouteurs dans l'ordre approprié
}, false);

canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

//Position du doigt sur le canvas
function getTouchPosition(canvasDom, touchEvent) {
  var rectangle = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
};


// Pour eviter le scroll du canva au toucher du doigt. On veut que le canva reste fixe
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);// pourquoi document+body? Pour quoi toujours ce 3e parametre false?
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);


/*
//Pour enregistrer le canva -. associer à un bouton submit
var dataUrl = canvas.toDataURL();


//Fonction pour remettre le canva à zero -> associer à un bouton clear
function clearCanvas() {
    canvas.width = canvas.width;
}
*/