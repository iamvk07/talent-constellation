uniform float uTime;
uniform float uPixelRatio;

attribute float aSize;
attribute float aPhase;

varying float vAlpha;

void main() {
  // Twinkle effect per star
  float twinkle = sin(uTime * 1.5 + aPhase * 6.28) * 0.5 + 0.5;
  vAlpha = 0.3 + twinkle * 0.7;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (300.0 / -mvPosition.z) * uPixelRatio * (0.7 + twinkle * 0.3);
  gl_Position = projectionMatrix * mvPosition;
}
