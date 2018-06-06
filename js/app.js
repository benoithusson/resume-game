particlesJS('particles-js',  { "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#FFFFFF" // Particules's colors
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 1,
        "color": "#FFFFFF" // Color around the particules
      },
      "polygon": {
        "nb_sides": 20
      },
    },
    "opacity": {
      "value": 0.7, // Particules'opacity
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.9,
        "sync": false
      }
    },
    "size": {
      "value": 5,
      "random": true,
      "anim": {
        "enable": true, // Pour relier les particules quand elles passent à proximité les uns des autres
        "speed": 5,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 50,
      "color": "#FFFFFF",
      "opacity": 0.4,
      "width": 2
    },
    "move": {
      "enable": true, // TRUE / FALSE : déplacement ou non des particules
      "speed": 2, // Speed of the particules
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 200,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 100,
        "size": 80,
        "duration": 2,
        "opacity": 0.8,
        "speed": 10
      },
      "repulse": {
        "distance": 1,
        "duration": 1
      },
      "push": {
        "particles_nb": 5 // To create new particules on click
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});