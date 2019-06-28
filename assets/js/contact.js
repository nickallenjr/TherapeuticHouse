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
    const nav = document.getElementById("navi");

    window.addEventListener('scroll', function() {
        const winTop = window.pageYOffset

        if (winTop > 0) {
            TweenMax.to(nav, 1, { position: "fixed", backgroundColor: "#ffffff", top: 0, zIndex: 2 });
            TweenMax.to(".naviLinks", 1, { color: "#400F3C" });
            TweenMax.to(".naviTitle1", 1, { color: "#400F3C" });
            TweenMax.to(".fas", 1, { color: "#400f3c" });
        } else {
            TweenMax.to(nav, 1, { position: "fixed", backgroundColor: "transparent" })
            TweenMax.to(".naviLinks", 1, { color: "#ffffff" });
            TweenMax.to(".naviTitle1", 1, { color: "#ffffff" })
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
});

const sendForm = document.getElementById("submitBtn");
const nameField = document.getElementById("formName");
const emailField = document.getElementById("formEmail");
const messageField = document.getElementById("formMessage");

sendMail = async() => {

    console.log(messageField.value)

    const response = await fetch("/contact/", {
        method: "POST",
        body: JSON.stringify({
            name: nameField.value,
            email: emailField.value,
            message: messageField.value
        }),
        headers: {
            "Content-Type": 'application/json'
        }
    })

    const res = await response.json();
}

sendForm.addEventListener("click", function(eve) {
    eve.preventDefault();

    sendMail();
})

function initMap() {
    const atlanta = { lat: 33.828600, lng: -84.366136 };
    const alpharetta = { lat: 34.055269, lng: -84.231345 };

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