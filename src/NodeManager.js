import * as THREE from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { EMPLOYERS, CANDIDATES } from './data.js'
import nodeVertGLSL from './shaders/nodeVert.glsl'
import nodeFragGLSL from './shaders/nodeFrag.glsl'

// Spread nodes across a sphere — employers in inner ring, candidates in outer shell
function fibonacciSphere(count, radius, offset = 0) {
  const positions = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * (i + offset)
    positions.push(new THREE.Vector3(
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    ))
  }
  return positions
}

export class NodeManager {
  constructor(scene) {
    this.scene = scene
    this.nodes = []        // { mesh, label, data, position }
    this.nodeMap = {}      // id -> node obj

    this._buildEmployers()
    this._buildCandidates()
  }

  _createNodeMaterial(color) {
    return new THREE.ShaderMaterial({
      vertexShader: nodeVertGLSL,
      fragmentShader: nodeFragGLSL,
      uniforms: {
        uColor:    { value: new THREE.Color(color) },
        uTime:     { value: 0 },
        uPulse:    { value: Math.random() },
        uSelected: { value: 0 },
        uHovered:  { value: 0 },
        uDimmed:   { value: 0 },
      },
      transparent: true,
    })
  }

  _makeLabel(name, type) {
    const div = document.createElement('div')
    div.className = `node-label ${type}`
    div.textContent = name
    div.setAttribute('aria-label', `${type === 'employer' ? 'Employer' : 'Candidate'}: ${name}`)
    return new CSS2DObject(div)
  }

  _buildEmployers() {
    const positions = fibonacciSphere(EMPLOYERS.length, 7, 0)
    EMPLOYERS.forEach((emp, i) => {
      const geo = new THREE.SphereGeometry(0.75, 32, 32)
      const mat = this._createNodeMaterial(emp.color)
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(positions[i])
      mesh.userData = { id: emp.id, type: 'employer' }

      const label = this._makeLabel(emp.name, 'employer')
      label.position.set(0, 1.1, 0)
      mesh.add(label)

      this.scene.add(mesh)

      const node = { mesh, label, data: emp, position: positions[i].clone() }
      this.nodes.push(node)
      this.nodeMap[emp.id] = node
    })
  }

  _buildCandidates() {
    const positions = fibonacciSphere(CANDIDATES.length, 16, 100)
    CANDIDATES.forEach((cand, i) => {
      const geo = new THREE.SphereGeometry(0.35, 24, 24)
      const mat = this._createNodeMaterial(cand.color)
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(positions[i])
      mesh.userData = { id: cand.id, type: 'candidate' }

      const label = this._makeLabel(cand.name, 'candidate')
      label.position.set(0, 0.6, 0)
      mesh.add(label)

      this.scene.add(mesh)

      const node = { mesh, label, data: cand, position: positions[i].clone() }
      this.nodes.push(node)
      this.nodeMap[cand.id] = node
    })
  }

  getMeshes() {
    return this.nodes.map(n => n.mesh)
  }

  getNodeById(id) {
    return this.nodeMap[id]
  }

  setHovered(id) {
    this.nodes.forEach(n => {
      const isHovered = n.data.id === id
      n.mesh.material.uniforms.uHovered.value = isHovered ? 1 : 0
    })
  }

  setSelected(id, matchIds = []) {
    const allIds = id ? [id, ...matchIds] : []
    this.nodes.forEach(n => {
      const isActive = allIds.length === 0 || allIds.includes(n.data.id)
      const isSelected = n.data.id === id
      n.mesh.material.uniforms.uSelected.value = isSelected ? 1 : 0
      n.mesh.material.uniforms.uDimmed.value = (!isActive && allIds.length > 0) ? 1 : 0
    })
  }

  clearSelection() {
    this.nodes.forEach(n => {
      n.mesh.material.uniforms.uSelected.value = 0
      n.mesh.material.uniforms.uDimmed.value = 0
      n.mesh.material.uniforms.uHovered.value = 0
    })
  }

  update(time) {
    this.nodes.forEach(n => {
      n.mesh.material.uniforms.uTime.value = time
    })
  }

  dispose() {
    this.nodes.forEach(n => {
      n.mesh.geometry.dispose()
      n.mesh.material.dispose()
      this.scene.remove(n.mesh)
    })
  }
}
