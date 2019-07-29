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

    function serializeArray(form) {
        var field, l, s = [];
        if (typeof form == 'object' && form.nodeName == "FORM") {
            var len = form.elements.length;
            for (var i = 0; i < len; i++) {
                field = form.elements[i];
                if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                    if (field.type == 'select-multiple') {
                        l = form.elements[i].options.length;
                        for (j = 0; j < l; j++) {
                            if (field.options[j].selected)
                                s[s.length] = { name: field.name, value: field.options[j].value };
                        }
                    } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                        s[s.length] = { name: field.name, value: field.value };
                    }
                }
            }
        }
        return s;
    }

    const formBtn = document.getElementById("formBtn"),
        form = document.getElementById("formData"),
        firstNameInput = document.getElementById("inputFirstName"),
        lastNameInput = document.getElementById("inputLastName")
        emailInput = document.getElementById("inputEmail"),
        phoneInput = document.getElementById("inputPhone"),
        hiddenInput = document.getElementById("hiddenInput");

    const formData = {};

    //Function run on button click
    sendMail = async() => {
        firstNameInput.setAttribute("class", "form-control");
        lastNameInput.setAttribute("class", "form-control");
        emailInput.setAttribute("class", "form-control");
        phoneInput.setAttribute("class", "form-control");
        
        //Localhost:500 for local dev just /order/ for production
        const request = await fetch("http://localhost:5000/order/", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": 'application/json',
            }
        })

        const response = await request.json();

        for (let j = 0; j < 4; j++) {
            if(response.success) {
                hiddenInput.setAttribute("class", "is-valid form-control");
                firstNameInput.value = "";
                lastNameInput.value = "";
                emailInput.value = "";
                phoneInput.value = "";
            }else if (response.validate[j].param === "firstName") {
                firstNameInput.setAttribute("class", "is-invalid form-control");
            }else if (response.validate[j].param === "lastName") {
                lastNameInput.setAttribute("class", "is-invalid form-control");
            } else if (response.validate[j].param === "email") {
                emailInput.setAttribute("class", "is-invalid form-control");
            } else if (response.validate[j].param === "phone") {
                phoneInput.setAttribute("class", "is-invalid form-control");
            }
        }
    }

    //Button click
    formBtn.addEventListener("click", function(event) {

        event.preventDefault();

        const formArray = serializeArray(form);
        console.log(formArray)

        formData.firstName = formArray[0].value;
        formData.lastName = formArray[1].value;
        formData.email = formArray[2].value;
        formData.phone = formArray[3].value;

        if (formArray.length > 4) {
            for (let i = 4; i < formArray.length; i++) {
                formData[i] = formArray[i].name;
            }
        } else {
            return
        };

        console.log(formData);

        sendMail();
    })
});