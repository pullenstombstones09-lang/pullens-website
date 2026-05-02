import * as THREE from "three";
import type { HeadstoneProfile, Point2D } from "./types";

function pointsToShape(points: Point2D[]): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i].x, points[i].y);
  }
  shape.closePath();
  return shape;
}

function pointsToPath(points: Point2D[]): THREE.Path {
  const path = new THREE.Path();
  path.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    path.lineTo(points[i].x, points[i].y);
  }
  path.closePath();
  return path;
}

export function buildHeadstoneGeometry(profile: HeadstoneProfile): THREE.ExtrudeGeometry {
  const shape = pointsToShape(profile.outline);

  for (const cutout of profile.cutouts) {
    shape.holes.push(pointsToPath(cutout));
  }

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: profile.depth_mm,
    bevelEnabled: true,
    bevelThickness: 3,
    bevelSize: 2,
    bevelSegments: 3,
  });

  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const centerX = (box.max.x + box.min.x) / 2;
  geometry.translate(-centerX, 0, -profile.depth_mm / 2);

  return geometry;
}
