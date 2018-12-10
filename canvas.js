//mise en place du canvas
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.strokeStyle = "#000";
context.lineWidth = 1;

//gestion souris
var draw = false;
var mousePosition = {x:0, y:0};
var lastPosition = mousePosition;

var Canvas = {
    init: function() {
    
        this.getMousePosition(canvasDom,mouseEvent);
        this.evenementSouris();
        this.animationNavigateur();
        this.renderCanvas();
        this.animationBoucle();
        this.evenementDoigt();
        this.getTouchPosition(canvasDom, touchEvent);
        this.canvaFixe();
    },
    
    //obtenir la position de la souris sur le canva
    getMousePosition: function(canvasDom, mouseEvent) {
        var rectangle = canvasDom.getBoundingClientRect();// pour avoir la position de la souris 
        return {
            x: mouseEvent.clientX - rectangle.left,
            y: mouseEvent.clientY - rectangle.top,
        };// retourne la position sous un objet, client X retourne coordonnée horizontale, client Y coord verticale
    },
    
    //gestion evenements de la souris
    evenementSouris: function() {
        canvas.addEventListener("mousedown", function(e) {
        draw = true;
        lastPosition = getMousePosition(canvas, e);   
        }, false); //useCapture pour compatibilité tous navigateurs
        canvas.addEventListener("mouseup", function(e) {
        draw =false;
        }, false);
        canvas.addEventListener("mousemove", function(e) {
        mousePosition= this.getMousePosition(canvas, e);
        }, false);
    },


    // si navigateur non compatible plusieurs possibilités d'animation
    animationNavigateur: function() {
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
    },


    // Fonction dessin matérialisé
    renderCanvas: function() {
      if (draw) {
        context.moveTo(lastPosition.x, lastPosition.y);
        context.lineTo(mousePosition.x, mousePosition.y);
        context.stroke();
        lastPosition = mousePosition;
      };
    },

    // Animation
    animationBoucle: function() {
        (function drawLoop () {
          requestAnimFrame(drawLoop);
          this.renderCanvas();
        })();
    },


    //Gestion du doigt pour tablette et mobile
    evenementDoigt: function() {
        canvas.addEventListener("touchstart", function (e) {
                mousePosition = this.getTouchPosition(canvas, e);
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
    },

    //Position du doigt sur le canvas
    getTouchPosition: function (canvasDom, touchEvent) {
      var rectangle = canvasDom.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
      };
    },


    // Pour eviter le scroll du canva au toucher du doigt. On veut que le canva reste fixe
    canvaFixe: function() {
        document.body.addEventListener("touchstart", function (e) {
          if (e.target === canvas) {
            e.preventDefault();
          }
        }, false);
        document.body.addEventListener("touchend", function (e) {
          if (e.target === canvas) {
            e.preventDefault();
          }
        }, false);
        document.body.addEventListener("touchmove", function (e) {
          if (e.target === canvas) {
            e.preventDefault();
          }
        }, false);
    },

}



/*
//Pour enregistrer le canva -. associer à un bouton submit
var dataUrl = canvas.toDataURL();


//Fonction pour remettre le canva à zero -> associer à un bouton clear
function clearCanvas() {
    canvas.width = canvas.width;
}
*/

