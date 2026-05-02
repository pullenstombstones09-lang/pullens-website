/**
 * Generate a tileable Rustenburg Black granite texture on a canvas.
 * Rustenburg Black: dark black base with fine silver-grey feldspar/quartz crystals.
 * Polished surface is highly reflective with subtle crystalline speckle.
 */
export function generateGraniteTexture(size: number = 512): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#0c0c0c";
  ctx.fillRect(0, 0, size, size);

  const speckleCount = size * size * 0.08;
  for (let i = 0; i < speckleCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 1.5 + 0.3;
    const brightness = Math.floor(Math.random() * 60 + 40);
    ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness + 5})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const clusterCount = size * 0.3;
  for (let i = 0; i < clusterCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 2.5 + 1;
    const brightness = Math.floor(Math.random() * 40 + 70);
    ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness + 8}, 0.6)`;
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

  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < size * 10; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 3 + 1;
    const val = Math.floor(Math.random() * 30 + 15);
    ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}
