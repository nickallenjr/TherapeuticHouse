

setTimeout(function() {
	document.querySelector("div.loading").classList.add("hidden")
}, 1000)

const title = document.querySelectorAll(".title");
const tl = new TimelineMax();
const leftSplit = new SplitText("#leftTitle", {type: "chars,words,lines"});
const rightSplit = new SplitText("#rightTitle", {type: "chars,words,lines"});

tl.set(title, {visibility: "visible"})
.from(leftSplit.words, 2, {x:10, autoAlpha:0, ease:Power4.easeOut}, 2.5)
.from(rightSplit.words, 2, {x:-10, autoAlpha:0, ease:Power4.easeOut}, 2.5)

const nav = document.getElementById("navi");

window.addEventListener('scroll', function() {
	const winTop = window.pageYOffset

	if (winTop > 0) {
		TweenMax.to(nav, 1, {position:"fixed", backgroundColor:"#ffffff", top:0, zIndex:2});
		TweenMax.to(".naviLinks", 1, {color:"#400F3C"});
		TweenMax.to(".naviTitle1", 1, {color:"#400F3C"});
	}else {
		TweenMax.to(nav, 1, {position:"fixed", backgroundColor:"transparent"})
		TweenMax.to(".naviLinks", 1, {color:"#ffffff"});
		TweenMax.to(".naviTitle1", 1, {color:"#ffffff"})
	}
})

let mousedOver = function (navlink, eachlink) {
	let link = document.getElementById(navlink);

	link.onmouseenter = function() {
		let split = new SplitText(eachlink, {type: "chars"});
		const naviTl = new TimelineMax();

		naviTl.staggerFromTo(split.chars, 2, {y:-20, opacity:0}, {opacity:1, y:0, ease:Power4.easeOut}, 0.1, "+=0.1")
	}
}

mousedOver("naviLinks1", "#homeLink");
mousedOver('naviLinks2', '#aboutLink');
mousedOver('naviLinks3', '#serviceLink')
mousedOver('naviLinks4', '#contactLink');

//Make naviTitle1 and 2 do something when mouseing over logo
// let mousedOver2 = function () {
// 	let logo = document.getElementById(logo);

// 	logo.onmouseover = function() {

// 	}
// }


//Code for scrolling text before letting page scroll
var controller = new ScrollMagic.Controller();
var timeline = new TimelineMax();
timeline.add(TweenMax.fromTo(".storyblock", 2, {top:1000}, {top:-1000}))

new ScrollMagic.Scene({
	duration: 1500,
	offset: 0
})
.setPin("#header")
.setTween(timeline)
.addTo(controller);
