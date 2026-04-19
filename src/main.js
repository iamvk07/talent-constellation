import { SceneManager } from './SceneManager.js'
import { StarField } from './StarField.js'
import { NodeManager } from './NodeManager.js'
import { ConnectionManager } from './ConnectionManager.js'
import { InteractionManager } from './InteractionManager.js'
import { UIManager } from './UIManager.js'

const canvas = document.getElementById('webgl')
const css2dContainer = document.getElementById('css2d-container')

// Init all systems
const sceneManager = new SceneManager(canvas, css2dContainer)
const { scene, camera } = sceneManager

const starField = new StarField(scene)
const nodeManager = new NodeManager(scene)
const connectionManager = new ConnectionManager(scene, nodeManager)
const uiManager = new UIManager()
const interactionManager = new InteractionManager(
  camera, canvas, sceneManager,
  nodeManager, connectionManager, uiManager,
)

// Hide loading after a short settle delay
setTimeout(() => uiManager.hideLoading(), 1200)

// RAF loop
const clock = { then: performance.now() }

function animate() {
  requestAnimationFrame(animate)

  const now = performance.now()
  const delta = Math.min((now - clock.then) / 1000, 0.05) // cap at 50ms
  clock.then = now
  const elapsed = now / 1000

  starField.update(elapsed)
  nodeManager.update(elapsed)
  connectionManager.update(delta)

  sceneManager.render()
}

animate()
