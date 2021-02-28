let website = [
	"https://unsplash.com/photos/D5nh6mCW52c",
	"https://unsplash.com/photos/wQLAGv4_OYs",
	"https://unsplash.com/photos/5Oe8KFH5998",
	"https://unsplash.com/photos/F56Y7dgrAkc",
	"https://unsplash.com/photos/pfX-GsJMtDY"
];
let picturelist = [
	"images/1.jpg",
	"images/2.jpg",
	"images/3.jpg",
	"images/4.jpg",
	"images/5.jpg"
];

let displaynum = 2;

function remove_disabled(ID) {
	document.getElementById(ID).disabled = false;
	document.getElementById(ID).classList.remove("image-viewer__button__disabled");
}
function add_disabled(ID) {
	document.getElementById(ID).disabled = true;
	document.getElementById(ID).classList.add("image-viewer__button__disabled");
}
function switchsource(num) {
	document.getElementById("img").style.display = "none";
	document.getElementById("loading").style.display = "initial";
	document.getElementById("img").addEventListener('load', (event) => {
    	console.log('Logo has been loaded!');
    	document.getElementById("img").style.display = "initial";
		document.getElementById("loading").style.display = "none";
	});
	document.getElementById("img").src = picturelist[num];
	document.getElementById("tag").src = website[num];
	document.getElementById("tag").innerHTML = website[num];
	// window.onload = preloader;
}
function loading(){
	document.getElementById("img").src = "images/loading.gif";
}

function switchback() {
	if(displaynum > 0) {
		if(displaynum == 4){
			remove_disabled("next");
		}
		displaynum -= 1;
		switchsource(displaynum);
	}
	if(displaynum == 0) {
		add_disabled("back");
	}
}

function switchnext() {
	if(displaynum < 4) {
		if(displaynum == 0) {
			remove_disabled("back")
		}
		displaynum += 1;
		switchsource(displaynum);
	}
	if(displaynum == 4) {
		add_disabled("next");
	}
}
