import { useEffect, useRef, useState } from "react";
import { useReducedMotion, type MotionValue } from "framer-motion";

// A living illustration in the Urban Farmer logo's palette: a green city skyline under a rising
// sun, with teak saplings sprouting on the hills as the reader scrolls through the story.

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_res;
uniform float u_time;
uniform float u_progress;
uniform vec2 u_mouse;

const vec3 PAPER = vec3(0.992, 0.980, 0.949);
const vec3 CREAM = vec3(0.973, 0.949, 0.902);
const vec3 SAND = vec3(0.933, 0.886, 0.792);
const vec3 FOREST = vec3(0.090, 0.239, 0.039);
const vec3 GREEN = vec3(0.173, 0.369, 0.078);
const vec3 LEAF = vec3(0.302, 0.541, 0.110);
const vec3 SPROUT = vec3(0.553, 0.722, 0.353);
const vec3 SOIL = vec3(0.478, 0.212, 0.071);
const vec3 BARK = vec3(0.290, 0.114, 0.024);
const vec3 SUN = vec3(0.965, 0.725, 0.231);
const vec3 SUN_LIGHT = vec3(0.992, 0.827, 0.498);

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float hash1(float n) { return fract(sin(n * 127.1) * 43758.5453); }

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
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

// Vesica (two intersecting circles) — reads as a leaf.
float sdLeaf(vec2 p, float r, float d) {
  p = abs(p);
  float b = sqrt(r * r - d * d);
  return ((p.y - b) * d > p.x * b) ? length(p - vec2(0.0, b)) : length(p - vec2(-d, 0.0)) - r;
}

float fill(float d, float aa) { return 1.0 - smoothstep(-aa, aa, d); }

float backHillY(float x, float grow) {
  return 0.15 + 0.03 * sin(x * 2.6 + 0.8) + 0.018 * sin(x * 6.1 + 2.0) + 0.02 * grow;
}

void main() {
  // Scene units: the shorter screen side is 1.0, x is centred, y grows up from the bottom edge.
  float s = min(u_res.x, u_res.y);
  vec2 p = (gl_FragCoord.xy - vec2(0.5 * u_res.x, 0.0)) / s;
  float top = u_res.y / s;
  float halfW = 0.5 * u_res.x / s;
  float aa = 1.5 / s;
  float wide = step(1.0, u_res.x / u_res.y);
  float t = u_time;
  float prog = clamp(u_progress, 0.0, 1.0);
  float grow = smoothstep(0.15, 0.85, prog);
  vec2 m = u_mouse;

  // Paper, warming toward the horizon
  float h = clamp(p.y / top, 0.0, 1.0);
  vec3 col = mix(SAND, PAPER, smoothstep(0.0, 0.8, h));
  col = mix(col, CREAM, 0.3);

  // Watercolour wash drifting across the paper
  vec2 q = p * 1.4 + vec2(t * 0.015, 0.0);
  vec2 warp = vec2(fbm(q + vec2(0.0, t * 0.04)), fbm(q + vec2(5.2, 1.3) - t * 0.03));
  float wash = fbm(q + 1.6 * warp);
  col = mix(col, SPROUT, smoothstep(0.55, 0.85, wash) * (0.12 + 0.1 * grow));
  col = mix(col, SUN_LIGHT, smoothstep(0.42, 0.2, wash) * 0.14);

  // Sun rising with the story
  vec2 sunPos = vec2(mix(0.2, 0.5, wide) + m.x * 0.006, mix(0.2, 0.58, smoothstep(0.0, 1.0, prog)) + m.y * 0.004);
  float sd = length(p - sunPos);
  float sunR = 0.095;
  col = mix(col, SUN_LIGHT, exp(-sd * 4.5) * (0.35 + 0.3 * prog));
  vec3 sunCol = mix(SUN, SUN_LIGHT, smoothstep(sunPos.y - sunR, sunPos.y + sunR, p.y));
  col = mix(col, sunCol, fill(sd - sunR, aa));

  // City skyline, as in the logo
  vec2 sp = p - vec2(m.x * 0.012, 0.0);
  float skyL = mix(-0.46, 0.06, wide);
  float skyR = mix(0.5, 0.84, wide);
  float bw = 0.05;
  float colId = floor((sp.x - skyL) / bw);
  float fx = fract((sp.x - skyL) / bw);
  float inRange = step(skyL, sp.x) * step(sp.x, skyR);
  float hr = hash1(colId * 7.13 + 3.1);
  float env = sin(clamp((sp.x - skyL) / (skyR - skyL), 0.0, 1.0) * 3.14159);
  float base = 0.12;
  float bh = (0.1 + 0.2 * hr * hr) * (0.45 + 0.55 * env);
  float margin = 0.06 + 0.12 * hash1(colId * 3.7);
  float inX = step(margin, fx) * step(fx, 1.0 - margin * 0.6);
  float spire = step(0.72, hash1(colId * 11.3)) * step(abs(fx - 0.5), 0.045) * step(sp.y, base + bh + 0.045);
  float building = inRange * max(inX * step(sp.y, base + bh), spire) * step(base - 0.08, sp.y);
  vec2 wp = vec2(fx * bw, sp.y - base);
  vec2 cell = vec2(wp.x / 0.011, wp.y / 0.017);
  vec2 wc = fract(cell);
  float win = step(0.35, wc.x) * step(wc.x, 0.75) * step(0.3, wc.y) * step(wc.y, 0.78)
    * step(margin + 0.1, fx) * step(fx, 1.0 - margin * 0.6 - 0.1)
    * step(0.04, wp.y) * step(wp.y, bh - 0.02);
  float lit = step(0.45, hash(floor(cell) + colId * 13.0));
  vec3 bcol = mix(FOREST, GREEN, smoothstep(base, base + 0.3, sp.y));
  bcol = mix(bcol, mix(LEAF, SUN_LIGHT, 0.4), win * lit * 0.6);
  col = mix(col, bcol, building * (1.0 - 0.3 * grow));

  // Back hill and the teak saplings growing on it
  vec2 hp = p - vec2(m.x * 0.02, 0.0);
  float by = backHillY(hp.x, grow);
  vec3 backCol = mix(LEAF, SPROUT, smoothstep(by - 0.14, by, hp.y) * 0.55);
  col = mix(col, backCol, fill(hp.y - by, aa));

  for (int i = 0; i < 9; i++) {
    float fi = float(i);
    float r1 = hash1(fi * 4.7 + 1.3);
    float r2 = hash1(fi * 9.1 + 7.7);
    float g = smoothstep(0.12 + 0.42 * r2, 0.4 + 0.42 * r2, prog);
    if (g > 0.001) {
      float tx = mix(-halfW + 0.08, halfW - 0.08, (fi + 0.2 + 0.6 * r1) / 9.0);
      float ty = backHillY(tx, grow) - 0.006;
      // Trees under the story copy (left side on wide screens) stay shorter.
      float damp = mix(1.0, mix(0.6, 1.0, smoothstep(-0.25, 0.15, tx)), wide);
      float H = (0.07 + 0.07 * r1) * g * damp;
      vec2 tp = hp - vec2(tx, ty);
      float sway = sin(t * 0.9 + fi * 1.7) * 0.004 * g;
      float lean = sway * clamp(tp.y / max(H, 0.001), 0.0, 1.0);
      float trunk = step(abs(tp.x - lean), 0.0035 * (0.4 + 0.6 * g)) * step(0.0, tp.y) * step(tp.y, H);
      col = mix(col, BARK, trunk);
      vec2 cp = tp - vec2(sway, H);
      float cr = (0.028 + 0.02 * r2) * g * damp;
      float c1 = length(cp) - cr;
      float c2 = length(cp - vec2(-cr * 0.8, -cr * 0.45)) - cr * 0.75;
      float c3 = length(cp - vec2(cr * 0.8, -cr * 0.4)) - cr * 0.7;
      float cd = min(c1, min(c2, c3));
      vec3 ccol = mix(GREEN, LEAF, smoothstep(-cr, cr, cp.y + cp.x * 0.3));
      col = mix(col, ccol, fill(cd, aa));
    }
  }

  // Front hill
  vec2 fp = p - vec2(m.x * 0.035, 0.0);
  float fy = 0.085 + 0.025 * sin(fp.x * 1.9 + 2.4) + 0.012 * sin(fp.x * 4.7 + t * 0.15) + 0.015 * grow;
  vec3 frontCol = mix(FOREST, GREEN, smoothstep(fy - 0.1, fy, fp.y));
  col = mix(col, frontCol, fill(fp.y - fy, aa));

  // Soil, speckled like the earth falling from the logo's shovel
  float soilY = 0.035 + 0.008 * sin(fp.x * 8.0 + 1.0);
  float speck = hash(floor(gl_FragCoord.xy / 3.0));
  vec3 soilCol = mix(BARK, SOIL, 0.35 + 0.5 * speck);
  col = mix(col, soilCol, fill(fp.y - soilY, aa));

  // Leaves drifting upward once the farm starts growing
  float leafAmt = smoothstep(0.1, 0.45, prog);
  for (int i = 0; i < 8; i++) {
    float fi = float(i);
    float r1 = hash1(fi * 2.3 + 0.7);
    float r2 = hash1(fi * 5.9 + 3.3);
    float r3 = hash1(fi * 8.1 + 6.1);
    float life = fract(t * (0.02 + 0.015 * r1) + r2);
    vec2 c = vec2(mix(-halfW, halfW, fract(r3 + 0.13 * fi)) + 0.08 * sin(life * 6.2831 + fi) - m.x * 0.05,
                  mix(0.05, top + 0.05, life));
    vec2 lp = rot(t * (0.4 + 0.5 * r2) + fi) * (p - c);
    float size = 0.012 + 0.012 * r1;
    float d = sdLeaf(lp, size, size * 0.62);
    float a = fill(d, aa) * smoothstep(0.0, 0.12, life) * smoothstep(1.0, 0.8, life) * leafAmt * 0.85;
    vec3 lc = mix(LEAF, GREEN, r2);
    lc = mix(lc, FOREST, step(abs(lp.x), 0.0012) * 0.5);
    col = mix(col, lc, a);
  }

  // Paper grain and a warm vignette
  col -= (hash(gl_FragCoord.xy) - 0.5) * 0.03;
  vec2 uv = gl_FragCoord.xy / u_res;
  float vig = smoothstep(1.15, 0.35, length((uv - 0.5) * vec2(1.0, 0.9)));
  col = mix(col * vec3(0.94, 0.91, 0.85), col, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("StoryScene shader failed to compile:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("StoryScene program failed to link:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export function StoryScene({
  progress,
  className = "",
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, powerPreference: "low-power" });
    const program = gl && createProgram(gl);
    if (!gl || !program) {
      setStatus("failed");
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // One oversized triangle covers the whole viewport.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uProgress = gl.getUniformLocation(program, "u_progress");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const start = performance.now();
    let raf = 0;
    let visible = false;
    let lost = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };

    const draw = (now: number) => {
      if (lost) return;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      // Reduced motion keeps the scene still; it only follows the scroll.
      gl.uniform1f(uTime, reduce ? 12 : ((now - start) / 1000) % 1000);
      gl.uniform1f(uProgress, progress.get());
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      raf = visible && !reduce ? requestAnimationFrame(loop) : 0;
    };

    const requestDraw = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    resize();
    draw(performance.now());
    setStatus("ready");

    const ro = new ResizeObserver(() => {
      resize();
      requestDraw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestDraw();
    });
    io.observe(canvas);

    const unsubscribe = progress.on("change", () => {
      if (visible) requestDraw();
    });

    const onPointer = (e: PointerEvent) => {
      if (!visible || reduce) return;
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const onLost = (e: Event) => {
      e.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
      setStatus("failed");
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      unsubscribe();
      window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      // Browsers cap live WebGL contexts, so release ours eagerly on unmount.
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [progress, reduce]);

  return (
    <div aria-hidden className={`overflow-hidden ${className}`}>
      {/* Painted fallback: shown before the first frame, and instead of the scene without WebGL. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_55%,rgba(253,211,127,0.55),transparent_40%),linear-gradient(to_top,#e9ddc2,#fdfaf2_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] rounded-t-[50%_100%] bg-gradient-to-b from-uf-leaf to-uf-forest opacity-80" />
      {status !== "failed" && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${status === "ready" ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
