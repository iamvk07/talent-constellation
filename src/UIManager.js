import { CANDIDATES, EMPLOYERS } from './data.js'

export class UIManager {
  constructor() {
    this.panel = document.getElementById('info-panel')
    this.panelName = document.getElementById('panel-name')
    this.panelBadge = document.getElementById('panel-type-badge')
    this.panelDesc = document.getElementById('panel-description')
    this.panelTags = document.getElementById('panel-tags')
    this.panelMatchTitle = document.getElementById('panel-matches-title')
    this.panelMatchList = document.getElementById('panel-matches-list')
    this.tooltip = document.getElementById('tooltip')
    this.hintText = document.getElementById('hint-text')

    this._animateStats()
  }

  _animateStats() {
    const candidates = CANDIDATES.length
    const employers = EMPLOYERS.length
    const matches = CANDIDATES.reduce((acc, c) => acc + c.employers.length, 0)

    const animate = (el, target, duration = 1200) => {
      const start = Date.now()
      const tick = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.round(eased * target)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    setTimeout(() => {
      animate(document.getElementById('count-candidates'), candidates)
      animate(document.getElementById('count-employers'), employers, 900)
      animate(document.getElementById('count-matches'), matches, 1500)
    }, 1000)
  }

  openPanel(nodeData, matches) {
    const isEmployer = nodeData.type === 'employer'

    // Badge
    this.panelBadge.textContent = isEmployer ? '🏢 Employer' : '👤 Candidate'
    this.panelBadge.className = isEmployer ? 'employer' : 'candidate'

    // Name + desc
    this.panelName.textContent = nodeData.name
    this.panelDesc.textContent = nodeData.description ||
      (isEmployer
        ? `${nodeData.industry} — ${nodeData.matchCount} matched candidates`
        : `${nodeData.accessibility} · ${Math.round(nodeData.matchScore)}% match score`)

    // Tags
    this.panelTags.innerHTML = ''
    if (isEmployer) {
      nodeData.roles?.forEach(r => this._addTag(r, 'skill'))
      nodeData.accommodations?.slice(0, 3).forEach(a => this._addTag(a, 'access'))
      this._addTag(nodeData.industry, 'industry')
    } else {
      nodeData.skills?.forEach(s => this._addTag(s, 'skill'))
      if (nodeData.accessibility) this._addTag(nodeData.accessibility, 'access')
    }

    // Matches list
    this.panelMatchTitle.textContent = isEmployer
      ? `${matches.length} Matched Candidates`
      : `${matches.length} Matched Employer${matches.length !== 1 ? 's' : ''}`

    this.panelMatchList.innerHTML = ''
    matches.forEach(m => {
      const li = document.createElement('li')
      li.setAttribute('role', 'button')
      li.setAttribute('tabindex', '0')
      li.setAttribute('aria-label', `View ${m.name}`)

      const dot = document.createElement('span')
      dot.className = 'match-dot'
      dot.style.background = isEmployer ? '#818cf8' : '#f59e0b'

      const name = document.createElement('span')
      name.textContent = m.name

      const score = document.createElement('span')
      score.className = 'match-score'
      score.textContent = isEmployer
        ? `${m.matchScore}%`
        : (m.matchCount ? `${m.matchCount} roles` : '')

      li.append(dot, name, score)
      this.panelMatchList.appendChild(li)
    })

    this.panel.classList.remove('panel-closed')
    this.panel.classList.add('panel-open')

    // Update hint
    this.hintText.textContent = 'Press Esc or click × to deselect'
  }

  closePanel() {
    this.panel.classList.remove('panel-open')
    this.panel.classList.add('panel-closed')
    this.hintText.textContent = 'Click any node to explore · Scroll to zoom · Drag to rotate'
  }

  _addTag(text, type) {
    const span = document.createElement('span')
    span.className = `tag ${type}`
    span.textContent = text
    this.panelTags.appendChild(span)
  }

  showTooltip(x, y, data) {
    if (!data) return
    const isEmployer = data.type === 'employer'
    this.tooltip.innerHTML = `
      <strong>${data.name}</strong><br/>
      <span style="color:#94a3b8;font-size:11px">
        ${isEmployer ? data.industry : data.accessibility}
      </span>
    `
    this.tooltip.setAttribute('aria-hidden', 'false')
    this.moveTooltip(x, y)
    this.tooltip.classList.add('visible')
  }

  moveTooltip(x, y) {
    const offset = 14
    const tw = 180
    const left = x + offset + tw > window.innerWidth ? x - tw - offset : x + offset
    this.tooltip.style.left = `${left}px`
    this.tooltip.style.top = `${y + offset}px`
  }

  hideTooltip() {
    this.tooltip.classList.remove('visible')
    this.tooltip.setAttribute('aria-hidden', 'true')
  }

  hideLoading() {
    const screen = document.getElementById('loading-screen')
    screen.classList.add('hidden')
  }
}
