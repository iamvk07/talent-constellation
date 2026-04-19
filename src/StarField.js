import * as THREE from 'three'
import starVertGLSL from './shaders/starVert.glsl'
import starFragGLSL from './shaders/starFrag.glsl'

export class StarField {
  constructor(scene) {
    this.scene = scene
    this._build()
  }

  _build() {
    const count = 8000
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Distribute stars in a large sphere shell (not near origin where nodes are)
      const r = 50 + Math.random() * 150
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      sizes[i] = 0.5 + Math.random() * 1.5
      phases[i] = Math.random()
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

    this.material = new THREE.ShaderMaterial({
      vertexShader: starVertGLSL,
      fragmentShader: starFragGLSL,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    this.points = new THREE.Points(geo, this.material)
    this.scene.add(this.points)
  }

  update(time) {
    this.material.uniforms.uTime.value = time
  }

  dispose() {
    this.points.geometry.dispose()
    this.material.dispose()
    this.scene.remove(this.points)
  }
}
