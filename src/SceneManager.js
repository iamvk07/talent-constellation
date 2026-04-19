import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

export class SceneManager {
  constructor(canvas, css2dContainer) {
    this.canvas = canvas
    this.css2dContainer = css2dContainer
    this.width = window.innerWidth
    this.height = window.innerHeight

    this._initRenderer()
    this._initScene()
    this._initCamera()
    this._initControls()
    this._initLights()
    this._initComposer()
    this._initCSS2DRenderer()
    this._initResize()
  }

  _initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.2
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
  }

  _initScene() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x04040f)
    this.scene.fog = new THREE.FogExp2(0x04040f, 0.015)
  }

  _initCamera() {
    this.camera = new THREE.PerspectiveCamera(55, this.width / this.height, 0.1, 500)
    this.camera.position.set(0, 0, 32)
  }

  _initControls() {
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.rotateSpeed = 0.4
    this.controls.zoomSpeed = 0.6
    this.controls.minDistance = 10
    this.controls.maxDistance = 70
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = 0.3
    this.controls.enablePan = false
  }

  _initLights() {
    const ambient = new THREE.AmbientLight(0x1a1a3e, 2)
    this.scene.add(ambient)

    const point1 = new THREE.PointLight(0x818cf8, 3, 80)
    point1.position.set(-20, 15, 10)
    this.scene.add(point1)

    const point2 = new THREE.PointLight(0xf59e0b, 2, 60)
    point2.position.set(20, -10, 5)
    this.scene.add(point2)
  }

  _initComposer() {
    this.composer = new EffectComposer(this.renderer)

    const renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(renderPass)

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.width, this.height),
      1.4,   // strength
      0.4,   // radius
      0.1    // threshold
    )
    this.composer.addPass(this.bloomPass)

    const outputPass = new OutputPass()
    this.composer.addPass(outputPass)
  }

  _initCSS2DRenderer() {
    this.css2d = new CSS2DRenderer()
    this.css2d.setSize(this.width, this.height)
    this.css2d.domElement.style.position = 'absolute'
    this.css2d.domElement.style.top = '0'
    this.css2d.domElement.style.left = '0'
    this.css2d.domElement.style.pointerEvents = 'none'
    this.css2dContainer.appendChild(this.css2d.domElement)
  }

  _initResize() {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.width, this.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.composer.setSize(this.width, this.height)
      this.css2d.setSize(this.width, this.height)
    })
  }

  render() {
    this.controls.update()
    this.composer.render()
    this.css2d.render(this.scene, this.camera)
  }

  pauseAutoRotate() {
    this.controls.autoRotate = false
  }

  resumeAutoRotate() {
    this.controls.autoRotate = true
  }
}
