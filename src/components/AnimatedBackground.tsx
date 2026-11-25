import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

interface FloatingTechSymbol {
  x: number;
  y: number;
  vy: number;
  vx: number;
  text: string;
  size: number;
  alpha: number;
  rotation: number;
  vRot: number;
}

interface GeometricShape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  vRot: number;
  vy: number;
  vx: number;
  sides: number;
  alpha: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Unified vibrant indigo theme colors
    const primaryIndigo = '129, 140, 248'; // Indigo 400
    const accentIndigo = '99, 102, 241';   // Indigo 500
    const brightIndigo = '199, 210, 254';  // Indigo 200

    // 1. Particle Constellation Nodes
    const particleCount = Math.min(Math.floor((width * height) / 12000), 90);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseRadius = Math.random() * 2.5 + 1.5;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: baseRadius,
        baseRadius: baseRadius,
        alpha: Math.random() * 0.4 + 0.5, // 0.5 - 0.9 bright
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // 2. Floating Developer Symbols & Tech Glyphs
    const symbolsList = ['{ }', '</>', 'const', '0101', '=>', 'async', 'git', 'API', 'npm', 'div', 'λ', '||', '&&', '==='];
    const floatingSymbols: FloatingTechSymbol[] = [];
    const symbolCount = Math.min(Math.floor(width / 110), 18);

    for (let i = 0; i < symbolCount; i++) {
      floatingSymbols.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -(Math.random() * 0.45 + 0.25),
        vx: (Math.random() - 0.5) * 0.35,
        text: symbolsList[Math.floor(Math.random() * symbolsList.length)],
        size: Math.floor(Math.random() * 6) + 14,
        alpha: Math.random() * 0.35 + 0.25, // Visible opacity
        rotation: (Math.random() - 0.5) * 0.3,
        vRot: (Math.random() - 0.5) * 0.006
      });
    }

    // 3. Floating Geometric Shapes (Hexagons & Diamonds)
    const shapes: GeometricShape[] = [];
    const shapeCount = Math.min(Math.floor(width / 140), 12);

    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 32 + 20,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.015,
        vy: -(Math.random() * 0.4 + 0.2),
        vx: (Math.random() - 0.5) * 0.3,
        sides: Math.random() > 0.4 ? 6 : 4,
        alpha: Math.random() * 0.3 + 0.2
      });
    }

    // 4. Shooting Star Meteors System
    const shootingStars: ShootingStar[] = [];
    const createShootingStar = () => {
      if (shootingStars.length < 3 && Math.random() < 0.04) {
        shootingStars.push({
          x: Math.random() * width * 1.3,
          y: Math.random() * (height * 0.5),
          length: Math.random() * 120 + 70,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
          opacity: 1,
          active: true
        });
      }
    };

    // 5. Interactive Energy Ripples
    const ripples: Ripple[] = [];

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY });

      if (Math.random() < 0.08 && ripples.length < 8) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 10,
          maxRadius: 140,
          alpha: 0.6
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 15,
        maxRadius: 240,
        alpha: 0.9
      });
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      setMousePos({ x: -500, y: -500 });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const drawPolygon = (x: number, y: number, radius: number, sides: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      for (let i = 0; i < sides; i++) {
        const a = (i * 2 * Math.PI) / sides;
        const px = radius * Math.cos(a);
        const py = radius * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${primaryIndigo}, ${alpha})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Glowing center node
      ctx.beginPath();
      ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${brightIndigo}, ${alpha * 1.6})`;
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // --- 1. Flowing Fluid Waves ---
      const waveCount = 2;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const baseHeight = height * (0.4 + w * 0.3);
        const waveSpeed = 0.01 + w * 0.005;
        const waveFreq = 0.002 + w * 0.001;
        const waveAmp = 50 + w * 30;

        ctx.moveTo(0, height);
        ctx.lineTo(0, baseHeight);

        for (let x = 0; x <= width; x += 20) {
          const y = baseHeight + Math.sin(x * waveFreq + time * waveSpeed) * waveAmp + Math.cos(x * 0.001 + time * 0.006) * 25;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseHeight - waveAmp, 0, height);
        grad.addColorStop(0, `rgba(${accentIndigo}, ${0.08 + w * 0.04})`);
        grad.addColorStop(0.6, `rgba(${primaryIndigo}, ${0.04 + w * 0.02})`);
        grad.addColorStop(1, 'rgba(7, 10, 18, 0)');

        ctx.fillStyle = grad;
        ctx.fill();
      }

      // --- 2. Floating Geometric Polygons ---
      shapes.forEach((s) => {
        s.y += s.vy;
        s.x += s.vx;
        s.rotation += s.vRot;

        if (s.y < -50) s.y = height + 50;
        if (s.x < -50) s.x = width + 50;
        if (s.x > width + 50) s.x = -50;

        drawPolygon(s.x, s.y, s.size, s.sides, s.rotation, s.alpha);
      });

      // --- 3. Floating Developer Symbols ---
      ctx.font = 'bold 15px "JetBrains Mono", monospace, monospace';
      floatingSymbols.forEach((sym) => {
        sym.y += sym.vy;
        sym.x += sym.vx;
        sym.rotation += sym.vRot;

        if (sym.y < -40) {
          sym.y = height + 40;
          sym.x = Math.random() * width;
        }
        if (sym.x < -40) sym.x = width + 40;
        if (sym.x > width + 40) sym.x = -40;

        ctx.save();
        ctx.translate(sym.x, sym.y);
        ctx.rotate(sym.rotation);
        ctx.fillStyle = `rgba(${primaryIndigo}, ${sym.alpha})`;
        ctx.fillText(sym.text, 0, 0);
        ctx.restore();
      });

      // --- 4. Interactive Expanding Ripples ---
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += 3.2;
        rip.alpha *= 0.95;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${brightIndigo}, ${rip.alpha})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        if (rip.alpha <= 0.02 || rip.radius >= rip.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // --- 5. Constellation Connecting Lines ---
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.42;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${primaryIndigo}, ${lineAlpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      // --- 6. Glowing Particle Nodes ---
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const factor = (mouse.radius - distance) / mouse.radius;
          p.radius = p.baseRadius + factor * 3.8;
          p.x -= (dx / distance) * factor * 1.8;
          p.y -= (dy / distance) * factor * 1.8;
        } else if (p.radius > p.baseRadius) {
          p.radius -= 0.06;
        }

        const currentAlpha = p.alpha + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.22;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.8, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${brightIndigo}, ${Math.max(0.2, currentAlpha)})`;
        ctx.shadowBlur = 14;
        ctx.shadowColor = `rgba(${primaryIndigo}, 0.95)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // --- 7. Shooting Star Streaks ---
      createShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        if (!star.active) continue;

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        gradient.addColorStop(0, `rgba(${primaryIndigo}, 0)`);
        gradient.addColorStop(0.7, `rgba(${primaryIndigo}, ${star.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(255, 255, 255, 1)';
        ctx.fill();
        ctx.shadowBlur = 0;

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.014;

        if (star.opacity <= 0 || star.x > width + 150 || star.y > height + 150) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#070a12]">
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="absolute w-[650px] h-[650px] rounded-full blur-[130px] opacity-60 transition-all duration-200 pointer-events-none"
        style={{
          left: `${mousePos.x - 325}px`,
          top: `${mousePos.y - 325}px`,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(79, 70, 229, 0.15) 50%, transparent 70%)'
        }}
      />

      {/* Floating Animated 3D Nebula Orbs with CSS Keyframe Motions */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-indigo-600/30 rounded-full blur-[130px] animate-float-orb-1" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-indigo-500/25 rounded-full blur-[130px] animate-float-orb-2" />
      <div className="absolute -bottom-36 left-1/4 w-[700px] h-[700px] bg-indigo-700/25 rounded-full blur-[140px] animate-float-orb-3" />

      {/* Animated Moving Cyber Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.05] animate-cyber-grid"
        style={{
          backgroundImage: `linear-gradient(to right, #818cf8 1px, transparent 1px), linear-gradient(to bottom, #818cf8 1px, transparent 1px)`,
          backgroundSize: '45px 45px'
        }}
      />

      {/* Primary HTML5 Interactive Animation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
