import { useEffect } from 'react';

type Palette = {
  accent: string;
  accent2: string;
  foreground: string;
  background: string;
};

const fallbackPalette: Palette = {
  accent: '#3effb8',
  accent2: '#ffccb3',
  foreground: '#e9ece7',
  background: '#050505',
};

const clamp = (v: number, min = 0, max = 255) => Math.max(min, Math.min(max, v));

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return [h * 360, s, l] as const;
};

const hslToRgb = (h: number, s: number, l: number) => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
};

const rgbString = (r: number, g: number, b: number) => `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;

const buildPalette = (r: number, g: number, b: number): Palette => {
  const [h, s, l] = rgbToHsl(r, g, b);
  const accent = rgbString(r, g, b);
  const [a2r, a2g, a2b] = hslToRgb((h + 32) % 360, Math.min(1, s * 0.8), Math.min(0.72, l + 0.12));
  const [bgR, bgG, bgB] = hslToRgb(h, Math.min(0.4, s * 0.6), Math.max(0.08, l * 0.35));
  return {
    accent,
    accent2: rgbString(a2r, a2g, a2b),
    foreground: 'rgb(233, 236, 231)',
    background: rgbString(bgR, bgG, bgB),
  };
};

const sampleImage = (src?: string): Promise<Palette> =>
  new Promise((resolve, reject) => {
    if (!src) return reject(new Error('No source'));
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('No context'));
      const width = 40;
      const height = 40;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height).data;
      let r = 0;
      let g = 0;
      let b = 0;
      const total = width * height;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      r /= total;
      g /= total;
      b /= total;
      resolve(buildPalette(r, g, b));
    };
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = src;
  });

const applyPalette = (palette: Palette) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--accent', palette.accent);
  root.style.setProperty('--accent-2', palette.accent2);
  root.style.setProperty('--foreground', palette.foreground);
  root.style.setProperty('--background', palette.background);
};

export const useDynamicTheme = (imageSrc?: string) => {
  useEffect(() => {
    let mounted = true;
    const update = async () => {
      try {
        const palette = await sampleImage(imageSrc);
        if (mounted && palette) applyPalette(palette);
      } catch {
        if (mounted) applyPalette(fallbackPalette);
      }
    };
    update();
    return () => {
      mounted = false;
      applyPalette(fallbackPalette);
    };
  }, [imageSrc]);
};

export default useDynamicTheme;
