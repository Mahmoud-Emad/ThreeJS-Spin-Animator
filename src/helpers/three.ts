import gsap from "gsap";
import {
  LightConfig,
  CameraConfig,
  AnimatorConfig,
  ScreenSize,
  AnimatorObjects,
} from "../types";
import * as ThreeJS from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class ThreeJSAnimator {
  // scene
  private scene = new ThreeJS.Scene();

  private defineSphere() {
    const geometry = new ThreeJS.SphereGeometry(3, 64, 64);
    const matrial = new ThreeJS.MeshStandardMaterial({
      color: "#00ff83",
      roughness: 0.5
    });

    const mesh = new ThreeJS.Mesh(geometry, matrial);
    return mesh;
  }

  private defineCamera(config: CameraConfig) {
    // camera
    const camera = new ThreeJS.PerspectiveCamera(
      config.fov,
      config.aspect,
      config.near,
      config.far
    );
    camera.position.z = 20;
    return camera;
  }

  private defineLight(config: LightConfig) {
    const light = new ThreeJS.PointLight(
      config.color,
      config.intensity,
      config.distance
    );
    light.position.set(0, 10, 10);
    light.intensity = 125
    return light;
  }

  private defineRenderer() {
    const canvas = document.querySelector(".webgl") as HTMLCanvasElement;
    const renderer = new ThreeJS.WebGL1Renderer({ canvas });
    return { canvas, renderer };
  }

  private defineControls(
    camera: ThreeJS.PerspectiveCamera,
    canvas: HTMLCanvasElement
  ) {
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
    return controls;
  }

  private define(config: AnimatorConfig): AnimatorObjects {
    const sphere = this.defineSphere();
    const camera = this.defineCamera(config.cameraConfig);
    const light = this.defineLight(config.lightConfig);
    const render = this.defineRenderer();
    const controls = this.defineControls(camera, render.canvas);

    this.scene.add(sphere);
    this.scene.add(camera);
    this.scene.add(light);
    return {
      sphere,
      camera,
      renderer: render.renderer,
      canvas: render.canvas,
      controls,
    };
  }

  private updateTimeline(objects: AnimatorObjects) {
    // Timeline
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo(objects.sphere.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
    tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
    tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });
  }

  private onSizeChange(sizes: ScreenSize, objects: AnimatorObjects) {
    window.addEventListener("resize", () => {
      sizes.height = window.innerHeight;
      sizes.width = window.innerWidth;

      objects.camera.aspect = sizes.width / sizes.height;
      objects.camera.updateProjectionMatrix();
      objects.renderer.setSize(sizes.width, sizes.height);
    });

    const loop = () => {
      objects.controls.update();
      objects.renderer.render(this.scene, objects.camera);
      window.requestAnimationFrame(loop);
    };
    loop();
  }

  private onMouseEvent(objects: AnimatorObjects, screenSize: ScreenSize) {
    let isMouseDown = false;
    let rgp = [];

    window.addEventListener("mousedown", () => (isMouseDown = true));
    window.addEventListener("mouseup", () => (isMouseDown = false));

    window.addEventListener("mousemove", (e) => {
      if (isMouseDown) {
        rgp = [
          Math.round((e.pageX / screenSize.width) * 255),
          Math.round((e.pageY / screenSize.height) * 255),
          150,
        ];
        let newColor = new ThreeJS.Color(`rgb(${rgp.join(",")})`);
        gsap.to(objects.sphere.material.color, {
          r: newColor.r,
          g: newColor.g,
          b: newColor.b,
        });
      }
    });
  }

  render() {
    // render
    const screenSize: ScreenSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const cameraConfig: CameraConfig = {
      fov: 45,
      aspect: screenSize.width / screenSize.height,
      near: 0.1,
      far: 100,
    };

    const lightConfig: LightConfig = {
      color: 0xffffff,
      intensity: 100,
      distance: 100,
    };

    const config: AnimatorConfig = { cameraConfig, lightConfig };
    const objects: AnimatorObjects = this.define(config);

    objects.renderer.setSize(screenSize.width, screenSize.height);
    objects.renderer.setPixelRatio(2);
    objects.renderer.render(this.scene, objects.camera);
    this.updateTimeline(objects);
    this.onMouseEvent(objects, screenSize);
    this.onSizeChange(screenSize, objects);
  }
}
