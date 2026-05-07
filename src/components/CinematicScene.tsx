"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CinematicScene() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mount.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#13091f", 0.075);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 2.2, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight("#fff1f8", 1.1));
    const pinkLight = new THREE.PointLight("#ff8fbd", 26, 12);
    pinkLight.position.set(-3, 4, 4);
    scene.add(pinkLight);
    const goldLight = new THREE.PointLight("#ffd36e", 18, 9);
    goldLight.position.set(2.8, 2.1, 2.2);
    scene.add(goldLight);

    const cake = new THREE.Group();
    const makeLayer = (radiusTop: number, radiusBottom: number, height: number, color: string, y: number) => {
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 96),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.12, roughness: 0.28, metalness: 0.05 })
      );
      mesh.position.y = y;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      cake.add(mesh);
    };
    makeLayer(2.2, 2.45, 0.8, "#ff9ec8", -0.6);
    makeLayer(1.65, 1.85, 0.72, "#fff0f7", -0.08);
    makeLayer(1.02, 1.18, 0.55, "#ffd1b8", 0.46);

    const flames: THREE.Mesh[] = [];
    [-0.55, 0, 0.55].forEach((x) => {
      const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.52, 24), new THREE.MeshStandardMaterial({ color: "#fff6df", emissive: "#ffd36e", emissiveIntensity: 0.4 }));
      candle.position.set(x, 0.96, 0);
      cake.add(candle);
      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 24), new THREE.MeshBasicMaterial({ color: "#ffd36e", transparent: true, opacity: 0.94 }));
      flame.position.set(x, 1.28, 0);
      cake.add(flame);
      flames.push(flame);
      const candleLight = new THREE.PointLight("#ffd36e", 1.1, 3);
      candleLight.position.set(x, 1.35, 0);
      cake.add(candleLight);
    });
    cake.position.set(0, -0.75, 0);
    scene.add(cake);

    const gift = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), new THREE.MeshStandardMaterial({ color: "#c7a5ff", emissive: "#7f55d8", emissiveIntensity: 0.32, roughness: 0.23 }));
    gift.add(box);
    const ribbonMaterial = new THREE.MeshBasicMaterial({ color: "#ffd36e" });
    const ribbonA = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.04, 0.96), ribbonMaterial);
    const ribbonB = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.18, 1.08), ribbonMaterial);
    gift.add(ribbonA, ribbonB);
    gift.position.set(3, -0.45, -1);
    scene.add(gift);

    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i += 1) {
      starPositions[i * 3] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 1] = (Math.random() - 0.2) * 45;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: "#fff6df", size: 0.045, transparent: true, opacity: 0.85 }));
    scene.add(stars);

    const clock = new THREE.Clock();
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      cake.rotation.y = Math.sin(t * 0.35) * 0.18;
      cake.position.y = -0.75 + Math.sin(t * 1.1) * 0.08;
      gift.rotation.set(Math.sin(t * 0.6) * 0.1, t * 0.35, Math.cos(t * 0.4) * 0.08);
      gift.position.y = -0.45 + Math.sin(t * 1.6) * 0.16;
      stars.rotation.y = t * 0.018;
      flames.forEach((flame, index) => {
        const flicker = 1 + Math.sin(t * (16 + index * 2)) * 0.2;
        flame.scale.set(0.8 * flicker, 1.25 * flicker, 0.8 * flicker);
      });
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
      starGeometry.dispose();
    };
  }, []);

  return <div ref={mount} className="pointer-events-none absolute inset-0 z-0 opacity-95" />;
}
