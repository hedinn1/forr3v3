// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

// Create a XR manager and controller
const xrButton = new webxr.XRButton(renderer);
const controller = new webxr.XRController(0);

// Load a 3D model (replace 'your-model.gltf' with your model's URL)
const loader = new THREE.GLTFLoader();
let model;

loader.load('your-model.gltf', (gltf) => {
    model = gltf.scene;
    scene.add(model);

    // Set the initial position and scale of the model
    model.position.set(0, 0, -2);
    model.scale.set(0.1, 0.1, 0.1);
});

// Handle WebXR interactions
controller.addEventListener('squeezestart', () => {
    if (model) {
        // Define the action to perform on controller squeeze
        // For example, you can animate the model or perform other actions
    }
});

// Set up the WebXR rendering loop
function animate() {
    xrButton.update();
    controller.update();

    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}

// Start the WebXR application
xrButton.addEventListener('sessionstart', onSessionStart);

function onSessionStart(event) {
    const session = event.session;

    // Initialize the session and start rendering
    // Set the XR session's reference space and initialize it here

    session.requestReferenceSpace('local-floor').then((referenceSpace) => {
        // Initialize the session with the reference space
        // Set up the viewer and other session configurations
        // Start the animation loop
        session.requestAnimationFrame(animate);
    });
}
