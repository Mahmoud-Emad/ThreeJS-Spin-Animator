# ThreeJS Spin Animator

This repository contains a TypeScript class for creating a simple Three.js scene with an animated sphere and interactive features. The code is designed to be a starting point for creating interactive 3D experiences using Three.js.

## Getting Started

### Prerequisites

- Node.js and npm are installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Usage

1. Build the TypeScript code:

   ```bash
   npm run build
   ```

2. Open the `index.html` file in a web browser to view the Three.js scene.

## Features

- **Animated Sphere:** A sphere is rendered using Three.js with a basic animation timeline.

- **Camera and Controls:** Configurable camera settings and OrbitControls for user interaction.

- **Lighting:** Point light source with adjustable parameters.

- **Mouse Interaction:** Change the color of the sphere by clicking and dragging the mouse.

- **Responsive Design:** Adjusts the scene dimensions on window resize.

## Configuration

Modify the configuration parameters in the `render` method of the `ThreeJSAnimator` class to customize the camera, light, and other scene properties.

```typescript
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
```
