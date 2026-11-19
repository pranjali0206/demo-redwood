/**
 * WebGL background for the home hero: a slow, domain-warped "silk" of brand greens with a faint
 * glow of the logo red in the corners. No dependencies.
 *
 * - Renders at a reduced resolution (the gradient is soft, so it scales up cleanly) to stay light.
 * - Pauses when the hero is off screen or the tab is hidden.
 * - With reduced motion it draws one still frame.
 * - Without WebGL the canvas stays transparent and the CSS gradient underneath shows instead.
 */

import { useEffect, useRef } from "react";

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

// Soft round glow in one corner, sized against the shorter side of the hero.
float cornerGlow(vec2 uv, vec2 corner) {
  float d = length((uv - corner) * uRes) / min(uRes.x, uRes.y);
  return exp(-d * d * 26.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;          // 0..1, y up
  vec2 p = uv * vec2(uRes.x / uRes.y, 1.0);  // aspect-correct
  float t = uTime * 0.035;

  // Two passes of domain warping give the folded, flowing silk.
  vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, t)), fbm(p * 1.4 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.6 + 2.0 * q + vec2(1.7, 9.2) + t * 1.3),
                fbm(p * 1.6 + 2.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.2 + 2.4 * r);

  vec3 cream   = vec3(0.965, 0.980, 0.961);
  vec3 mint    = vec3(0.835, 0.914, 0.863);
  vec3 sage    = vec3(0.596, 0.773, 0.667);
  vec3 emerald = vec3(0.122, 0.420, 0.310);   // #1f6b4f
  vec3 ink     = vec3(0.055, 0.231, 0.180);   // #0e3b2e

  // Silk of mint and sage everywhere...
  vec3 col = mix(mint, sage, smoothstep(0.25, 0.85, f));
  col = mix(col, cream, smoothstep(0.6, 1.0, length(q)) * 0.5);

  // ...deepening into emerald folds towards the right, behind the signboard.
  float right = smoothstep(0.3, 1.0, uv.x);
  col = mix(col, emerald, smoothstep(0.42, 0.85, r.x) * 0.75 * right);
  col = mix(col, ink, smoothstep(0.7, 0.95, r.x * f * 1.5) * 0.35 * right);

  // The headline side stays light so the green copy keeps its contrast.
  col = mix(col, cream, smoothstep(0.62, 0.05, uv.x) * 0.55);

  // A satin sheen riding the folds.
  col += pow(smoothstep(0.35, 0.9, f * r.y * 1.7), 2.0) * 0.14 * vec3(1.0, 0.98, 0.9);

  // The logo red, only as a tight, breathing glow tucked into each corner.
  float corners = cornerGlow(uv, vec2(0.0, 1.0)) + cornerGlow(uv, vec2(1.0, 1.0))
                + cornerGlow(uv, vec2(0.0, 0.0)) + cornerGlow(uv, vec2(1.0, 0.0));
  corners *= (0.8 + 0.2 * sin(uTime * 0.45)) * (0.7 + 0.6 * f);
  col = mix(col, vec3(0.62, 0.05, 0.13), clamp(corners, 0.0, 1.0) * 0.42);

  gl_FragColor = vec4(col, 1.0);
}
`;

/** Canvas pixels per CSS pixel. The silk is soft, so a low resolution looks identical. */
const RESOLUTION = 0.5;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function HeroShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!canvas || !gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // One triangle that covers the whole canvas.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Start part-way in, so the first frame is already a developed pattern.
    const t0 = performance.now() - 40_000;
    let frame = 0;
    let visible = true;

    const draw = (now: number) => {
      gl.uniform1f(uTime, still ? 40 : (now - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * RESOLUTION));
      const h = Math.max(1, Math.round(canvas.clientHeight * RESOLUTION));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      if (still) draw(performance.now());
    };

    const loop = (now: number) => {
      draw(now);
      frame = visible ? requestAnimationFrame(loop) : 0;
    };

    resize();
    draw(performance.now());
    canvas.dataset.ready = "true";

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame && !still) frame = requestAnimationFrame(loop);
    });
    visibility.observe(canvas);

    if (!still) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`rwb-shader ${className ?? ""}`} />;
}
