//import * as THREE from './three.m.js';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from './node_modules/three';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer, controls, shirt;
const colorPicker = document.getElementById("color-picker");

// initialize function
function init() {
  // create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // create scene
  scene = new THREE.Scene();

  // create shirt
  const loader = new GLTFLoader();
  loader.load(
    "https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf",
    (gltf) => {
      shirt = gltf.scene;
      shirt.traverse(function (child) {
        if (child.isMesh) {
          child.material.color = new THREE.Color(0xffffff);
        }
      });
      scene.add(shirt);
    }
  );

  // create light
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(0, 0, 10);
  scene.add(light);

  // create renderer
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("canvas") });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // create controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // add event listener for color picker
  colorPicker.addEventListener("input", function () {
    const color = this.value;
    shirt.traverse(function (child) {
      if (child.isMesh) {
        child.material.color.set(color);
      }
    });
  });
}

// animate function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

// call init and animate functions
init();
animate();
