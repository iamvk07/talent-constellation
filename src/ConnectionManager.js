import * as THREE from 'three'
import { CANDIDATES } from './data.js'

// Animated particle flow along a bezier curve between two 3D points
function createBezierTube(start, end, color, opacity = 0.18) {
  const mid = new THREE.Vector3()
    .addVectors(start, end)
    .multiplyScalar(0.5)
  mid.y += (Math.random() - 0.5) * 6
  mid.x += (Math.random() - 0.5) * 4

  const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
  const points = curve.getPoints(60)
  const geo = new THREE.BufferGeometry().setFromPoints(points)

  const mat = new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  return { line: new THREE.Line(geo, mat), curve }
}

// Flowing particle dot along the curve
function createFlowParticle(curve, color) {
  const geo = new THREE.SphereGeometry(0.06, 6, 6)
  const mat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const mesh = new THREE.Mesh(geo, mat)
  const speed = 0.18 + Math.random() * 0.2
  const offset = Math.random()
  return { mesh, curve, speed, offset, t: offset }
}

export class ConnectionManager {
  constructor(scene, nodeManager) {
    this.scene = scene
    this.nodeManager = nodeManager
    this.connections = []   // { line, curve, particles[], candidateId, employerId }
    this.activeGroup = null // currently highlighted connection group

    this._buildAllConnections()
  }

  _buildAllConnections() {
    CANDIDATES.forEach(candidate => {
      const candNode = this.nodeManager.getNodeById(candidate.id)
      if (!candNode) return

      candidate.employers.forEach(empId => {
        const empNode = this.nodeManager.getNodeById(empId)
        if (!empNode) return

        const start = candNode.position
        const end = empNode.position

        const { line, curve } = createBezierTube(start, end, '#818cf8', 0.08)
        this.scene.add(line)

        // 2 flowing particles per connection
        const particles = [
          createFlowParticle(curve, '#a5b4fc'),
          createFlowParticle(curve, '#f59e0b'),
        ]
        particles.forEach(p => this.scene.add(p.mesh))

        this.connections.push({
          line,
          curve,
          particles,
          candidateId: candidate.id,
          employerId: empId,
          baseMat: line.material,
        })
      })
    })
  }

  // Highlight connections belonging to a node id, dim others
  highlightForNode(nodeId) {
    this.activeGroup = nodeId
    this.connections.forEach(conn => {
      const isActive = conn.candidateId === nodeId || conn.employerId === nodeId
      conn.baseMat.opacity = isActive ? 0.6 : 0.04
      conn.particles.forEach(p => {
        p.mesh.material.opacity = isActive ? 0.95 : 0.0
        p.mesh.visible = isActive
      })
    })
  }

  clearHighlight() {
    this.activeGroup = null
    this.connections.forEach(conn => {
      conn.baseMat.opacity = 0.08
      conn.particles.forEach(p => {
        p.mesh.material.opacity = 0.9
        p.mesh.visible = true
      })
    })
  }

  update(delta) {
    this.connections.forEach(conn => {
      conn.particles.forEach(p => {
        p.t = (p.t + p.speed * delta) % 1.0
        const pos = conn.curve.getPoint(p.t)
        p.mesh.position.copy(pos)
      })
    })
  }

  dispose() {
    this.connections.forEach(conn => {
      conn.line.geometry.dispose()
      conn.line.material.dispose()
      this.scene.remove(conn.line)
      conn.particles.forEach(p => {
        p.mesh.geometry.dispose()
        p.mesh.material.dispose()
        this.scene.remove(p.mesh)
      })
    })
  }
}
