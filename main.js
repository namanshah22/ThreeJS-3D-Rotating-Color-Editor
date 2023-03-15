// Initialize variables
let scene, camera, renderer, controls, shirt;

// Define the colors array
const colors = [  { name: 'white', value: 0xffffff },  { name: 'black', value: 0x000000 },  { name: 'red', value: 0xff0000 },  { name: 'green', value: 0x00ff00 },  { name: 'blue', value: 0x0000ff }];

// Define the function to create the shirt
function createShirt(color) {
  // Create the shirt geometry
  const geometry = new THREE.BoxGeometry(1, 1.5, 0.01);

  // Create the shirt material
  const material = new THREE.MeshStandardMaterial({ color: color.value });

  // Create the shirt mesh
  const mesh = new THREE.Mesh(geometry, material);

  // Add the mesh to the scene
  scene.add(mesh);

  // Set the global shirt variable
  shirt = mesh;
}

// Define the function to change the shirt color
function changeShirtColor(color) {
  // Set the shirt material color
  shirt.material.color.set(color.value);
}

// Define the function to create the scene
function init() {
  // Create the scene
  scene = new THREE.Scene();

  // Create the camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2;

  // Create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create the controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Create the ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Create the directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);

  // Create the shirt
  createShirt(colors[0]);

  // Add the color options to the HTML
  const colorOptions = document.getElementById('color-options');
  colors.forEach(color => {
    const button = document.createElement('button');
    button.innerHTML = color.name;
    button.style.backgroundColor = '#' + color.value.toString(16);
    button.addEventListener('click', () => {
      changeShirtColor(color);
    });
    colorOptions.appendChild(button);
  });
}

// Define the function to animate the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Call the init function to create the scene
init();

// Call the animate function to animate the scene
animate();
