import * as THREE from 'three'
import gsap from 'gsap'
import { getMatchesForNode } from './data.js'

export class InteractionManager {
  constructor(camera, canvas, sceneManager, nodeManager, connectionManager, uiManager) {
    this.camera = camera
    this.canvas = canvas
    this.sceneManager = sceneManager
    this.nodeManager = nodeManager
    this.connectionManager = connectionManager
    this.uiManager = uiManager

    this.raycaster = new THREE.Raycaster()
    this.raycaster.params.Points.threshold = 0.3
    this.mouse = new THREE.Vector2(-9999, -9999)
    this.hoveredId = null
    this.selectedId = null

    this._bindEvents()
  }

  _bindEvents() {
    this.canvas.addEventListener('mousemove', e => this._onMouseMove(e))
    this.canvas.addEventListener('click', e => this._onClick(e))
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') this._deselect()
    })

    document.getElementById('panel-close')?.addEventListener('click', () => this._deselect())
  }

  _onMouseMove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

    const hit = this._raycast()
    const newId = hit ? hit.object.userData.id : null

    if (newId !== this.hoveredId) {
      this.hoveredId = newId
      this.nodeManager.setHovered(newId)
      this.canvas.style.cursor = newId ? 'pointer' : 'grab'

      if (newId && !this.selectedId) {
        const node = this.nodeManager.getNodeById(newId)
        this.uiManager.showTooltip(e.clientX, e.clientY, node?.data)
      } else if (!newId) {
        this.uiManager.hideTooltip()
      }
    } else if (newId) {
      this.uiManager.moveTooltip(e.clientX, e.clientY)
    }
  }

  _onClick(e) {
    const hit = this._raycast()
    if (!hit) {
      this._deselect()
      return
    }

    const id = hit.object.userData.id
    if (id === this.selectedId) {
      this._deselect()
      return
    }

    this._select(id)
  }

  _select(id) {
    this.selectedId = id
    const node = this.nodeManager.getNodeById(id)
    if (!node) return

    const matches = getMatchesForNode(id)
    const matchIds = matches.map(m => m.id)

    this.nodeManager.setSelected(id, matchIds)
    this.connectionManager.highlightForNode(id)
    this.uiManager.openPanel(node.data, matches)
    this.uiManager.hideTooltip()

    // GSAP camera focus: move toward selected node
    const target = node.position.clone()
    const camOffset = target.clone().normalize().multiplyScalar(22)
    const camTarget = target.clone().add(camOffset)

    this.sceneManager.pauseAutoRotate()

    gsap.to(this.camera.position, {
      x: camTarget.x,
      y: camTarget.y,
      z: camTarget.z,
      duration: 1.4,
      ease: 'power3.inOut',
    })

    gsap.to(this.sceneManager.controls.target, {
      x: target.x * 0.4,
      y: target.y * 0.4,
      z: target.z * 0.4,
      duration: 1.4,
      ease: 'power3.inOut',
      onUpdate: () => this.sceneManager.controls.update(),
    })
  }

  _deselect() {
    this.selectedId = null
    this.nodeManager.clearSelection()
    this.connectionManager.clearHighlight()
    this.uiManager.closePanel()
    this.sceneManager.resumeAutoRotate()

    gsap.to(this.camera.position, {
      x: 0, y: 0, z: 32,
      duration: 1.2,
      ease: 'power2.inOut',
    })

    gsap.to(this.sceneManager.controls.target, {
      x: 0, y: 0, z: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => this.sceneManager.controls.update(),
    })
  }

  _raycast() {
    this.raycaster.setFromCamera(this.mouse, this.camera)
    const meshes = this.nodeManager.getMeshes()
    const hits = this.raycaster.intersectObjects(meshes, false)
    return hits.length > 0 ? hits[0] : null
  }

  // Keyboard accessibility: tab through nodes
  focusNextNode(direction = 1) {
    const nodes = this.nodeManager.nodes
    if (!nodes.length) return
    const currentIdx = this.selectedId
      ? nodes.findIndex(n => n.data.id === this.selectedId)
      : -1
    const nextIdx = (currentIdx + direction + nodes.length) % nodes.length
    this._select(nodes[nextIdx].data.id)
  }
}
