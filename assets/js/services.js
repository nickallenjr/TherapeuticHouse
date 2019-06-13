document.addEventListener("DOMContentLoaded", function(event) {
    //do work	
    const nav = document.getElementById("navi");

    window.addEventListener('scroll', function() {
        const winTop = window.pageYOffset

        if (winTop > 0) {
            TweenMax.to(nav, 1, { position: "fixed", backgroundColor: "#ffffff", top: 0, zIndex: 2 });
            TweenMax.to(".naviLinks", 1, { color: "#400F3C" });
            TweenMax.to(".naviTitle1", 1, { color: "#400F3C" });
        } else {
            TweenMax.to(nav, 1, { position: "fixed", backgroundColor: "transparent" })
            TweenMax.to(".naviLinks", 1, { color: "#ffffff" });
            TweenMax.to(".naviTitle1", 1, { color: "#ffffff" })
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

    //Object for populating modal with service information

    const allServices = {
        titles: {
            lhamo: "LHAMO HERBAL PADS",
            chakra: "CHAKRA ALIGNMENT",
            reflex: "FOOT / HAND REFLEXOLOGY",
            magnet: "MAGNETIZED WATER",
            candle: "EAR CANDLING",
            therapy: "MAGNET THERAPY",
            teas: "HERBAL TEAS",
            feng: "FENG SHUI",
            birth: "NATURAL BIRTHING",
            energy: "ENERGY CLEANSING"
        },
        pictures: {
            lhamo: "../assets/images/IMG_6512.jpg"
        },
        descriptions: {
            lhamo: "Lhamo Herbal Pads are manufactured using select plant extracts derived from well known standard texts on traditional Chinese herbal medicine (used to train state-licensed practitioners to this day). The use of plant oils and extracts as ointment has been well established component of folk medicine in the West and it persists to this day in certain clinical settings. Our product employs a hybrid approach, combining traditional Chinese herbal formulations with topical application techniques pioneered in the West.",
            chakra: "Chakras are spinning wheels of energy and are aligned starting at the base of your spine and move up to the crown of your head. They regulate the energy flow of your body. Depending on which chakra(s) are blocked you may experience symptoms such as low energy, being emotional, feeling stuck/unmotivated, to name few. The benefits range from removing bad energy from the body, unblocks the blockages that could be causing discomfort or pain, and allows energy to flow freely. Remove any blockages that you have to get your energy flowing again. Allow your 7 major chakras to operate holistically creating balance in your life.",
            reflex: "Magnetism has become a means for many people who are seeking relief for nagging pain. Applying magnetism to the hands and feet promotes increased blood flow and oxygen levels to the magnetized area, aligning of cells in the magnetic field.",
            magnet: "Magnetized water activates, cleanses, and detoxifies every part of the body. Drinking magnetized water influences the autonomic nervous system and the toxic deposits within the connective tissues of the body. The body is made up of 70% water, replenish it with water that will assist in the body’s natural way of healing.",
            candle: "Ear candling contributes to a greater sense of well-being as well as enhanced physical and mental health. It removes unwanted ear wax, impurities and toxins from the ear. By lighting the beeswax candle, a gentle suction is created and vacuum draws the wax and impurities from the ear and produces relief.",
            therapy: "Magnetic therapy is an alternative medical practice that uses static (i.e. unmoving) magnets to alleviate pain and other health concerns. So-called therapeutic magnets are typically integrated into bracelets, rings, or shoe inserts, though therapeutic magnetic mattresses and clothing are also on the market.",
            teas: "Our selection of herbal teas includes a wide array of naturally caffeine-free teas, also called tisanes, including pure rooibos, mint, chamomile, hibiscus, rose tea and a variety of herbal tea blends. Many herbal teas are known for having medicinal qualities, such as calming, throat soothing, and sleepy teas.",
            feng: "a system of laws considered to govern spatial arrangement and orientation in relation to the flow of energy (qi), and whose favorable or unfavorable effects are taken into account when siting and designing buildings",
            birth: "Natural childbirth is childbirth without routine medical interventions, particularly anesthesia. Natural childbirth arose in opposition to the techno-medical model of childbirth that has recently gained popularity in industrialized societies.",
            energy: "Toxic energy from arguments or illness can accumulate in shared spaces such as living rooms, kitchens and dens. Your home can be clean and organized but still have a heavy feeling. Even if you’re not a trained Zen master, the subtle frequencies of energy can be felt if you pay attention. A cleansed and energized room should feel light, fresh, and inviting when you enter. Like anything in life, getting rid of negative energy takes daily practice, so make sage house cleaning, healing crystals, and other practices an everyday habit for the best results.",
        },
        prices: {
            chakra: "1 HOUR CHAKRA SESSION: $75",
            reflex: {
                price: "1 HOUR FEET REFLEXOLOGY SESSION: $65",
                price2: "1 HOUR HAND REFLEXOLOGY SESSION: $45"
            },
            magnet: {
                price: "32oz $10",
                price2: "640z $22",
                price3: "1gal $32"
            },
            candle: "40 MIN EAR CANDLING SESSION: $40"
        }
    };

    //Opening Modal and populating it

    let infoTitle = document.getElementById("infoTitle");
    let servicePic = document.getElementById("serviceImg");
    let infoDescrip = document.getElementById("infoDescrip");
    let price = document.getElementById("price");
    let price2 = document.getElementById("price2");
    let price3 = document.getElementById("price3");


    let moreInfo = function(service) {

        let serviceLink = document.getElementById(service);
        let serviceId = serviceLink.getAttribute("id");
        console.log(serviceId);

        let infoDiv = document.getElementById("infoDiv");

        if (serviceId == "learn1") {
            infoTitle.innerHTML = allServices.titles.chakra;
            infoDescrip.innerHTML = allServices.descriptions.chakra;
            price.innerHTML = allServices.prices.chakra;
        } else if (serviceId == "learn2") {
            infoTitle.innerHTML = allServices.titles.reflex;
            infoDescrip.innerHTML = allServices.descriptions.reflex;
            price.innerHTML = allServices.prices.reflex.price;
            price2.innerHTML = allServices.prices.reflex.price2;
        } else if (serviceId == "learn3") {
            infoTitle.innerHTML = allServices.titles.magnet;
            infoDescrip.innerHTML = allServices.descriptions.magnet;
            price.innerHTML = allServices.prices.magnet.price;
            price2.innerHTML = allServices.prices.magnet.price2;
            price3.innerHTML = allServices.prices.magnet.price3;
        } else if (serviceId == "learn4") {
            infoTitle.innerHTML = allServices.titles.candle;
            infoDescrip.innerHTML = allServices.descriptions.candle;
            price.innerHTML = allServices.prices.candle;
        } else if (serviceId == "learn5") {
            infoTitle.innerHTML = allServices.titles.lhamo;
            infoDescrip.innerHTML = allServices.descriptions.lhamo;
            servicePic.setAttribute("src", allServices.pictures.lhamo);
        } else if (serviceId == "learn6") {
            infoTitle.innerHTML = allServices.titles.therapy;
            infoDescrip.innerHTML = allServices.descriptions.therapy;
        } else if (serviceId == "learn7") {
            infoTitle.innerHTML = allServices.titles.teas;
            infoDescrip.innerHTML = allServices.descriptions.teas;
        } else if (serviceId == "learn8") {
            infoTitle.innerHTML = allServices.titles.feng;
            infoDescrip.innerHTML = allServices.descriptions.feng;
        } else if (serviceId == "learn9") {
            infoTitle.innerHTML = allServices.titles.birth;
            infoDescrip.innerHTML = allServices.descriptions.birth;
        } else if (serviceId == "learn10") {
            infoTitle.innerHTML = allServices.titles.energy;
            infoDescrip.innerHTML = allServices.descriptions.energy;
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

    //Closing Modal when clicking X symbol

    const exitBtn = document.getElementById("exitDiv");
    let infoBox = document.getElementById("infoDiv");

    exitBtn.onclick = function() {

        TweenMax.to(infoBox, 1, { yPercent: 0, height: 0, display: "none" }, 0.1);
        TweenMax.to(".allServices", 1, { filter: "opacity(1)" }, 0.1);

        infoTitle.innerHTML = ""
        infoDescrip.innerHTML = ""
        price.innerHTML = ""
        price2.innerHTML = ""
        price3.innerHTML = ""
    }


});