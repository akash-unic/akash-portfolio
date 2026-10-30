"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";

// Check if user prefers reduced motion
const subscribeMotionPreference = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getServerSnapshot = () => false;

export const UniverseCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeMotionPreference,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;

    // 1. Scene & Camera Setup - Low fog density so cosmic structures stay crisp & visible
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060c, 0.006);

    const camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // 2. High-Performance WebGL Renderer - Native DPR and Antialias on all devices
    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: true,
      stencil: false,
      depth: true,
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "-40";
    container.appendChild(renderer.domElement);

    // 3. Volumetric Stardust & Cosmic Particle Universe
    const particleCount = isMobile ? 900 : 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x6366f1), // Soft Indigo
      new THREE.Color(0x38bdf8), // Cyan Light
      new THREE.Color(0x818cf8), // Lavender
      new THREE.Color(0x475569), // Slate Stardust (creates natural depth)
      new THREE.Color(0xe0e7ff), // Soft Starlight
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const z = -140 + Math.random() * 180;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = z;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom circular soft glow texture for points
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      grad.addColorStop(0.3, "rgba(180, 200, 255, 0.5)");
      grad.addColorStop(0.7, "rgba(99, 102, 241, 0.2)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    const particleTexture = createParticleTexture();

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 1.9 : 1.9,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: isMobile ? 0.42 : 0.38,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 4. Central Dimensional Energy Portal (Opening Scene - Offset to frame content)
    const portalGroup = new THREE.Group();
    // Offset slightly to the right on desktop to align with the right-hand stage
    portalGroup.position.set(isMobile ? 0 : 3.2, 0, isMobile ? -2 : -4);

    // Outer Torus Energy Ring
    const outerRingGeo = new THREE.TorusGeometry(5.4, 0.05, 16, 120);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    portalGroup.add(outerRing);

    // Middle Concentric Ring with cyan glow
    const innerRingGeo = new THREE.TorusGeometry(3.8, 0.04, 16, 100);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    portalGroup.add(innerRing);

    // Third Gyro Ring
    const gyroRingGeo = new THREE.TorusGeometry(2.5, 0.03, 16, 80);
    const gyroRingMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.40,
      blending: THREE.AdditiveBlending,
    });
    const gyroRing = new THREE.Mesh(gyroRingGeo, gyroRingMat);
    portalGroup.add(gyroRing);

    // Central Floating Crystalline Polyhedron (Icosahedron Core)
    const coreIcosaGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const coreIcosaWireMat = new THREE.MeshBasicMaterial({
      color: 0xc7d2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const coreIcosaMesh = new THREE.Mesh(coreIcosaGeo, coreIcosaWireMat);
    portalGroup.add(coreIcosaMesh);

    // Inner faceted energy core
    const coreInnerGeo = new THREE.OctahedronGeometry(0.9, 0);
    const coreInnerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const coreInnerMesh = new THREE.Mesh(coreInnerGeo, coreInnerMat);
    portalGroup.add(coreInnerMesh);

    // 5. Volumetric Light Tunnel (Warp Tunnel along Z-axis)
    const tunnelGeo = new THREE.CylinderGeometry(1.8, 7.5, 32, 32, 1, true);
    tunnelGeo.rotateX(Math.PI / 2);
    const tunnelMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.10,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const tunnelMesh = new THREE.Mesh(tunnelGeo, tunnelMat);
    tunnelMesh.position.set(0, 0, -16);
    portalGroup.add(tunnelMesh);

    scene.add(portalGroup);

    // 6. Floating Spatial Geometric Shards (Spread along the scroll path)
    const shardGroup = new THREE.Group();
    const shardCount = isMobile ? 8 : 12;
    const shardMeshes: THREE.Mesh[] = [];

    const shardGeometries = [
      new THREE.OctahedronGeometry(0.8, 0),
      new THREE.TetrahedronGeometry(0.9, 0),
      new THREE.IcosahedronGeometry(0.7, 0),
    ];

    for (let i = 0; i < shardCount; i++) {
      const geo = shardGeometries[i % shardGeometries.length];
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x6366f1 : 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: isMobile ? 0.28 : 0.18,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const side = i % 2 === 0 ? 1 : -1;
      mesh.position.set(
        side * (isMobile ? (2.6 + Math.random() * 2.2) : (5.5 + Math.random() * 6)),
        (Math.random() - 0.5) * 8,
        -15 - i * 10
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      shardGroup.add(mesh);
      shardMeshes.push(mesh);
    }
    scene.add(shardGroup);

    // 7. Connected 3D Constellation (For Skills & Capabilities dimension)
    const constellationGroup = new THREE.Group();
    const nodeCount = 9;
    const constellationPoints: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = isMobile ? (2.2 + (i % 2) * 0.8) : (4.2 + (i % 2) * 1.5);
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.8;
      const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.8;
      const z = -60 + (Math.random() - 0.5) * 3;
      const v = new THREE.Vector3(x, y, z);
      constellationPoints.push(v);

      const nodeGeo = new THREE.SphereGeometry(0.18, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: i === 4 ? 0xc7d2fe : 0x818cf8,
        transparent: true,
        opacity: 0.50,
        blending: THREE.AdditiveBlending,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(v);
      constellationGroup.add(nodeMesh);
    }

    const lineIndices: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (constellationPoints[i].distanceTo(constellationPoints[j]) < 5.2) {
          lineIndices.push(i, j);
        }
      }
    }

    const linePositions = new Float32Array(lineIndices.length * 3);
    for (let i = 0; i < lineIndices.length; i++) {
      const pt = constellationPoints[lineIndices[i]];
      linePositions[i * 3] = pt.x;
      linePositions[i * 3 + 1] = pt.y;
      linePositions[i * 3 + 2] = pt.z;
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const constellationLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    constellationGroup.add(constellationLines);

    scene.add(constellationGroup);

    // 8. Dynamic Camera & Scroll Path Choreography
    let targetCameraZ = 18;
    let targetCameraX = 0;
    let targetCameraY = 0;
    let targetLookAtY = 0;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      const currentScrollY = window.scrollY;
      scrollVelocity = Math.min(Math.abs(currentScrollY - lastScrollY) * 0.08, 4.0);
      lastScrollY = currentScrollY;

      // Camera coordinates mapped to the 6 cinematic acts:
      // Act 1 (0.00 - 0.15): Awakening / Hero (z: 18 -> 10)
      // Act 2 (0.15 - 0.35): The Developer (z: 10 -> -8)
      // Act 3 (0.35 - 0.55): Skill Constellation (z: -8 -> -45)
      // Act 4 (0.55 - 0.78): Project Gallery (z: -45 -> -85)
      // Act 5 (0.78 - 0.90): Cadet Rigor (z: -85 -> -110)
      // Act 6 (0.90 - 1.00): The Final Connection (z: -110 -> -130)

      targetCameraZ = 18 - progress * 148;
      targetCameraX = Math.sin(progress * Math.PI * 3) * 2.8;
      targetCameraY = Math.cos(progress * Math.PI * 2) * 1.4;
      targetLookAtY = -Math.sin(progress * Math.PI * 2) * 0.8;
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };

    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const clampedGamma = Math.max(-45, Math.min(45, e.gamma));
        const clampedBeta = Math.max(15, Math.min(75, e.beta));
        targetMouseX = (clampedGamma / 45) * 1.0;
        targetMouseY = ((clampedBeta - 45) / 30) * 1.0;
      }
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });

    let isVisible = true;
    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible && !animFrameId) {
        lastTime = performance.now();
        animFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    onScroll();

    // 9. Animation & Render Loop
    let animFrameId: number | null = null;
    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) {
        animFrameId = null;
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      camera.position.z += (targetCameraZ - camera.position.z) * 0.06;
      camera.position.x += (targetCameraX + mouseX * 1.4 - camera.position.x) * 0.06;
      camera.position.y += (targetCameraY - mouseY * 1.2 - camera.position.y) * 0.06;

      camera.lookAt(
        camera.position.x * 0.35,
        targetLookAtY,
        camera.position.z - 25
      );

      camera.rotation.z = -mouseX * 0.025;

      // Animate Portal
      outerRing.rotation.z += dt * 0.3;
      outerRing.rotation.x = Math.sin(time * 0.001) * 0.2;

      innerRing.rotation.y += dt * 0.45;
      innerRing.rotation.z -= dt * 0.22;

      gyroRing.rotation.x += dt * 0.55;
      gyroRing.rotation.y += dt * 0.35;

      coreIcosaMesh.rotation.x += dt * 0.7;
      coreIcosaMesh.rotation.y += dt * 0.9;
      coreInnerMesh.rotation.y -= dt * 1.1;

      tunnelMesh.rotation.z += dt * 0.15;

      const pulse = 1 + Math.sin(time * 0.003) * 0.08;
      portalGroup.scale.set(pulse, pulse, pulse);

      // Animate Floating Shards
      for (let i = 0; i < shardMeshes.length; i++) {
        const shard = shardMeshes[i];
        shard.rotation.x += dt * (0.35 + (i % 3) * 0.15);
        shard.rotation.y += dt * (0.25 + (i % 2) * 0.2);
      }

      // Animate Constellation
      constellationGroup.rotation.z = Math.sin(time * 0.0006) * 0.2;
      constellationGroup.rotation.y = Math.cos(time * 0.0008) * 0.15;

      // Stardust drift & Hyperdrive warp
      scrollVelocity *= 0.92;
      particleSystem.rotation.z += dt * 0.02;

      const posArray = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 2] += (0.8 + scrollVelocity * 5.0) * dt;

        if (posArray[i * 3 + 2] > camera.position.z + 10) {
          posArray[i * 3 + 2] = camera.position.z - 150;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      if (particleTexture) particleTexture.dispose();

      outerRingGeo.dispose();
      outerRingMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      gyroRingGeo.dispose();
      gyroRingMat.dispose();
      coreIcosaGeo.dispose();
      coreIcosaWireMat.dispose();
      coreInnerGeo.dispose();
      coreInnerMat.dispose();
      tunnelGeo.dispose();
      tunnelMat.dispose();

      shardGeometries.forEach((g) => g.dispose());
      shardMeshes.forEach((m) => (m.material as THREE.Material).dispose());

      lineGeometry.dispose();
      lineMaterial.dispose();

      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-40 select-none overflow-hidden"
      aria-hidden="true"
    />
  );
};