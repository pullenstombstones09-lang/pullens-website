/**
 * Generate a tileable Rustenburg Black granite texture on a canvas.
 *
 * Rustenburg Black: dark grey-black base with visible silver-grey
 * feldspar/quartz crystal speckle. When polished, the crystals catch
 * light and the overall tone reads as a dark charcoal with shimmer,
 * NOT pure black.
 */
export function generateGraniteTexture(size: number = 512): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Base: dark charcoal (not pure black — Rustenburg reads darker grey)
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, size, size);

  // Fine grain speckle — the crystalline structure of the granite
  const speckleCount = size * size * 0.12;
  for (let i = 0; i < speckleCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 1.8 + 0.4;
    const brightness = Math.floor(Math.random() * 80 + 60);
    ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness + 5})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Larger crystal clusters — brighter, less frequent
  const clusterCount = size * 0.5;
  for (let i = 0; i < clusterCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 2.5 + 1;
    const brightness = Math.floor(Math.random() * 50 + 90);
    ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness + 8}, 0.5)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Occasional bright crystal fleck
  const fleckCount = size * 0.1;
  for (let i = 0; i < fleckCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 1.5 + 0.5;
    ctx.fillStyle = `rgba(180, 180, 190, 0.3)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}

export function generateRoughnessMap(size: number = 512): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Polished = low roughness but not mirror-smooth
  ctx.fillStyle = "#222222";
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < size * 10; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 3 + 1;
    const val = Math.floor(Math.random() * 30 + 20);
    ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}
