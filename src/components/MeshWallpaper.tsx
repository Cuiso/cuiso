"use client";

import { useEffect, useRef } from "react";

const VERT = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p = vec2(
    (gl_VertexID == 1) ? 3.0 : -1.0,
    (gl_VertexID == 2) ? 3.0 : -1.0
  );
  vUv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform vec3 uColorBase;
uniform vec3 uColorTintA;
uniform vec3 uColorTintB;
uniform vec3 uColorAccent;
uniform float uTintStrength;
uniform float uSpotStrength;

void main(){
  vec2 res = uResolution;
  vec2 aspect = res / min(res.x, res.y);
  vec2 p = (vUv - 0.5) * aspect;
  vec2 m = (uMouse - 0.5) * aspect;

  float t = uTime;

  // Ambient: two soft tints with centers OUTSIDE the viewport so only the
  // tail of the gaussian shows — no visible "blob" peak anywhere.
  vec2 a1 = vec2(-2.0, -1.6) + 0.10 * vec2(sin(t*0.13), cos(t*0.17));
  vec2 a2 = vec2( 2.0,  1.6) + 0.10 * vec2(cos(t*0.15), sin(t*0.21));
  float ka = 0.30;
  float wa1 = exp(-dot(p-a1, p-a1) * ka);
  float wa2 = exp(-dot(p-a2, p-a2) * ka);

  vec3 base = uColorBase;
  base = mix(base, uColorTintA, wa1 * uTintStrength);
  base = mix(base, uColorTintB, wa2 * uTintStrength);

  // Mouse-following highlight — the only visible "peak" in the wallpaper.
  float md = dot(p - m, p - m);
  float spot = exp(-md * 0.85);

  vec3 col = mix(base, uColorAccent, spot * uSpotStrength);

  fragColor = vec4(col, 1.0);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) return [0.5, 0.5, 0.5];
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("MeshWallpaper shader error:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function link(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error("MeshWallpaper link error:", gl.getProgramInfoLog(p));
    gl.deleteProgram(p);
    return null;
  }
  return p;
}

export function MeshWallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const canvas: HTMLCanvasElement = canvasEl;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const program = link(gl, vs, fs);
    if (!program) return;
    gl.useProgram(program);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const u = {
      res: gl.getUniformLocation(program, "uResolution"),
      mouse: gl.getUniformLocation(program, "uMouse"),
      time: gl.getUniformLocation(program, "uTime"),
      base: gl.getUniformLocation(program, "uColorBase"),
      tintA: gl.getUniformLocation(program, "uColorTintA"),
      tintB: gl.getUniformLocation(program, "uColorTintB"),
      accent: gl.getUniformLocation(program, "uColorAccent"),
      tintStrength: gl.getUniformLocation(program, "uTintStrength"),
      spotStrength: gl.getUniformLocation(program, "uSpotStrength"),
    };

    const mouseTarget = { x: 0.5, y: 0.5 };
    const mouseSmooth = { x: 0.5, y: 0.5 };

    let colors = readColors();

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      const surface = hexToRgb(cs.getPropertyValue("--color-surface").trim() || "#e6e7e1");
      const surfaceCard = hexToRgb(
        cs.getPropertyValue("--color-surface-card").trim() || "#f4f1ea",
      );
      const primary = hexToRgb(cs.getPropertyValue("--color-primary").trim() || "#0f1d3a");
      const secondary = hexToRgb(
        cs.getPropertyValue("--color-secondary").trim() || "#a3253d",
      );

      const mix = (
        x: [number, number, number],
        y: [number, number, number],
        amt: number,
      ): [number, number, number] => [
        x[0] * (1 - amt) + y[0] * amt,
        x[1] * (1 - amt) + y[1] * amt,
        x[2] * (1 - amt) + y[2] * amt,
      ];

      const isDark = document.documentElement.classList.contains("dark");

      if (isDark) {
        return {
          base: surface,
          tintA: mix(surface, primary, 0.20),
          tintB: mix(surface, secondary, 0.16),
          accent: primary,
          tintStrength: 0.55,
          spotStrength: 0.32,
        };
      }

      // Light: pure white base, very light cursor mark.
      const white: [number, number, number] = [1, 1, 1];
      return {
        base: white,
        tintA: mix(white, primary, 0.04),
        tintB: mix(white, secondary, 0.03),
        accent: primary,
        tintStrength: 0.30,
        spotStrength: 0.16,
      };
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    function resize() {
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }
    resize();

    function setMouseFromClient(cx: number, cy: number) {
      mouseTarget.x = cx / window.innerWidth;
      mouseTarget.y = 1 - cy / window.innerHeight;
    }

    function onMouseMove(e: MouseEvent) {
      setMouseFromClient(e.clientX, e.clientY);
    }
    function onTouch(e: TouchEvent) {
      const t = e.touches[0];
      if (t) setMouseFromClient(t.clientX, t.clientY);
    }
    function onResize() {
      resize();
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    const themeObs = new MutationObserver(() => {
      colors = readColors();
    });
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    function onMotionChange() {
      reducedMotion = motionQuery.matches;
      if (!reducedMotion && !raf && !document.hidden) {
        raf = requestAnimationFrame(render);
      }
    }
    motionQuery.addEventListener("change", onMotionChange);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf = 0;
    const startMs = performance.now();

    function render() {
      raf = 0;
      const t = (performance.now() - startMs) / 1000;

      mouseSmooth.x += (mouseTarget.x - mouseSmooth.x) * 0.06;
      mouseSmooth.y += (mouseTarget.y - mouseSmooth.y) * 0.06;

      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);

      gl!.uniform2f(u.res, canvas.width, canvas.height);
      gl!.uniform2f(u.mouse, mouseSmooth.x, mouseSmooth.y);
      gl!.uniform1f(u.time, t);
      gl!.uniform3f(u.base, colors.base[0], colors.base[1], colors.base[2]);
      gl!.uniform3f(u.tintA, colors.tintA[0], colors.tintA[1], colors.tintA[2]);
      gl!.uniform3f(u.tintB, colors.tintB[0], colors.tintB[1], colors.tintB[2]);
      gl!.uniform3f(u.accent, colors.accent[0], colors.accent[1], colors.accent[2]);
      gl!.uniform1f(u.tintStrength, colors.tintStrength);
      gl!.uniform1f(u.spotStrength, colors.spotStrength);

      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      if (!reducedMotion && !document.hidden) {
        raf = requestAnimationFrame(render);
      }
    }

    function onVisibility() {
      if (!document.hidden && !raf && !reducedMotion) {
        raf = requestAnimationFrame(render);
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    if (reducedMotion) {
      render();
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
      themeObs.disconnect();
      gl!.deleteProgram(program);
      gl!.deleteShader(vs!);
      gl!.deleteShader(fs!);
      if (vao) gl!.deleteVertexArray(vao);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: -1 }}
    />
  );
}
