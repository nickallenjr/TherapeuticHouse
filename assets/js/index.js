/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("hamburger").style.visibility = "hidden"
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("hamburger").style.visibility = "visible"
}

document.addEventListener("DOMContentLoaded", function(event) {
    //do work

    //Sets and gets cookies to decide wheter to show loading page
    function setCookie(name, value) {
        document.cookie = name + "=" + value + ";"
    };

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        console.log(ca[0])
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                console.log(c.substring(name.length, c.length))
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    var visited = getCookie("therapeutic");

    if (visited !== "house") {
        setTimeout(function() {
            document.querySelector("div.loading").classList.add("hidden")
        }, 4000);
        setCookie("therapeutic", "house");
    } else {
        document.querySelector("div.loading").classList.add("hidden")

    }

    //Code for animating loading page (Logo animation handled by CSS)
    const title = document.querySelectorAll(".title");
    const tl = new TimelineMax();
    const leftSplit = new SplitText("#leftTitle", { type: "chars,words,lines" });
    const rightSplit = new SplitText("#rightTitle", { type: "chars,words,lines" });

    tl.set(title, { visibility: "visible" })
        .from(leftSplit.words, 2, { x: 10, autoAlpha: 0, ease: Power4.easeOut }, 2.5)
        .from(rightSplit.words, 2, { x: -10, autoAlpha: 0, ease: Power4.easeOut }, 2.5)

    //Code for animating navigation bar
    const nav = document.getElementById("navi");

    window.addEventListener('scroll', function() {
        const winTop = window.pageYOffset;

        if (winTop > 0) {
            TweenMax.to(nav, 1, { position: "fixed", backgroundColor: "#ffffff", top: 0, zIndex: 1 });
            TweenMax.to(".naviLinks", 1, { color: "#400F3C" });
            TweenMax.to(".naviTitle1", 1, { color: "#400F3C" });
            TweenMax.to(".fas", 1, { color: "#400f3c" });
        } else {
            TweenMax.to(nav, 1, { position: "fixed", backgroundColor: "transparent" })
            TweenMax.to(".naviLinks", 1, { color: "#ffffff" });
            TweenMax.to(".naviTitle1", 1, { color: "#ffffff" });
            TweenMax.to(".fas", 1, { color: "#ffffff" });
        }
    })

    let mousedOver = function(navlink, eachlink) {
        let link = document.getElementById(navlink);

        link.onmouseenter = function() {
            let split = new SplitText(eachlink, { type: "chars" });
            const naviTl = new TimelineMax();

            naviTl.staggerFromTo(split.chars, 2, { y: -20, opacity: 0 }, { opacity: 1, y: 0, ease: Power4.easeOut }, 0.1, "+=0.1")
        }
    }

    mousedOver("naviLinks1", "#homeLink");
    mousedOver("naviLinks2", "#aboutLink");
    mousedOver("naviLinks3", "#serviceLink");
    mousedOver("naviLinks4", "#contactLink");
    mousedOver("naviLinks5", "#shopLink");

    //Make naviTitle1 and 2 do something when mouseing over logo
    // let mousedOver2 = function () {
    // 	let logo = document.getElementById(logo);

    // 	logo.onmouseover = function() {

    // 	}
    // }


    //Code for scrolling text before letting page scroll
    console.log(window.innerWidth)
    let screenSize;

    if (window.innerWidth >= 1440) {
        if (screen.height <= 1080) {
            let screenSize = 1000;
            console.log(screenSize)
            const controller = new ScrollMagic.Controller();
            const timeline = new TimelineMax();
            timeline.add(TweenMax.fromTo(".storyblock", 2, { top: screenSize }, { top: 150 }))

            new ScrollMagic.Scene({
                    duration: 1500,
                    offset: 0
                })
                .setPin("#header")
                .setTween(timeline)
                .addTo(controller);
        } else if (screen.height <= 1440) {
            let screenSize = 1300;
            console.log(screenSize)
            const controller = new ScrollMagic.Controller();
            const timeline = new TimelineMax();
            timeline.add(TweenMax.fromTo(".storyblock", 2, { top: screenSize }, { top: 200 }))

            new ScrollMagic.Scene({
                    duration: 1500,
                    offset: 0
                })
                .setPin("#header")
                .setTween(timeline)
                .addTo(controller);
        };
    } else {
        return
    }

    const lightTl = new TimelineMax({ repeat: -1, yoyo: true })
    lightTl.fromTo("#lighting1", 1, { opacity: 0, y: -10 }, { opacity: 1, y: 0 })
        .fromTo("#lighting2", 1, { opacity: 0, y: -10 }, { opacity: 1, y: 0 }, "-=1")

    //Code for populating events section

    // fetch("http://localhost:5000/upcomingevents").then(function(response) {
    //     return response.json();
    // }).then(function(myJson) {
    //     console.log(myJson)

    //     $("#allUpcomingEvents").append(`<div id="eventContainer"><div id="eventPic"><img src="${myJson[0].photo.imagePath}" alt="event"></div>
    //     <div id="eventInfo"><h1 id="eventTitle">${myJson[0].eventTitle}</h1>
    //     <p id="eventDetails">${myJson[0].eventDetails}</p>
    //     <p id="eventDate">${myJson[0].date}</p>
    //     <p id="eventCityState"><span id="city">${myJson[0].city + ", "}</span><span id="state">${myJson[0].state}</span></p></div></div>`)
    // })

    // fetch("http://localhost:5000/pastevents").then(function(res) {
    //     return res.json();
    // }).then(function(data) {
    //     console.log(data)
    //     for (let i = 0; i < data.length; i++) {
    //         $("#allPastEvents").append(`<div id="eventContainer2"><div id="pastEventPic"><img class="pastPic" src="${data[i].photo.imagePath}" alt="event"></div>
    //         <div id="pastEventInfo"><h1 id="pastEventTitle">${data[i].eventTitle}</h1>
    //         <p id="pastEventDetails">${data[i].eventDetails}</p>
    //         <p id="pastEventDate">${data[i].date}</p>
    //         <p id="pastEventCityState"><span id="pastCity">${data[i].city + ", "}</span><span id="pastState">${data[i].state}</span></p></div></div>`)
    //     }
    // })
});