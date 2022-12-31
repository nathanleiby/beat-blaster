import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Beat, beatColors } from "./beats";

interface BoxProps {
  width: number;
  baseColor: string;
}

function Box(props: any) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  //   useFrame((state, delta) => (ref.current.rotation.x += delta));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[props.width, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : props.baseColor} />
    </mesh>
  );
}

interface BeatGrid3DProps {
  beatGroup: Beat[][];
}

export default function BeatGrid3D(props: BeatGrid3DProps) {
  const leftOffset = -8;
  const rowSpacing = 2;
  const rowOffset = -3;

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {props.beatGroup.map((beats, bgIdx) => {
        return beats.map((beat) => {
          return (
            <Box
              position={[
                leftOffset + beat.start,
                rowOffset + bgIdx * rowSpacing,
                0,
              ]}
              width={beat.duration}
              baseColor={beatColors[bgIdx % beatColors.length]}
            />
          );
        });
      })}
    </Canvas>
  );
}
