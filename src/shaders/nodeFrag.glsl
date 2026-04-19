uniform vec3 uColor;
uniform float uTime;
uniform float uSelected;
uniform float uHovered;
uniform float uDimmed;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vPulse;

void main() {
  // Fresnel rim glow
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);

  // Core color
  vec3 color = uColor;

  // Brighten on hover/select
  float brightness = 1.0 + (uHovered * 0.4) + (uSelected * 0.6);
  color *= brightness;

  // Animated inner shimmer
  float shimmer = sin(uTime * 3.0 + vPosition.y * 8.0) * 0.1 + 0.9;
  color *= shimmer;

  // Fresnel rim
  vec3 rimColor = mix(color, vec3(1.0), 0.5);
  color = mix(color, rimColor, fresnel * (0.6 + uSelected * 0.4));

  // Dimmed state
  float alpha = mix(0.2, 1.0, 1.0 - uDimmed * 0.75);
  float colorMix = uDimmed * 0.7;
  color = mix(color, vec3(0.3, 0.3, 0.4), colorMix);

  // Pulse ring effect on selection
  float dist = length(vPosition);
  float ring = smoothstep(0.95, 1.0, dist / dist) * uSelected * vPulse;

  gl_FragColor = vec4(color + ring * 0.3, alpha);
}
