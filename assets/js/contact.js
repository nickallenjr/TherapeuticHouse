document.addEventListener("DOMContentLoaded", function(event) { 
  //do work	
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
	mousedOver("naviLinks2", "#aboutLink");
	mousedOver("naviLinks3", "#serviceLink");
	mousedOver("naviLinks4", "#contactLink");
});

function initMap() {
	const atlanta = {lat: 33.828600, lng: -84.366136};
	const alpharetta = {lat:34.055269, lng: -84.231345};

	const map = new google.maps.Map(document.getElementById('map'), {
		center: atlanta,
		zoom: 12
	});

	const marker = new google.maps.Marker({
		position: atlanta, 
		map: map,
		animation: google.maps.Animation.DROP,
	});

}