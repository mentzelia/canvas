var Canvas = {
    init: function(canvas, color, line, saveButton, clearButton) {
        //mise en place du canva
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.context.strokeStyle = color;
        this.context.lineWidth = line;
        this.saveButton = document.getElementById("save");
        this.clearButton = document.getElementById("clear");
     
        
        //gestion souris
        this.draw = false;
        this.mousePosition = {x:0, y:0};
        this.lastPosition = this.mousePosition;

       
        
        
        this.evenementSouris();
        this.animationNavigateur();
        this.animationBoucle();
        this.evenementDoigt();
        this.clearCanvas();
        this.saveCanvas();
        
    },
    
    //obtenir la position de la souris sur le canva
    getMousePosition: function(canvasDOM, mouseEvent) {
        var rectangle = canvasDOM.getBoundingClientRect();// pour avoir la position de la souris 
        return {
            x: mouseEvent.clientX - rectangle.left,
            y: mouseEvent.clientY - rectangle.top,
        };// retourne la position sous un objet, client X retourne coordonnée horizontale, client Y coord verticale
    },
    
    //gestion evenements de la souris
    evenementSouris: function() {
        this.canvas.addEventListener("mousedown", function(e) {
            this.draw = true;
            this.lastPosition = this.getMousePosition(this.canvas, e);   
        }.bind(this), false); //useCapture pour compatibilité tous navigateurs
        
        this.canvas.addEventListener("mouseup", function(e) {
            this.draw =false;
        }.bind(this), false);
        
        this.canvas.addEventListener("mousemove", function(e) {
            this.mousePosition= this.getMousePosition(this.canvas, e);
        }.bind(this), false);
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
      if (this.draw) {
        this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
        this.context.lineTo(this.mousePosition.x, this.mousePosition.y);
        this.context.stroke();
        this.lastPosition = this.mousePosition;
      };
    },

    // Animation fonction auto appelée
    animationBoucle: function() {
        var self = this;
        (function drawLoop () {
          requestAnimFrame(drawLoop);
          self.renderCanvas();
        })();
    },


    //Gestion du doigt pour tablette et mobile
    evenementDoigt: function() {
        this.canvas.addEventListener("touchstart", function (e) {
            if (e.target === this.canvas) {
            e.preventDefault();
            };//fixe le canva
            this.mousePosition = this.getTouchPosition(this.canvas, e);
            var touch = e.touches[0]; //touches correspond aux doigts sur l'ecra mais le 0?
            //pourquoi new -> pour lier l evenement touch à la souris?
            var mouseEvent = new MouseEvent("mousedown", { //pourquoi on créé un objet ici?
            clientX: touch.clientX,
            clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent); //envoie un evenement à la cible specifiée en appelant els ecouteurs dans l'ordre approprié
        }, false);

        this.canvas.addEventListener("touchend", function (e) {
            if (e.target === this.canvas) {
            e.preventDefault();
            };//fixe le canva
            var mouseEvent = new MouseEvent("mouseup", {});
            this.canvas.dispatchEvent(mouseEvent);
            }, false);

        this.canvas.addEventListener("touchmove", function (e) {
            if (e.target === this.canvas) {
            e.preventDefault();
            };//fixe le canva
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
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
    
    //Reinitialiser le canva
    clearCanvas: function () {
        this.clearButton.addEventListener("click", function() {
            this.canvas.width = this.canvas.width; //seul moyen est de reinitialiser la width
            }.bind(this));
        },
    
    //enregistrer en data Url
    saveCanvas: function() {
        this.saveButton.addEventListener("click", function () {
            console.log("test");
            var dataUrl = this.canvas.toDataURL();
        }.bind(this));
    },
    
    
   
};

var canvas1 = Object.create(Canvas);
canvas1.init("canvas", "#000", "1", "save", "clear");




