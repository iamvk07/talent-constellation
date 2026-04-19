# Talent Constellation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an immersive Three.js 3D particle network visualization showing Enabled Talent's AI matching concept — candidates and employers as glowing nodes in space with animated particle streams connecting matches.

**Architecture:** Vanilla JS + Three.js via Vite. Scene split into focused manager classes (SceneManager, StarField, NodeManager, ConnectionManager, InteractionManager, UIManager). Post-processing bloom via Three.js EffectComposer. Deployed to GitHub Pages via Actions.

**Tech Stack:** Three.js r160, GSAP 3, Vite 5, custom GLSL shaders, EffectComposer + UnrealBloomPass, CSS2DRenderer for labels

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Entry shell, root div, meta tags |
| `style.css` | UI overlay styles, info panel, tooltips, fonts |
| `src/main.js` | Bootstrap: init all managers, start RAF loop |
| `src/data.js` | Mock candidates + employers with skills/accessibility data |
| `src/SceneManager.js` | Renderer, camera, lights, EffectComposer, resize |
| `src/StarField.js` | 8000-particle background star field |
| `src/NodeManager.js` | Candidate + employer instanced nodes, custom glow shaders |
| `src/ConnectionManager.js` | Animated bezier tube connections between matches |
| `src/InteractionManager.js` | Raycasting, hover, click, GSAP camera focus |
| `src/UIManager.js` | Info panel, tooltips, stats bar, accessibility labels |
| `src/shaders/nodeFrag.glsl` | Node glow fragment shader |
| `src/shaders/nodeVert.glsl` | Node vertex shader with pulse animation |
| `src/shaders/starFrag.glsl` | Star point fragment shader |
| `src/shaders/starVert.glsl` | Star point vertex shader |
| `vite.config.js` | Vite config with glsl plugin |
| `.github/workflows/deploy.yml` | Auto-deploy to GitHub Pages on push to main |

---

### Task 1: Project scaffold + data layer

- [x] Init Vite project, install three, gsap, vite-plugin-glsl
- [x] Write `src/data.js` with 25 candidates + 6 employers + match map
- [x] Write `index.html` shell
- [x] Write base `style.css`
- [x] Commit: "feat: scaffold + data layer"

### Task 2: SceneManager + StarField

- [x] Write `src/SceneManager.js` — renderer, camera, OrbitControls, EffectComposer, UnrealBloomPass, resize handler
- [x] Write `src/StarField.js` — 8000 particles in BufferGeometry with custom twinkle shaders
- [x] Wire into `src/main.js`
- [x] Commit: "feat: scene + starfield"

### Task 3: NodeManager with custom shaders

- [x] Write GLSL shaders for pulsing glow nodes
- [x] Write `src/NodeManager.js` — candidate spheres (blue-purple palette) + employer orbs (gold), CSS2D labels
- [x] Commit: "feat: node manager + shaders"

### Task 4: ConnectionManager

- [x] Write `src/ConnectionManager.js` — bezier TubeGeometry connections, animated particle flow along tubes
- [x] Commit: "feat: animated connections"

### Task 5: InteractionManager

- [x] Write `src/InteractionManager.js` — raycaster hover (pulse scale), click (GSAP camera zoom), highlight connected nodes
- [x] Commit: "feat: interaction system"

### Task 6: UIManager + polish

- [x] Write `src/UIManager.js` — sliding info panel, tooltip, stats counter, keyboard nav
- [x] Add bloom post-processing tuning
- [x] Commit: "feat: UI + polish"

### Task 7: GitHub Actions + push

- [x] Write `.github/workflows/deploy.yml` for Pages
- [x] Init git, push to GitHub
- [x] Commit: "feat: deploy workflow"
