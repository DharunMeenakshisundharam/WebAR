import * as THREE from 'three'
import{OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
console.log(OrbitControls)



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



//mousemove
const cursor={
    x:0,
    y:0
 }

 window.addEventListener('mousemove',(event)=>
 {
    cursor.x=(event.clientX/sizes.width - 0.5)
    cursor.y =-(event.clientY/sizes.width - 0.5)
 }
 )

/**
 * Lights
 */
const ambientLight = new THREE.HemisphereLight(0xffff,'pink', 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xff9000, 55)
// pointLight.position.x = 1
// pointLight.position.y = -1
// pointLight.position.z = 1
scene.add(pointLight)
const rect_area_light = new THREE.RectAreaLight('blue', 55)
// rect_area_light.position.x = 2
// rect_area_light.position.y = 3
// rect_area_light.position.z = 4
scene.add(rect_area_light)


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
// controls

const controls = new OrbitControls(camera,canvas)

//resize
window.addEventListener('resize',()=>
{
    sizes.width=window.innerWidth
    sizes.height=window.innerHeight

    //update camera
    camera.aspect=sizes.width/sizes.height
    camera.updateProjectionMatrix()
    //update renderer size
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

//fullscreen
window.addEventListener('dblclick',()=>
{
    const fullscreen = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreen)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else{
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }

})




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))


// animation
const clock = new THREE.Clock()
const tick = ()=>
{
    const elapsedtime = clock.getElapsedTime()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()