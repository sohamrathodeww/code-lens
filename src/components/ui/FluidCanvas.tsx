"use client";

import React, { useEffect, useRef } from "react";

export const FluidCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Light Liquid Glass luminous pastel fluid colors
    const colors = [
      "rgba(99, 102, 241, 0.22)",
      "rgba(236, 72, 153, 0.18)",
      "rgba(6, 182, 212, 0.20)",
      "rgba(168, 85, 247, 0.18)",
    ];

    const particles = [
      { x: width * 0.25, y: height * 0.25, vx: 0.25, vy: 0.18, radius: 480, color: colors[0] },
      { x: width * 0.75, y: height * 0.45, vx: -0.2, vy: 0.25, radius: 540, color: colors[1] },
      { x: width * 0.45, y: height * 0.8, vx: 0.25, vy: -0.18, radius: 460, color: colors[2] },
      { x: width * 0.85, y: height * 0.2, vx: -0.18, vy: -0.18, radius: 400, color: colors[3] },
    ];

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Render ultra-subtle liquid curved contour rings
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";

      ctx.beginPath();
      ctx.arc(width * 0.2, height * 0.35, 420, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width * 0.8, height * 0.65, 520, 0, Math.PI * 2);
      ctx.stroke();

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -200 || p.x > width + 200) p.vx *= -1;
        if (p.y < -200 || p.y > height + 200) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 500) {
          p.x += (dx / dist) * 0.3;
          p.y += (dy / dist) * 0.3;
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-100 transition-opacity duration-700"
    />
  );
};

