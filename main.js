gsap.registerPlugin(ScrollTrigger);


// #region ejemplo de rotacion cuadrado

// gsap.to(".cubo-1", {
//     scrollTrigger: {
//         trigger:".cubo-1",
//         pin: true, // pin the trigger element while active
//     start: "top top", // when the top of the trigger hits the top of the viewport
//     end: "+=500", // end after scrolling 500px beyond the start
//     scrub: 1, 
//     },
//     x: 500,
//     rotation: 360,
//     duration:3,
//   });

//   gsap.to(".cubo-2", {
//     ScrollTrigger:{
//         trigger:'.cubo-2',
//         toggleActions: "play complete reverse reset"
//     },
//     duration:1,
//     scale:2,
//     x:400,
//     delay: 1,
//     borderRadius:'50%',
//   });

//   gsap.from(".cubo-3", {
//     scrollTrigger: {
//       trigger: ".cubo-3",
//     toggleActions: "play complete reverse reset"
//     },
//     duration:1,
//     scale:2,
//     x:400,
//     delay: 1,
//     borderRadius:'50%', //TODO:Tambien puede ser escrito como  borderRadius:50
//   });

// #region una especie de parallax que baja el texto con la section 

// ScrollTrigger.create({
//     trigger: ".section1",
//     start: "top top", 
//     end: "bottom 300px", //TODO:aca estoy regulando donde debe cortar el texto de la seccion para que no se pase para abajo
//     pin: ".texto1"
//   });
  
//   ScrollTrigger.create({
//     trigger: ".section2",
//     start: "top center", 
//     end: "+=200", // 200px past the start 
//     pin: ".texto2"
//   });
  

    
//   ScrollTrigger.create({
//     trigger: ".section3",
//     start: "top center", 
//     end: "+=200", //
//     pin: ".texto3"
//   });


//#region Parallax background sections
// let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

// gsap.utils.toArray("section").forEach((section, i) => {
//   section.bg = section.querySelector(".bg"); 

//   // Give the backgrounds some random images
//   section.bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;
  
//   // the first image (i === 0) should be handled differently because it should start at the very top.
//   // use function-based values in order to keep things responsive
//   gsap.fromTo(section.bg, {
//     backgroundPosition: () => i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px"
//   }, {
//     backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
//     ease: "none",
//     scrollTrigger: {
//       trigger: section,
//       start: () => i ? "top bottom" : "top top", 
//       end: "bottom top",
//       scrub: true,
//       invalidateOnRefresh: true // to make it responsive
//     }
//   });
// });


// #region Scrolling" Section Transitions
let sections = gsap.utils.toArray("section"),
    currentSection = sections[0],
    isLastSection = false;

gsap.defaults({overwrite: 'auto', duration: 0.3});

// stretch out the body height according to however many sections there are. 
gsap.set("body", {height: (sections.length * 100) + "%"});

// create a ScrollTrigger for each section
sections.forEach((section, i) => {
  ScrollTrigger.create({
    // use dynamic scroll positions based on the window height (offset by half to make it feel natural)
    start: () => (i - 0.5) * innerHeight,
    end: () => (i + 0.5) * innerHeight,
    // when a new section activates (from either direction), set the section accordinglyl.
    onToggle: self => {
      self.isActive && setSection(section);
      // Check if it's the last section
      isLastSection = section === sections[sections.length - 1];
    }
  });
});

function setSection(newSection) {
  if (newSection !== currentSection) {
    gsap.to(currentSection, {scale: 0.8, autoAlpha: 0})
    gsap.to(newSection, {scale: 1, autoAlpha: 1});
    currentSection = newSection;
  }
}

// handles the infinite part, wrapping around at the end when scrolling down...
ScrollTrigger.create({
  start: 1,
  end: () => ScrollTrigger.maxScroll(window) - 1,
  onLeaveBack: self => {
    // Stop scrolling infinitely if it's not the first section
    if (!isLastSection && ScrollTrigger.maxScroll(window) === window.scrollY) {
      self.scroll(2);
    }
  },
  onLeave: self => {
    if (!isLastSection) {
      self.scroll(2);
    }
  }
}).scroll(2);
