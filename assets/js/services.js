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

    //Object for populating modal with service information

    const allServices = {
        titles: {
            lhamo: {
                all: "LHAMO FEMININE HERBAL PADS",
                overnight: "LHAMO FEMININE OVERNIGHT PADS",
                daily: "LHAMO FEMININE DAILY PADS",
                panty: "LHAMO FEMININE PANTILINER PADS"
            },
            chakra: "CHAKRA ALIGNMENT",
            reflex: "FOOT / HAND REFLEXOLOGY",
            magnet: "MAGNETIZED WATER",
            candle: "EAR CANDLING",
            therapy: "MAGNET THERAPY",
            teas: "HERBAL TEAS",
            feng: "FENG SHUI",
            birth: "NATURAL BIRTHING",
            energy: "ENERGY CLEANSING",
            treat: "CONSULTATIONS"
        },
        pictures: {
            lhamo: {
                all: "./images/IMG_6512.jpg",
                overnight: "./images/IMG_6510.jpg",
                panty: "./images/IMG_6508.jpg",
                daily: "./images/IMG_6513.jpg"
            },
            chakra: "./images/183595.jpg",
            reflex: "./images/IMG_7549.jpeg",
            magnet: "./images/IMG_6516.jpg",
            candle: "./images/IMG_7575.jpeg",
            therapy: "./images/IMG_7555.jpeg",
            teas: "./images/herbaltea.jpg",
            feng: "./images/fengshui.png",
            birth: "./images/pregnant-black-woman.jpg",
            energy: "./images/sage.jpg",
            treat: "./images/womenmeeting.jpg"
        },
        descriptions: {
            lhamo: {
                main: "Lhamo Herbal Pads are manufactured using select plant extracts derived from well known standard texts on traditional Chinese herbal medicine (used to train state-licensed practitioners to this day). The use of plant oils and extracts as ointment has been well established component of folk medicine in the West and it persists to this day in certain clinical settings. Our product employs a hybrid approach, combining traditional Chinese herbal formulations with topical application techniques pioneered in the West.",
                overnight: "",
                daily: "",
                panty: "",
            },
            chakra: "Chakras are spinning wheels of energy and are aligned starting at the base of your spine and move up to the crown of your head. They regulate the energy flow of your body. Depending on which chakra(s) are blocked you may experience symptoms such as low energy, being emotional, feeling stuck/unmotivated, to name few. The benefits range from removing bad energy from the body, unblocks the blockages that could be causing discomfort or pain, and allows energy to flow freely. Remove any blockages that you have to get your energy flowing again. Allow your 7 major chakras to operate holistically creating balance in your life.",
            reflex: "Magnetism has become a means for many people who are seeking relief for nagging pain. Applying magnetism to the hands and feet promotes increased blood flow and oxygen levels to the magnetized area, aligning of cells in the magnetic field.",
            magnet: "Magnetized water activates, cleanses, and detoxifies every part of the body. Drinking magnetized water influences the autonomic nervous system and the toxic deposits within the connective tissues of the body. The body is made up of 70% water, replenish it with water that will assist in the body’s natural way of healing.",
            candle: "Ear candling contributes to a greater sense of well-being as well as enhanced physical and mental health. It removes unwanted ear wax, impurities and toxins from the ear. By lighting the beeswax candle, a gentle suction is created and vacuum draws the wax and impurities from the ear and produces relief.",
            therapy: "Magnetic therapy is an alternative medical practice that uses static (i.e. unmoving) magnets to alleviate pain and other health concerns. So-called therapeutic magnets are typically integrated into bracelets, rings, or shoe inserts, though therapeutic magnetic mattresses and clothing are also on the market.",
            teas: "Our selection of herbal teas includes a wide array of naturally caffeine-free teas, also called tisanes, including pure rooibos, mint, chamomile, hibiscus, rose tea and a variety of herbal tea blends. Many herbal teas are known for having medicinal qualities, such as calming, throat soothing, and sleepy teas. If you would like to requesta a special tea please contact us so we can accommodate your specific needs.",
            feng: "a system of laws considered to govern spatial arrangement and orientation in relation to the flow of energy (qi), and whose favorable or unfavorable effects are taken into account when siting and designing buildings",
            birth: "As a woman we should have the ability to birth our babies in the comfort of our own space without being hassled by indifferent nurses, doctors, and people. Birthing is a natural thing and should be honored as such. Before making a decision make sure you take the time to research all your choices to make sure it fits your desires. We can help you reach your goal whether it's water birth, home birth, birthing house, incorporating a midwife and/or doula, and/or including natural herbs. This service includes a suggested guideline and two 45 minute consultations.",
            energy: "Toxic energy from arguments or illness can accumulate in shared spaces such as living rooms, kitchens and dens. Your home can be clean and organized but still have a heavy feeling. Even if you’re not a trained Zen master, the subtle frequencies of energy can be felt if you pay attention. A cleansed and energized room should feel light, fresh, and inviting when you enter. A cleansed and energized room should feel light, fresh, and inviting when you enter. Like anything in life, getting rid of old or negative energy takes daily practice. This service is best for new beginnings, important meetings, and cleansing new spaces.",
            treat: "We understand that life is hectic and we won’t be able to physically see everyone so we offer various treatment plans. The plan depends on your alignment and which holistic approach you would like to take. This plan is more so for mothers seeking natural birthing options, problems with pms, menstruation, cysts, fibroids, stress, and depression. It includes three consultations"
        },
        prices: {
            lhamo: {
                overnight: "Overnight Pads: $6.99",
                daily: "Daily Pads: $6.99",
                panty: "Pantiliner Pads: $5.99",
                starter: "Starter Set (2 Overnight, 1 Daily, & 1 Pantiliner) $24.99",
                starter2: "Starter Set 2 (2 Daily, 1 Overnight, & 1 Pantiliner) $24.99",
                starter3: "Starter 3 (2 Heavy Long, 1 Daily, & 1 Pantiliner) $26.99",
                starter4: "Starter 4 (2 Heavy Long, 1 Overnight, & 1 Pantiliner) $26.99",
                deluxe: "Deluxe Set (3 Month Supply: 4 Daily, 3 Overnight, 3 Pantiliner) $56.99",
                deluxe2: "Deluxe Set 2 (3 Month Supply: 4 Heavy Long, 3 Overnight, 3 Pantiliner) $59.99",
                mvp: "MVP Set (6 Month Supply: 8 Daily, 6 Overnight, 6 Pantiliner) $99",
                mvp2: "MVP Set 2 (6 Month Supply: 8 Heavy Long, 6 Daily, 6 Pantiliner) $109",
                ship: "*Shipping $5.49"
            },
            chakra: "1 HOUR CHAKRA SESSION: $75",
            teas: "Three 2oz JARS $15",
            reflex: {
                price: "1 HOUR FOOT REFLEXOLOGY SESSION: $65",
                price2: "1 HOUR HAND REFLEXOLOGY SESSION: $45"
            },
            magnet: {
                price: "32oz $10",
                price2: "640z $22",
                price3: "1gal $32",
                price4: "*Shipping $30 on liquids."
            },
            candle: "40 MIN EAR CANDLING SESSION: $40",
            consult: "ONE TREATMENT PLAN & THREE 40 MINUTE CONSULTATIONS: $60",
            energy: "ENERGY CLEANSING SESSION: $70",
            birth: "SUGGESTED GUIDLINE & TWO 45 MINUTE CONSULTATIONS: $50",
            feng: "FENG SHUI SESSION: $60",
            therapy: "40 MINUTE MAGNET THERAPY SESSION: $50"
        },
        note: "*These services are done by appointment only at our spa in Alpharetta or a house call for a $25 fee."
    };

    //Opening Modal and populating it

    let infoTitle = document.getElementById("infoTitle");
    let infoTitle2 = document.getElementById("infoTitle2");
    let servicePic = document.getElementById("serviceImg");
    let servicePic2 = document.getElementById("serviceImg2");
    let infoTitle3 = document.getElementById("infoTitle3");
    let servicePic3 = document.getElementById("serviceImg3");
    let infoTitle4 = document.getElementById("infoTitle4");
    let servicePic4 = document.getElementById("serviceImg4");
    let infoDescrip = document.getElementById("infoDescrip");
    let extra1 = document.getElementById("extraInfo1");
    let extra2 = document.getElementById("extraInfo2");
    let extra3 = document.getElementById("extraInfo3");
    let price = document.getElementById("price");
    let price2 = document.getElementById("price2");
    let price3 = document.getElementById("price3");
    let price4 = document.getElementById("price4");
    let price5 = document.getElementById("price5");
    let price6 = document.getElementById("price6");
    let price7 = document.getElementById("price7");
    let price8 = document.getElementById("price8");
    let price9 = document.getElementById("price9");
    let price10 = document.getElementById("price10");
    let price11 = document.getElementById("price11");
    let price12 = document.getElementById("price12");
    let note = document.getElementById("note");


    let moreInfo = function(service) {

        let serviceLink = document.getElementById(service);
        let serviceId = serviceLink.getAttribute("id");
        console.log(serviceId);

        let infoDiv = document.getElementById("infoDiv");

        if (serviceId == "learn1") {
            infoTitle.innerHTML = allServices.titles.chakra;
            extra1.style.display = "none";
            extra2.style.display = "none";
            extra3.style.display = "none";
            price2.style.display = "none";
            price3.style.display = "none";
            price4.style.display = "none";
            price5.style.display = "none";
            price6.style.display = "none";
            price7.style.display = "none";
            price8.style.display = "none";
            price9.style.display = "none";
            price10.style.display = "none";
            price11.style.display = "none";
            price12.style.display = "none";
            infoDescrip.innerHTML = allServices.descriptions.chakra;
            price.innerHTML = allServices.prices.chakra;
            note.innerHTML = allServices.note
            servicePic.setAttribute("src", allServices.pictures.chakra);
        } else if (serviceId == "learn2") {
            infoTitle.innerHTML = allServices.titles.reflex;
            infoDescrip.innerHTML = allServices.descriptions.reflex;
            extra1.style.display = "none";
            extra2.style.display = "none";
            extra3.style.display = "none";
            price3.style.display = "none";
            price4.style.display = "none";
            price5.style.display = "none";
            price6.style.display = "none";
            price7.style.display = "none";
            price8.style.display = "none";
            price9.style.display = "none";
            price10.style.display = "none";
            price11.style.display = "none";
            price12.style.display = "none";
            price.innerHTML = allServices.prices.reflex.price;
            price2.innerHTML = allServices.prices.reflex.price2;
            note.innerHTML = allServices.note
            servicePic.setAttribute("src", allServices.pictures.reflex);
        } else if (serviceId == "learn3") {
            infoTitle.innerHTML = allServices.titles.magnet;
            infoDescrip.innerHTML = allServices.descriptions.magnet;
            extra1.style.display = "none";
            extra2.style.display = "none";
            extra3.style.display = "none";
            price.innerHTML = allServices.prices.magnet.price;
            price2.innerHTML = allServices.prices.magnet.price2;
            price3.innerHTML = allServices.prices.magnet.price3;
            price4.style.display = "none";
            price5.style.display = "none";
            price6.style.display = "none";
            price7.style.display = "none";
            price8.style.display = "none";
            price9.style.display = "none";
            price10.style.display = "none";
            price11.style.display = "none";
            price12.style.display = "none";
            note.innerHTML = allServices.prices.magnet.price4;
            servicePic.setAttribute("src", allServices.pictures.magnet);
        } else if (serviceId == "learn4") {
            infoTitle.innerHTML = allServices.titles.candle;
            infoDescrip.innerHTML = allServices.descriptions.candle;
            extra1.style.display = "none";
            extra2.style.display = "none";
            extra3.style.display = "none";
            price.innerHTML = allServices.prices.candle;
            price2.style.display = "none";
            price3.style.display = "none";
            price4.style.display = "none";
            price5.style.display = "none";
            price6.style.display = "none";
            price7.style.display = "none";
            price8.style.display = "none";
            price9.style.display = "none";
            price10.style.display = "none";
            price11.style.display = "none";
            price12.style.display = "none";
            note.innerHTML = allServices.note;
            servicePic.setAttribute("src", allServices.pictures.candle);
        } else if (serviceId == "learn5") {
            infoTitle.innerHTML = allServices.titles.lhamo.all;
            infoTitle2.innerHTML = allServices.titles.lhamo.daily;
            infoTitle3.innerHTML = allServices.titles.lhamo.overnight;
            infoTitle4.innerHTML = allServices.titles.lhamo.panty;
            infoDescrip.innerHTML = allServices.descriptions.lhamo.main;
            servicePic.setAttribute("src", allServices.pictures.lhamo.all);
            servicePic2.setAttribute("src", allServices.pictures.lhamo.daily);
            servicePic3.setAttribute("src", allServices.pictures.lhamo.overnight);
            servicePic4.setAttribute("src", allServices.pictures.lhamo.panty);
            price.innerHTML = allServices.prices.lhamo.daily;
            price2.innerHTML = allServices.prices.lhamo.overnight;
            price3.innerHTML = allServices.prices.lhamo.panty;
            price4.innerHTML = allServices.prices.lhamo.starter;
            price5.innerHTML = allServices.prices.lhamo.starter2;
            price6.innerHTML = allServices.prices.lhamo.starter3;
            price7.innerHTML = allServices.prices.lhamo.starter4;
            price8.innerHTML = allServices.prices.lhamo.deluxe;
            price9.innerHTML = allServices.prices.lhamo.deluxe2;
            price10.innerHTML = allServices.prices.lhamo.mvp;
            price11.innerHTML = allServices.prices.lhamo.mvp2;
            note.innerHTML = allServices.prices.lhamo.ship;
        } else if (serviceId == "learn6") {
            infoTitle.innerHTML = allServices.titles.therapy;
            infoDescrip.innerHTML = allServices.descriptions.therapy;
            extra1.style.display = "none";
            extra2.style.display = "none";
            extra3.style.display = "none";
            servicePic.setAttribute("src", allServices.pictures.therapy);
            price.innerHTML = allServices.prices.therapy;
            price2.style.display = "none";
            price3.style.display = "none";
            price4.style.display = "none";
            price5.style.display = "none";
            price6.style.display = "none";
            price7.style.display = "none";
            price8.style.display = "none";
            price9.style.display = "none";
            price10.style.display = "none";
            price11.style.display = "none";
            price12.style.display = "none";
            note.innerHTML = allServices.note
        } else if (serviceId == "learn7") {
            infoTitle.innerHTML = allServices.titles.teas;
            infoDescrip.innerHTML = allServices.descriptions.teas;
            extra1.style.display = "none";
            extra2.style.display = "none";
            extra3.style.display = "none";
            servicePic.setAttribute("src", allServices.pictures.teas);
            price.innerHTML = allServices.prices.teas;
            price2.style.display = "none";
            price3.style.display = "none";
            price4.style.display = "none";
            price5.style.display = "none";
            price6.style.display = "none";
            price7.style.display = "none";
            price8.style.display = "none";
            price9.style.display = "none";
            price10.style.display = "none";
            price11.style.display = "none";
            price12.style.display = "none";
        } else if (serviceId == "learn8") {
            infoTitle.innerHTML = allServices.titles.feng;
            infoDescrip.innerHTML = allServices.descriptions.feng;
            extra1.style.display = "none";
            extra2.style.display = "none";
            extra3.style.display = "none";
            servicePic.setAttribute("src", allServices.pictures.feng);
            price.innerHTML = allServices.prices.feng;
            price2.style.display = "none";
            price3.style.display = "none";
            price4.style.display = "none";
            price5.style.display = "none";
            price6.style.display = "none";
            price7.style.display = "none";
            price8.style.display = "none";
            price9.style.display = "none";
            price10.style.display = "none";
            price11.style.display = "none";
            price12.style.display = "none";
        } else if (serviceId == "learn9") {
            infoTitle.innerHTML = allServices.titles.birth;
            infoDescrip.innerHTML = allServices.descriptions.birth;
            extra1.style.display = "none";
            extra2.style.display = "none";
            extra3.style.display = "none";
            servicePic.setAttribute("src", allServices.pictures.birth);
            price.innerHTML = allServices.prices.birth;
            price2.style.display = "none";
            price3.style.display = "none";
            price4.style.display = "none";
            price5.style.display = "none";
            price6.style.display = "none";
            price7.style.display = "none";
            price8.style.display = "none";
            price9.style.display = "none";
            price10.style.display = "none";
            price11.style.display = "none";
            price12.style.display = "none";
        } else if (serviceId == "learn10") {
            infoTitle.innerHTML = allServices.titles.energy;
            infoDescrip.innerHTML = allServices.descriptions.energy;
            extra1.style.display = "none";
            extra2.style.display = "none";
            extra3.style.display = "none";
            servicePic.setAttribute("src", allServices.pictures.energy);
            price.innerHTML = allServices.prices.energy;
            price2.style.display = "none";
            price3.style.display = "none";
            price4.style.display = "none";
            price5.style.display = "none";
            price6.style.display = "none";
            price7.style.display = "none";
            price8.style.display = "none";
            price9.style.display = "none";
            price10.style.display = "none";
            price11.style.display = "none";
            price12.style.display = "none";
        } else if (serviceId == "learn11") {
            infoTitle.innerHTML = allServices.titles.treat;
            infoDescrip.innerHTML = allServices.descriptions.treat;
            extra1.style.display = "none";
            extra2.style.display = "none";
            extra3.style.display = "none";
            servicePic.setAttribute("src", allServices.pictures.treat);
            price.innerHTML = allServices.prices.consult;
            price2.style.display = "none";
            price3.style.display = "none";
            price4.style.display = "none";
            price5.style.display = "none";
            price6.style.display = "none";
            price7.style.display = "none";
            price8.style.display = "none";
            price9.style.display = "none";
            price10.style.display = "none";
            price11.style.display = "none";
            price12.style.display = "none";
        }

        TweenMax.to(infoDiv, 1, { yPercent: 0, height: "75%", display: "block" }, 0.1);
        TweenMax.to(".allServices", 1, { filter: "opacity(0.5)" }, 0.1);
    }

    let learn1 = document.getElementById("learn1");
    learn1.onclick = function() {
        moreInfo("learn1");
    }

    let learn2 = document.getElementById("learn2");
    learn2.onclick = function() {
        moreInfo("learn2");
    }
    let learn3 = document.getElementById("learn3");
    learn3.onclick = function() {
        moreInfo("learn3");
    }
    let learn4 = document.getElementById("learn4");
    learn4.onclick = function() {
        moreInfo("learn4");
    }
    let learn5 = document.getElementById("learn5");
    learn5.onclick = function() {
        moreInfo("learn5");
    }
    let learn6 = document.getElementById("learn6");
    learn6.onclick = function() {
        moreInfo("learn6");
    }
    let learn7 = document.getElementById("learn7");
    learn7.onclick = function() {
        moreInfo("learn7");
    }
    let learn8 = document.getElementById("learn8");
    learn8.onclick = function() {
        moreInfo("learn8");
    }
    let learn9 = document.getElementById("learn9");
    learn9.onclick = function() {
        moreInfo("learn9");
    }
    let learn10 = document.getElementById("learn10");
    learn10.onclick = function() {
        moreInfo("learn10");
    }
    let learn11 = document.getElementById("learn11");
    learn11.onclick = function() {
        moreInfo("learn11");
    }

    //Closing Modal when clicking X symbol

    const exitBtn = document.getElementById("exitDiv");
    let infoBox = document.getElementById("infoDiv");

    exitBtn.onclick = function() {

        TweenMax.to(infoBox, 1, { yPercent: 0, height: 0, display: "none" }, 0.1);
        TweenMax.to(".allServices", 1, { filter: "opacity(1)" }, 0.1);

        infoTitle.innerHTML = "";
        infoTitle2.innerHTML = "";
        infoTitle3.innerHTML = "";
        infoTitle4.innerHTML = "";
        infoDescrip.innerHTML = "";
        extra1.style.display = "unset";
        extra2.style.display = "unset";
        extra3.style.display = "unset";
        servicePic.setAttribute("src", "");
        servicePic2.setAttribute("src", "");
        servicePic3.setAttribute("src", "");
        servicePic4.setAttribute("src", "");
        price.innerHTML = "";
        price2.innerHTML = "";
        price3.innerHTML = "";
        price4.innerHTML = "";
        price5.innerHTML = "";
        price6.innerHTML = "";
        price7.innerHTML = "";
        price8.innerHTML = "";
        price9.innerHTML = "";
        price10.innerHTML = "";
        price11.innerHTML = "";
        price12.innerHTML = "";
        price2.style.display = "unset";
        price3.style.display = "unset";
        price4.style.display = "unset";
        price5.style.display = "unset";
        price6.style.display = "unset";
        price7.style.display = "unset";
        price8.style.display = "unset";
        price9.style.display = "unset";
        price10.style.display = "unset";
        price11.style.display = "unset";
        price12.style.display = "unset";
        note.innerHTML = "";
    }
});