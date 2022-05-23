// import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// import * as dat from "dat.gui";

import "./style.css";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  innerWidth / innerHeight,
  0.1,
  2000
);
camera.position.x = 50;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.getElementById("app").appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const hlight = new THREE.AmbientLight(0x404040, 100);
scene.add(hlight);

//

const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let i = 0; i < 10000; i++) {
  vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
  vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
  vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
}

geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);

const particles = new THREE.Points(
  geometry,
  new THREE.PointsMaterial({ color: 0x888888 })
);
scene.add(particles);

//

let bee;
let loader = new GLTFLoader();
loader.load("Bee.glb", function (object) {
  bee = object.scene;
  // bee.scale.set(0.5, 0.5, 0.5);
  scene.add(bee);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  particles.rotation.x += 0.0005;
  if (bee) {
    bee.rotation.y += 0.005;
  }
}
animate();

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
});
