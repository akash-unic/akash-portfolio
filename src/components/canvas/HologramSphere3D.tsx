"use client";

import React, { useEffect, useRef, useState } from "react";
import { Compass, ShieldCheck } from "lucide-react";

interface TechNode {
  id: string;
  name: string;
  category: string;
  role: string;
  color: string;
  glow: string;
  // 3D Spherical coordinates
  theta: number; // Azimuth angle [0, 2pi]
  phi: number;   // Polar angle [-pi/2, pi/2]
  radius: number;
}

const TECH_NODES: TechNode[] = [
  {
    id: "nextjs",
    name: "Next.js",
    category: "Framework",
    role: "Fullstack Architecture & App Router",
    color: "#ffffff",
    glow: "rgba(255, 255, 255, 0.8)",
    theta: 0,
    phi: 0.2,
    radius: 130,
  },
  {
    id: "react",
    name: "React",
    category: "UI Engine",
    role: "Component Trees & Dynamic State",
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.8)",
    theta: (Math.PI * 2) / 7,
    phi: -0.3,
    radius: 130,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Styling",
    role: "Design Systems & Fluid Responsiveness",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.8)",
    theta: ((Math.PI * 2) / 7) * 2,
    phi: 0.45,
    radius: 130,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    role: "Document Schemas & Data Pipelines",
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.8)",
    theta: ((Math.PI * 2) / 7) * 3,
    phi: -0.4,
    radius: 130,
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Logic",
    role: "DOM Engine & Async Workflows",
    color: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.8)",
    theta: ((Math.PI * 2) / 7) * 4,
    phi: 0.3,
    radius: 130,
  },
  {
    id: "htmlcss",
    name: "HTML5 / CSS3",
    category: "Foundations",
    role: "Semantic Web & 3D CSS Layouts",
    color: "#f97316",
    glow: "rgba(249, 115, 22, 0.8)",
    theta: ((Math.PI * 2) / 7) * 5,
    phi: -0.25,
    radius: 130,
  },
  {
    id: "wordpress",
    name: "WordPress",
    category: "CMS",
    role: "Theme Architecture & Content Engines",
    color: "#60a5fa",
    glow: "rgba(96, 165, 250, 0.8)",
    theta: ((Math.PI * 2) / 7) * 6,
    phi: 0.1,
    radius: 130,
  },
];

export const HologramSphere3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeNode, setActiveNode] = useState<TechNode>(TECH_NODES[0]);
  const [isInteracting, setIsInteracting] = useState(false);

  // Rotation angles
  const rotX = useRef(0.2);
  const rotY = useRef(0.4);
  const velX = useRef(0);
  const velY = useRef(0.003); // gentle auto spin

  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const fov = 340;
    const sphereRadius = Math.min(width, height) * 0.32;

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", onResize, { passive: true });

    // Latitude & longitude ring lines for holographic sphere wireframe
    const rings = 6;
    const ringSegments = 24;

    const render = () => {
      // Apply momentum or auto spin
      if (!isDragging.current) {
        velX.current *= 0.94;
        velY.current = velY.current * 0.94 + 0.0025; // return to slow gentle spin
        rotX.current += velX.current;
        rotY.current += velY.current;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. Draw Central Holographic Core Glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sphereRadius * 0.9);
      coreGrad.addColorStop(0, "rgba(99, 102, 241, 0.22)");
      coreGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.08)");
      coreGrad.addColorStop(1, "rgba(10, 13, 20, 0)");

      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // 2. Draw 3D Latitude Rings
      ctx.lineWidth = 1;
      for (let r = 1; r < rings; r++) {
        const phi = ((r / rings) - 0.5) * Math.PI;
        const ringRad = Math.cos(phi) * sphereRadius;
        const ringY = Math.sin(phi) * sphereRadius;

        ctx.beginPath();
        for (let s = 0; s <= ringSegments; s++) {
          const theta = (s / ringSegments) * Math.PI * 2;
          const x0 = Math.cos(theta) * ringRad;
          const z0 = Math.sin(theta) * ringRad;
          const y0 = ringY;

          // Rotate around X then Y
          const cosX = Math.cos(rotX.current);
          const sinX = Math.sin(rotX.current);
          const cosY = Math.cos(rotY.current);
          const sinY = Math.sin(rotY.current);

          const y1 = y0 * cosX - z0 * sinX;
          const z1 = y0 * sinX + z0 * cosX;

          const x2 = x0 * cosY + z1 * sinY;
          const z2 = -x0 * sinY + z1 * cosY;

          const scale = fov / (fov + z2 + 200);
          const sx = cx + x2 * scale;
          const sy = cy + y1 * scale;

          if (s === 0) {
            ctx.moveTo(sx, sy);
          } else {
            ctx.lineTo(sx, sy);
          }
        }
        ctx.strokeStyle = "rgba(99, 102, 241, 0.12)";
        ctx.stroke();
      }

      // 3. Draw Tech Nodes with 3D sorting and interactive tags
      const projectedNodes: {
        node: TechNode;
        sx: number;
        sy: number;
        sz: number;
        scale: number;
      }[] = [];

      for (let i = 0; i < TECH_NODES.length; i++) {
        const node = TECH_NODES[i];

        // 3D spherical position
        const x0 = Math.cos(node.theta) * Math.cos(node.phi) * sphereRadius * 1.15;
        const y0 = Math.sin(node.phi) * sphereRadius * 1.15;
        const z0 = Math.sin(node.theta) * Math.cos(node.phi) * sphereRadius * 1.15;

        // Apply rotation
        const cosX = Math.cos(rotX.current);
        const sinX = Math.sin(rotX.current);
        const cosY = Math.cos(rotY.current);
        const sinY = Math.sin(rotY.current);

        const y1 = y0 * cosX - z0 * sinX;
        const z1 = y0 * sinX + z0 * cosX;

        const x2 = x0 * cosY + z1 * sinY;
        const z2 = -x0 * sinY + z1 * cosY;

        const scale = fov / (fov + z2 + 200);
        const sx = cx + x2 * scale;
        const sy = cy + y1 * scale;

        projectedNodes.push({ node, sx, sy, sz: z2, scale });
      }

      // Sort by depth (back to front)
      projectedNodes.sort((a, b) => a.sz - b.sz);

      // Connect nodes to center with radial laser cords
      for (let i = 0; i < projectedNodes.length; i++) {
        const p = projectedNodes[i];
        const isFocused = p.node.id === activeNode.id;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.sx, p.sy);
        ctx.strokeStyle = isFocused
          ? "rgba(129, 140, 248, 0.6)"
          : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = isFocused ? 1.5 : 0.75;
        ctx.stroke();

        // Node circle
        const nodeRadius = Math.max(3.5, 6 * p.scale);

        // Halo
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, nodeRadius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = isFocused ? p.node.glow : "rgba(99, 102, 241, 0.15)";
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.node.color;
        ctx.fill();

        // Node Label (rendered when in front half of sphere)
        if (p.sz > -80) {
          ctx.font = `bold ${Math.max(10, Math.round(11 * p.scale))}px monospace`;
          ctx.textAlign = "center";
          ctx.fillStyle = isFocused ? "#ffffff" : "rgba(226, 232, 240, 0.85)";
          ctx.fillText(p.node.name, p.sx, p.sy + nodeRadius + 14);
        }
      }

      if (isVisible) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && animId === null) {
          animId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    animId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [activeNode]);

  // Pointer drag controls for true 3D rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setIsInteracting(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;

    rotY.current += dx * 0.007;
    rotX.current -= dy * 0.007;

    velY.current = dx * 0.007;
    velX.current = -dy * 0.007;

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    setIsInteracting(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[420px] mx-auto rounded-3xl border border-white/[0.12] bg-gradient-to-b from-[#131926]/90 via-[#0e1422]/95 to-[#0a0d14] shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-xl group"
    >
      {/* Specular Bevel Reflection */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent"
        aria-hidden="true"
      />

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between px-3 py-2 rounded-xl bg-[#0a0d14]/80 border border-white/[0.08] backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-white uppercase">
            3D Tech Matrix
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-indigo-300">
          <Compass className="w-3 h-3 text-indigo-400" />
          <span>{isInteracting ? "Rotating Orbit" : "Drag to Rotate"}</span>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y select-none"
        title="Interactive 3D Technology Sphere - Drag horizontally to rotate"
      />

      {/* Interactive Node Selector Pills at Bottom */}
      <div className="absolute bottom-3 inset-x-3 z-20 flex flex-col gap-2">
        {/* Active Node Detail Card */}
        <div className="p-3 rounded-xl bg-[#0a0d14]/90 border border-indigo-500/30 backdrop-blur-md transition-all duration-200">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activeNode.color }}
              />
              <span className="text-xs font-bold text-white tracking-tight">
                {activeNode.name}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
                {activeNode.category}
              </span>
            </div>

            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Verified
            </span>
          </div>

          <p className="text-[11px] font-mono text-zinc-300 line-clamp-1">
            {activeNode.role}
          </p>
        </div>

        {/* Quick Tech Switcher Row */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-0.5 scrollbar-none">
          {TECH_NODES.map((node) => {
            const isActive = node.id === activeNode.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node)}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-medium transition-all shrink-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-950"
                    : "bg-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.1]"
                }`}
              >
                {node.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};