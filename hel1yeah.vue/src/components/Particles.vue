<template>
  <div class="particles">
    <div id="particles-js"></div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

import 'particles.js'
export default {
  name: "Particles",
  data() {
    return {

    }
  },
  mounted() {
    this.startInitParticles()

  },
  methods: {
    startInitParticles() {
      const screenWidth = window.screen.width
      if (screenWidth >= 768) {
        if (document.readyState === "complete") {
          this.initParticles()
        } else {
          setTimeout(() => {
            this.startInitParticles()
          }, 100);
        }
      }

    },
    initParticles() {
      const theme = localStorage.getItem('theme')
      let particlesColor = "#1c4512"
      if (theme === 'light') {
        particlesColor = "#1c4512"
      } else {
        particlesColor = "#8a19f0"
      }
      window.particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 19,
            "density": {
              "enable": true,
              "value_area": 315.65905665290904
            }
          },
          "color": {
            "value": particlesColor
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#ffffff"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 10,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.7,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 0.5594405594405595,
              "opacity_min": 0.1,
              "sync": true
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": particlesColor,
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "top",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": true,
              "rotateX": 631.3181133058181,
              "rotateY": 1025.8919341219544
            }
          }
        },
        "interactivity": {
          "detect_on": "window",
          "events": {
            "onhover": {
              "enable": false,
              "mode": "grab"
            },
            "onclick": {
              "enable": false,
              "mode": "bubble"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      })
    }
  },
  watch: {
    isTheme: function () {
      const screenWidth = window.screen.width
      if (screenWidth >= 768) {
        this.initParticles()
      }
    },
  },
  computed: {
    ...mapState({
      isTheme: (state) => state.isTheme
    })
  }

};
</script>

<style lang="scss">
.particles {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  // height: 100%;
  // width: 100%;
}
#particles-js {
  background-size: contain;
  background-position: 0 0;
  background-repeat: no-repeat;
  height: 100%;
}
</style>
