uniform float uTime;
uniform float uPulse;
uniform float uSelected;
uniform float uHovered;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vPulse;

void main() {
  vNormal = normalize(normalMatrix * normal);

  float pulse = sin(uTime * 2.0 + uPulse * 6.28) * 0.5 + 0.5;
  float scale = 1.0 + (uHovered * 0.15) + (uSelected * 0.25) + (pulse * uSelected * 0.08);

  vPulse = pulse;
  vPosition = position;

  vec3 pos = position * scale;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
