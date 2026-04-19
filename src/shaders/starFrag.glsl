varying float vAlpha;

void main() {
  // Soft circular point
  float dist = length(gl_PointCoord - 0.5);
  float strength = 1.0 - smoothstep(0.0, 0.5, dist);
  strength = pow(strength, 2.0);

  gl_FragColor = vec4(vec3(0.85, 0.9, 1.0), strength * vAlpha);
}
