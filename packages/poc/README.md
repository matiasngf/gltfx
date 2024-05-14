This is just a poc to prove how it can work.

The main idea is to have a folder where all the `.gltf` files will be and the script will generate utilities.

It should allow you to:

- Compress the files for faster loading. (https://www.npmjs.com/package/draco3dgltf)
- Expose hooks/utils to load the models.
- Automatically type models with textures/materials.
- Generate .d.ts files for each file.
- Combine materials and textures with same name?

## (Ideal) Usage

Install dependencies:

```bash
npm install gltfx
```

In your project. Create a folder where you will have all your `.gltf` models like `/src/gltfx/models`.

Add the following script to your `package.json`:

```json
{
  "scripts": {
    "gltfx-generate": "gltfx --folder=/src/gltfx/models --types=/src/gltfx/types --public=/public/models"
  }
}
```

Then run `npm run gltfx-generate`.

### With three.js

```ts
import { GltfxLoader } from "gltfx/loader";
import { CarGLTF } from "/src/gltfx/types";

const loader = new GltfxLoader();

const { scene } = loader.load<CarGLTF>(
  "/public/models/car.gltfx",
  (scene, nodes, materials) => {
    // nodes and materials are typed!
    materials.paint.color = new Color("red");
  }
);
```

### With React Three Fiber

```tsx
import { useGltfx } from "gltfx/react";
import { CarGLTF } from "/src/gltfx/types";

useGltfx.preload("/models/car.gltfx");

export const Scene = () => {
  const { scene, nodes, materials } = useGltfx<CarGLTF>("/models/car.gltfx");

  useEffect(() => {
    // nodes and materials are typed!
    materials.paint.color = new Color("red");
  }, [materials]);

  return <primitive object={scene} />;
};
```

### Editing models on load:

```tsx
const { scene, nodes, materials } = useGltfx<CarGLTF>(
  "/models/car.gltfx",
  ({ materials }) => {
    materials.paint.color = new Color("red");
  },
  [] // dependencies
);
```
