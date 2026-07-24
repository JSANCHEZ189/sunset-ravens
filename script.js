/*=========================================================
                    PORTFOLIO JS
            Juan Diego Sánchez Portfolio
=========================================================*/

"use strict";

/*=========================================================
                    SELECTORS
=========================================================*/

const body = document.body;

const header = document.querySelector("header");

const loadingScreen = document.querySelector(".loading-screen");

const loadingProgress = document.querySelector(".loading-progress");

const loadingPercent = document.querySelector(".loading-percent");

const menuButton = document.querySelector(".menu-mobile");

const menu = document.querySelector(".menu");

const scrollTop = document.querySelector(".scroll-top");

const cursorDot = document.querySelector(".cursor-dot");

const cursorOutline = document.querySelector(".cursor-outline");

const skillBars = document.querySelectorAll(".skill-progress");

const counters = document.querySelectorAll("[data-counter]");

const heroCounters = document.querySelectorAll("[data-number]");

const portfolioButtons = document.querySelectorAll(".portfolio-filter button");

const projects = document.querySelectorAll(".project-card");

const year = document.querySelector(".current-year");

/*=========================================================
                    GLOBAL
=========================================================*/

let loaderFinished = false;

let mouseX = 0;

let mouseY = 0;

/*=========================================================
                CURRENT YEAR
=========================================================*/

if(year){

    year.textContent = new Date().getFullYear();

}

/*=========================================================
                    LOADER
=========================================================*/

function startLoader(){

    let progress = 0;

    const interval = setInterval(()=>{

        progress++;

        loadingPercent.textContent = progress + "%";

        loadingProgress.style.width = progress + "%";

        if(progress >= 100){

            clearInterval(interval);

            finishLoader();

        }

    },28);

}

/*=========================================================
                FINISH LOADER
=========================================================*/

function finishLoader(){

    loaderFinished = true;

    loadingScreen.style.opacity = "0";

    loadingScreen.style.pointerEvents = "none";

    body.style.overflowY = "auto";

    setTimeout(()=>{

        loadingScreen.remove();

    },800);

}

/*=========================================================
                HEADER SCROLL
=========================================================*/

function headerEffect(){

    if(window.scrollY > 80){

        header.classList.add("active");

    }else{

        header.classList.remove("active");

    }

}

/*=========================================================
                SCROLL BUTTON
=========================================================*/

function scrollButton(){

    if(window.scrollY > 500){

        scrollTop.classList.add("active");

    }else{

        scrollTop.classList.remove("active");

    }

}

scrollTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*=========================================================
                MOBILE MENU
=========================================================*/

menuButton.addEventListener("click",()=>{

    menu.classList.toggle("active");

});

/*=========================================================
                CUSTOM CURSOR
=========================================================*/

if(cursorDot && cursorOutline){

    window.addEventListener("mousemove",(e)=>{

        mouseX = e.clientX;

        mouseY = e.clientY;

        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";

    });

    function animateCursor(){

        cursorOutline.style.left +=
        ((mouseX - cursorOutline.offsetLeft) * 0.18) + "px";

        cursorOutline.style.top +=
        ((mouseY - cursorOutline.offsetTop) * 0.18) + "px";

        requestAnimationFrame(animateCursor);

    }

    animateCursor();

}

/*=========================================================
                CURSOR HOVER
=========================================================*/

const hoverElements = document.querySelectorAll(

"a, button, .service-card, .project-card, .tool-card"

);

hoverElements.forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        cursorOutline.classList.add("cursor-hover");

    });

    item.addEventListener("mouseleave",()=>{

        cursorOutline.classList.remove("cursor-hover");

    });

});

/*=========================================================
            MAGNETIC BUTTON EFFECT
=========================================================*/

const buttons = document.querySelectorAll(

".btn,.project-btn,.send-btn"

);

buttons.forEach(button=>{

    button.addEventListener("mousemove",(e)=>{

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const moveX = (x - rect.width/2) / 8;

        const moveY = (y - rect.height/2) / 8;

        button.style.transform =

        `translate(${moveX}px,${moveY}px)`;

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="translate(0,0)";

    });

});

/*=========================================================
            3D PROJECT EFFECT
=========================================================*/

projects.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX =

        ((y / rect.height)-0.5) * -18;

        const rotateY =

        ((x / rect.width)-0.5) * 18;

        card.style.transform =

        `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-12px)
        `;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});

/*=========================================================
                HERO PARALLAX
=========================================================*/

const heroImage = document.querySelector(".hero-image");

if(heroImage){

window.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.clientX)/45;

const y=(window.innerHeight/2-e.clientY)/45;

heroImage.style.transform=

`translate(${x}px,${y}px)`;

});

}

/*=========================================================
                GLOW FOLLOW
=========================================================*/

document.addEventListener("mousemove",(e)=>{

document.documentElement.style.setProperty(

"--mouse-x",

e.clientX+"px"

);

document.documentElement.style.setProperty(

"--mouse-y",

e.clientY+"px"

);

});

/*=========================================================
            INTERSECTION OBSERVER
=========================================================*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:.15

});

document.querySelectorAll(

".section,.service-card,.ability-card,.tool-card,.project-card,.stat-card"

).forEach(item=>{

    item.classList.add("hidden");

    observer.observe(item);

});

/*=========================================================
                COUNTERS
=========================================================*/

function animateCounter(element){

    const target = Number(element.dataset.counter);

    let current = 0;

    const increment = Math.ceil(target / 80);

    const timer = setInterval(()=>{

        current += increment;

        if(current >= target){

            current = target;

            clearInterval(timer);

        }

        element.textContent = current;

    },20);

}

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            animateCounter(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

},{

    threshold:.6

});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

/*=========================================================
            HERO COUNTERS
=========================================================*/

function animateHeroCounter(element){

    const target = Number(element.dataset.number);

    let number = 0;

    const speed = Math.ceil(target / 70);

    const timer = setInterval(()=>{

        number += speed;

        if(number >= target){

            number = target;

            clearInterval(timer);

        }

        element.textContent = number;

    },25);

}

heroCounters.forEach(counter=>{

    counterObserver.observe(counter);

    counter.dataset.counter = counter.dataset.number;

});

/*=========================================================
            SKILL BARS
=========================================================*/

const skillObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.width =

            entry.target.dataset.progress + "%";

            skillObserver.unobserve(entry.target);

        }

    });

},{

    threshold:.4

});

skillBars.forEach(bar=>{

    skillObserver.observe(bar);

});

/*=========================================================
            PORTFOLIO FILTER
=========================================================*/

portfolioButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        portfolioButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        projects.forEach(project=>{

            const category = project.dataset.category;

            if(filter==="all"){

                project.style.display="block";

                requestAnimationFrame(()=>{

                    project.style.opacity="1";

                    project.style.transform="scale(1)";

                });

            }

            else if(category===filter){

                project.style.display="block";

                requestAnimationFrame(()=>{

                    project.style.opacity="1";

                    project.style.transform="scale(1)";

                });

            }

            else{

                project.style.opacity="0";

                project.style.transform="scale(.8)";

                setTimeout(()=>{

                    project.style.display="none";

                },250);

            }

        });

    });

});

/*=========================================================
                GLITCH EFFECT
=========================================================*/

const glitchTitles = document.querySelectorAll(

"h1, .section-header h2"

);

function glitchEffect(element){

    element.classList.add("glitch");

    setTimeout(()=>{

        element.classList.remove("glitch");

    },250);

}

setInterval(()=>{

    glitchTitles.forEach(title=>{

        if(Math.random() > .75){

            glitchEffect(title);

        }

    });

},3500);

/*=========================================================
                PARTICLES
=========================================================*/

const particles = document.querySelector(".particles");

function createParticle(){

    if(!particles) return;

    const particle = document.createElement("span");

    particle.className = "particle";

    const size = Math.random()*6+2;

    particle.style.width = size+"px";
    particle.style.height = size+"px";

    particle.style.left = Math.random()*100+"vw";

    particle.style.animationDuration =

    (Math.random()*8+6)+"s";

    particle.style.opacity =

    Math.random();

    particles.appendChild(particle);

    setTimeout(()=>{

        particle.remove();

    },14000);

}

setInterval(createParticle,180);

/*=========================================================
                TYPING EFFECT
=========================================================*/

const status = document.querySelector(".agent-status");

if(status){

const original = status.textContent;

status.textContent="";

let index=0;

function typing(){

if(index<original.length){

status.textContent+=original.charAt(index);

index++;

setTimeout(typing,90);

}

}

window.addEventListener("load",()=>{

setTimeout(typing,800);

});

}

/*=========================================================
            SCROLL REVEAL DELAY
=========================================================*/

document.querySelectorAll(

".project-card,.service-card,.ability-card,.tool-card"

).forEach((item,index)=>{

item.style.transitionDelay=(index*0.08)+"s";

});

/*=========================================================
                ACTIVE MENU
=========================================================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".menu a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-180;

const height=section.offsetHeight;

if(scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(

link.getAttribute("href")==="#"+current

){

link.classList.add("active");

}

});

});

/*=========================================================
                SMOOTH LINKS
=========================================================*/

navLinks.forEach(link=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

const target=document.querySelector(

link.getAttribute("href")

);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/*=========================================================
                WINDOW EVENTS
=========================================================*/

window.addEventListener("scroll",()=>{

headerEffect();

scrollButton();

});

window.addEventListener("load",()=>{

startLoader();

});

emailjs.init({
    publicKey: "Fz_afZt4iWBFVO95l",
});

const formulario = document.getElementById("contactForm");

formulario.addEventListener("submit", function(e) {

    e.preventDefault();

    emailjs.send(
        "service_699ufpi",
        "template_dim92eh",
        {
            from_name: document.getElementById("name").value,
            from_email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        }
    ).then(() => {

        alert("✅ Mensaje enviado correctamente.");
        formulario.reset();

    }).catch((error) => {

        console.log(error);
        alert("❌ Error al enviar el mensaje.");

    });

});

/*=========================================================
                INITIALIZE
=========================================================*/

headerEffect();

scrollButton();

console.clear();

console.log(

"%cPORTFOLIO INITIALIZED",

`

color:#ffffff;

background:#ff4655;

padding:10px;

font-size:18px;

font-weight:bold;

`

);

console.log(

"%cDeveloped by Juan Diego Sánchez",

"color:#00d9ff;font-size:14px;"

);
