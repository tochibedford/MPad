var warn = document.querySelector(".warn");
var app = document.querySelector(".app");
var portWarn = document.querySelector(".portraitBlock");
var movable = document.querySelector(".movable");
var tap = document.querySelector(".tap");
var infoClose = document.querySelector(".iconI");

document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false); 

setInterval(()=>{
	var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
	if (orientation === "landscape-primary" || orientation === "landscape-secondary") {
	  portWarn.style.display = "none"
	} else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
	  console.log("Mmmh... you should rotate your device to landscape");
	  portWarn.style.display = "flex"
	} else if (orientation === undefined) {
	  console.log("The orientation API isn't supported in this browser :(");
	}
},250)

// <i class="fas fa-info-circle"></i>


if(!warn){
	movable.addEventListener('click', (e)=>{
		if (app.requestFullscreen) {
		    app.requestFullscreen();
		} else if (app.mozRequestFullScreen) { /* Firefox */
		app.mozRequestFullScreen();
		} else if (app.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
		app.webkitRequestFullscreen();
		} else if (app.msRequestFullscreen) { /* IE/Edge */
		app.msRequestFullscreen();
		}
		tap.style.display = "none"
	})
	infoClose.addEventListener('click', (e)=>{
		if(infoClose.children[0].classList.contains("fa-times-circle")){
			infoClose.parentNode.classList.remove("fadeInRight");
			infoClose.parentNode.classList.add("fadeOutRight");
			ii  = document.createElement("i");
			ii.classList.add("fas");
			ii.classList.add("fa-info-circle");
			infoClose.insertBefore(ii, infoClose.children[0]);
			infoClose.removeChild(infoClose.children[1]);
		}else{
			infoClose.parentNode.classList.remove("fadeOutRight");
			infoClose.parentNode.classList.add("fadeInRight");
			ii  = document.createElement("i");
			ii.classList.add("fas");
			ii.classList.add("fa-times-circle");
			infoClose.insertBefore(ii, infoClose.children[0]);
			infoClose.removeChild(infoClose.children[1]);
		}
	})

}


movable.addEventListener("touchmove", (e)=>{
	var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
	if (orientation === "landscape-primary" || orientation === "landscape-secondary") {
		if (e.targetTouches.length==1){
			var xhr = new XMLHttpRequest();
			rect = e.target.getBoundingClientRect()
			touch = e.targetTouches[0]
		    xhr.open("POST", "/", true);
		    xhr.send(JSON.stringify([touch.clientX-rect.left, touch.clientY-rect.top, rect.width, rect.height, "move"]));
		}else if(e.targetTouches.length == 2){
			var xhr = new XMLHttpRequest();
			rect = e.target.getBoundingClientRect()
			touch = e.targetTouches[0]
		    xhr.open("POST", "/", true);
		    xhr.send(JSON.stringify([touch.clientX-rect.left, touch.clientY-rect.top, rect.width, rect.height, "drag"]));
		}
		
	}
}, false);

movable.addEventListener("touchstart", e=>{
	var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
	if (orientation === "landscape-primary" || orientation === "landscape-secondary") {
		if(e.targetTouches.length == 2){
			var xhr = new XMLHttpRequest();
			rect = e.target.getBoundingClientRect()
			touch = e.targetTouches[0]
		    xhr.open("POST", "/", true);
		    xhr.send(JSON.stringify([touch.clientX-rect.left, touch.clientY-rect.top, rect.width, rect.height, "dragStart"]));
		}else if(e.targetTouches.length == 3){
			var xhr = new XMLHttpRequest();
			rect = e.target.getBoundingClientRect()
			touch = e.targetTouches[0]
		    xhr.open("POST", "/", true);
		    xhr.send(JSON.stringify([touch.clientX-rect.left, touch.clientY-rect.top, rect.width, rect.height, "screenshot"]));
		}
	}
})

movable.addEventListener("touchend", e=>{
	var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
	if (orientation === "landscape-primary" || orientation === "landscape-secondary") {
		if(e.targetTouches.length == 2){
			var xhr = new XMLHttpRequest();
			rect = e.target.getBoundingClientRect()
			touch = e.targetTouches[0]
		    xhr.open("POST", "/", true);
		    xhr.send(JSON.stringify([touch.clientX-rect.left, touch.clientY-rect.top, rect.width, rect.height, "dragEnd"]));
		}
	}
})

movable.addEventListener("touchcancel", e=>{
	var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
	if (orientation === "landscape-primary" || orientation === "landscape-secondary") {
		if(e.targetTouches.length == 2){
			var xhr = new XMLHttpRequest();
			rect = e.target.getBoundingClientRect()
			touch = e.targetTouches[0]
		    xhr.open("POST", "/", true);
		    xhr.send(JSON.stringify([touch.clientX-rect.left, touch.clientY-rect.top, rect.width, rect.height, "dragEnd"]));
		}
	}
})



movable.addEventListener("click", (e)=>{
	var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
	if (orientation === "landscape-primary" || orientation === "landscape-secondary") {
		var xhh = new XMLHttpRequest();
	    xhh.open("POST", "/", true);
	    xhh.send(JSON.stringify([e.pageX, e.pageY, window.innerWidth, window.innerHeight, "click"]));
	}
})

