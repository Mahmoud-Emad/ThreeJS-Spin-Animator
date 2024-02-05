import * as ThreeJS from "three";

export type AnimatorConfig = {
  cameraConfig: CameraConfig;
  lightConfig: LightConfig;
};

export type LightConfig = {
  color?: ThreeJS.ColorRepresentation | undefined;
  intensity?: number | undefined;
  distance?: number | undefined;
  decay?: number | undefined;
};

export type CameraConfig = {
  fov?: number | undefined;
  aspect?: number | undefined;
  near?: number | undefined;
  far?: number | undefined;
};

export type ScreenSize = {
  width: number;
  height: number;
};

export interface AnimatorObjects {
  sphere: ThreeJS.Mesh<
    ThreeJS.SphereGeometry,
    ThreeJS.MeshStandardMaterial,
    ThreeJS.Object3DEventMap
  >;
  camera: ThreeJS.PerspectiveCamera;
  renderer: ThreeJS.WebGL1Renderer;
  canvas: HTMLCanvasElement;
  controls: any;
}
