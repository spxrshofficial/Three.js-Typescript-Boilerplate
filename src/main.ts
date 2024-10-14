import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
// import { GUI } from 'dat.gui'

const canvas = document.getElementById('canvas') as HTMLElement;


//--------------------------------
//Scene
//--------------------------------
const scene = new THREE.Scene()
scene.background = new THREE.Color("0x322272")

//--------------------------------
//Camera
//--------------------------------
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5
camera.position.y = 3


//--------------------------------
//Renderer
//--------------------------------
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.setPixelRatio(window.devicePixelRatio)

//--------------------------------
//Geometry
//--------------------------------
const boxgeometry = new THREE.BoxGeometry()
const material = new THREE.MeshLambertMaterial({ wireframe: false, color: '#468585', emissive: '#468585' })
const cube = new THREE.Mesh(boxgeometry, material)
cube.position.set(0, 1, 0)
scene.add(cube)

const planegeometry = new THREE.PlaneGeometry()
const planeMat = new THREE.MeshStandardMaterial({ color: '#ff0000', emissive: '#ff0000'})
const plane = new THREE.Mesh(planegeometry, planeMat)
plane.position.set(0, 0, 0)
plane.scale.set(10, 10, 1)
plane.rotation.set(- Math.PI / 2, 0, 0)
scene.add(plane)

//--------------------------------
//Light
//--------------------------------
const light = new THREE.DirectionalLight(0xffffff, 10)
light.position.set(10, 10, 100)
scene.add(light)

//--------------------------------
//Stats
//--------------------------------
const stats = new Stats()
document.body.appendChild(stats.dom)

//--------------------------------
//OrbitControls
//--------------------------------
const ocontrols = new OrbitControls(camera, renderer.domElement)
ocontrols.enableDamping = true;
ocontrols.dampingFactor = 0.05;
ocontrols.enableZoom = true
ocontrols.enablePan = true


// const gui = new GUI()

// const cubeFolder = gui.addFolder('Cube')
// cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
// cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
// cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
// cubeFolder.open()

// const cameraFolder = gui.addFolder('Camera')
// cameraFolder.add(camera.position, 'z', 0, 20)
// cameraFolder.open()

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)

  stats.update()
  ocontrols.update()
}

//--------------------------------
//Handle window resizing
//--------------------------------
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

animate()