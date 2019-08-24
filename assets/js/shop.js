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
        placeOrderBtn = document.getElementById("confirmBtn"),
        form = document.getElementById("formData"),
        firstNameInput = document.getElementById("inputFirstName"),
        lastNameInput = document.getElementById("inputLastName")
        emailInput = document.getElementById("inputEmail"),
        phoneInput = document.getElementById("inputPhone"),
        hiddenInput = document.getElementById("hiddenInput"),
        confirmName = document.getElementById("confirmName")
        confirmEmail = document.getElementById("confirmEmail")
        confirmNumber = document.getElementById("confirmNumber");

    let formArray;
    const formData = {};
    let quantityHolderArray = [];
    let quantitySelectArray = [];

    //Open modal and gather info button click

    formBtn.addEventListener("click", function(event) {
        event.preventDefault();

        formArray = serializeArray(form);
        console.log(formArray);

        formData.firstName = formArray[0].value;
        formData.lastName = formArray[1].value;
        formData.email = formArray[2].value;
        formData.phone = formArray[3].value;

        //Fill in header of modal
        confirmName.innerHTML = formData.firstName + " " + formData.lastName;
        confirmEmail.innerHTML = formData.email;
        confirmNumber.innerHTML = formData.phone;

        //Grab items that require quantity
        for (let h = 4; h < formArray.length; h++) {
            if (formArray[h].name.includes("Pads")) {
                quantityHolderArray.push(formArray[h]);
            }   
            else if (formArray[h].name.includes("Set")) {
                quantityHolderArray.push(formArray[h]);
            } 
            else if (formArray[h].name.includes("Water")) {
                quantityHolderArray.push(formArray[h]);
            }
            else {
                continue;
            }     
        }

        console.log(quantityHolderArray);

        //Populate Modal with items that allow quantity
        let quantityList = document.getElementById("quantityList");

        quantityHolderArray.map((item, index) => {
            $("#quantityList").append(`<div class="input-group mb-3">
                <select class="custom-select col-sm-3" id="inputGroupSelect${index}">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <div class="input-group-append">
                    <label class="input-group-text" id="inputGroupSelectLabel${index}" for="inputGroupSelect${index}">${item.name}</label>
                </div>
            </div>`)
        })

        

        // if (formArray.length > 4) {
        //     for (let i = 4; i < formArray.length; i++) {
        //         let tempObj = {
        //             name: formArray[i].name,
        //             qty: "1"
        //         }
        //         formData[i] = tempObj
        //     }
        // } else {
        //     //Catch error of someone not selecting any services
        //     return
        // };

        // console.log(formData);
    })

    //Confirm info and send mail button
    placeOrderBtn.addEventListener("click", function(event) {

        //Grab quantities to add to object below
        for (let j = 0; j < quantityHolderArray.length; j++) {
            let tempoObj = {};
            tempoObj.qty = $(`#inputGroupSelect${j}`).val();
            tempoObj.name = document.getElementById(`inputGroupSelectLabel${j}`).innerHTML;
            quantitySelectArray.push(tempoObj);
        }

        console.log(quantitySelectArray);

        //Replaces formData object entries with quantities selected in modal
        if (formArray.length > 4) {
            for (let i = 0; i < formArray.length; i++) {
                for (let m = 0; m < quantitySelectArray.length; m++) {
                    if (formArray[i].name === quantitySelectArray[m].name) {
                        formData[i] = quantitySelectArray[m];
                    }
                }
            }
        } else {
            //Catch error of someone not selecting any services
            return
        };

        console.log(formData);

        sendMail();
    })

    //Function run on place button click
    sendMail = async () => {
        firstNameInput.setAttribute("class", "form-control");
        lastNameInput.setAttribute("class", "form-control");
        emailInput.setAttribute("class", "form-control");
        phoneInput.setAttribute("class", "form-control");

        //Localhost:5000 for local dev just /order/ for production
        const request = await fetch("/order/", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": 'application/json',
            }
        })

        const response = await request.json();

        for (let j = 0; j < 4; j++) {
            if (response.success) {
                hiddenInput.setAttribute("class", "is-valid form-control");
                firstNameInput.value = "";
                lastNameInput.value = "";
                emailInput.value = "";
                phoneInput.value = "";
            } else if (response.validate[j].param === "firstName") {
                firstNameInput.setAttribute("class", "is-invalid form-control");
                quantityHolderArray = [];
                quantitySelectArray = [];
                $(".input-group").remove();
            } else if (response.validate[j].param === "lastName") {
                lastNameInput.setAttribute("class", "is-invalid form-control");
                quantityHolderArray = [];
                quantitySelectArray = [];
                $(".input-group").remove();
            } else if (response.validate[j].param === "email") {
                emailInput.setAttribute("class", "is-invalid form-control");
                quantityHolderArray = [];
                quantitySelectArray = [];
                $(".input-group").remove();
            } else if (response.validate[j].param === "phone") {
                phoneInput.setAttribute("class", "is-invalid form-control");
                quantityHolderArray = [];
                quantitySelectArray = [];
                $(".input-group").remove();
            }
        }
    }

});