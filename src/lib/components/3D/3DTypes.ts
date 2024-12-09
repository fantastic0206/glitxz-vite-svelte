import type { BufferGeometry, Color, Material, NormalBufferAttributes, Vector3 } from "three";
import type { Nodes } from "threlte-spline/dist/fetched-types";

export type GlbProperties = {
  nodes: GlbCurves;
  materials: any;
};

export type GlbCurves = {
  [curvename in Nodes]: CurveProperties
}

export type CurveProperties = {
  geometry: BufferGeometry<NormalBufferAttributes>
  material: Material
}

export type Star = {
  len: number,
  pos: Vector3,
  speed: number,
  color: Color  
}