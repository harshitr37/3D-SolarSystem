document.addEventListener("DOMContentLoaded", function () {
    const solarSystem = document.querySelector(".solar-system");
  
    // Planet data: name, orbit size, orbit speed, orbit alignment
    const planets = [
        { id: "mercury", orbitSize: 120, speed: 0.04, verticalShift: -200, size: 20, angle: 0},
        { id: "venus", orbitSize: 170, speed: 0.01, verticalShift: -140, size: 30 , angle: 0},
        { id: "earth", orbitSize: 265, speed: 0.0025,verticalShift: -80 , size: 35, angle: 0, hasMoon: true},
        { id: "mars", orbitSize: 365, speed: 0.0020,verticalShift: -20 , size: 28, angle: 0},
        { id: "jupiter", orbitSize: 485, speed: 0.0012,verticalShift: 50 , size: 70, angle: 0},
        { id: "saturn", orbitSize: 640, speed: 0.0009,verticalShift: 120 , size: 60, angle: 0},
        { id: "uranus", orbitSize: 760, speed: 0.0005,verticalShift: 190 , size: 50, angle: 0},
        { id: "neptune", orbitSize: 838, speed: 0.0001,verticalShift: 260 , size: 48, angle: 0}
    ];

    planets.forEach(planet => {
    const planetDiv = document.getElementById(planet.id);
    const orbit = document.createElement("div");
        // Create orbit
        orbit.classList.add("orbit");
        orbit.style.width = `${planet.orbitSize * 2}px`;
        orbit.style.height =` ${planet.orbitSize * 1.2}px`;
        orbit.style.position = "absolute";
        orbit.style.top = "50%";
        orbit.style.left = "50%";
        orbit.style.transform = `translate(-50%, -50%) rotateX(45deg) scaleX(1.7) scaleY(0.75)`;
        orbit.appendChild(planetDiv);
        solarSystem.appendChild(orbit);
        //solarSystem.appendChild(planetDiv);
        
        //If the planet has moon (Earth)
        if(planet.hasMoon){
            const moon = document.createElement("div");
            moon.classList.add("moon");
            moon.style.position= "absolute";
            moon.style.width= "10px";
            moon.style.height= "10px";
            moon.style.background= "gray";
            moon.style.borderRadius= "50%";
            planetDiv.appendChild(moon);
            planet.moon = {element: moon, orbitSize: 40, speed: 0.025, angle: 0};
        }
    });
  
    //Ensure planets move within the orbits
  
    function animatePlanets(){
    planets.forEach(planet => {
        const planetDiv = document.getElementById(planet.id);
        planet.angle += planet.speed;
        const x = Math.cos(planet.angle) * planet.orbitSize;
        const y = Math.sin(planet.angle) * (planet.orbitSize * 0.6);
        planetDiv.style.position = "absolute";
        //planetDiv.style.top = "50%";
        //planetDiv.style.left = "50%";
        planetDiv.style.transform = `translate(-50%, -50%) translateX(${x}px) translateY(${y}px)`;

        //Animate the moon
        
        if(planet.hasMoon){
            planet.moon.angle += planet.moon.speed;
            const moonX = Math.cos(planet.moon.angle) * planet.moon.orbitSize;
            const moonY = Math.sin(planet.moon.angle) * planet.moon.orbitSize;

            planet.moon.element.style.transform = `translate(${moonX}px, ${moonY}px)`;
        }
    });
    requestAnimationFrame(animatePlanets);

}
        
        animatePlanets();   

        // Smooth zoom feature

        let scale = 1;
        document.addEventListener("wheel", function (event) {
        scale += event.deltaY < 0 ? 0.1 : -0.1;
        scale = Math.max(0.5, Math.min(2, scale)); // Keep zoom between 0.5x and 2x
        solarSystem.style.transform = `scale(${scale})`;
    });
  
        
        
        //planetDiv.style.width =  `${planet.size}px`;
        //planetDiv.style.height = `${planet.size}px`;
        
        // Fix orbit animation
        //planetDiv.style.setProperty("--orbit-radius", `${planet.orbitSize}px`);
        //planetDiv.style.animation = `orbit ${planet.speed}s infinite linear`;
        
  
        
        
    });
    

 
    
