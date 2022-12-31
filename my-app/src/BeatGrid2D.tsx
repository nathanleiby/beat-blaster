import _ from "lodash";
import { useEffect } from "react";
import { Layer, Line, Rect, Stage } from "react-konva";
import { Beat, beatColors } from "./beats";

interface BeatGrid2DProps {
  beatGroup: Beat[][];
}

export default function BeatGrid2D(props: BeatGrid2DProps) {
  const beatWidth = 50;
  // todo: solve left offset and veritical offset via CSS positioning of grid on the page
  const xOffset = 0;
  const ySpacing = 1;
  const yOffset = 0;

  useEffect(() => {
    const interval = setInterval(() => Date.now(), 25);

    return () => clearInterval(interval);
  }, []);

  const { beatGroup } = props;
  return (
    <Stage width={800} height={600}>
      <Layer>
        {/* background */}
        <Rect
          x={yOffset * beatWidth}
          y={xOffset * beatWidth}
          width={16 * beatWidth}
          height={props.beatGroup.length * 1.5 * beatWidth}
          fill="lightgray"
        />
        {_.range(16).map((n) => (
          <Line
            x={xOffset * beatWidth}
            y={yOffset * beatWidth}
            points={[
              n * beatWidth,
              0,
              n * beatWidth,
              props.beatGroup.length * 1.5 * beatWidth,
            ]}
            tension={0.5}
            closed
            stroke="black"
            fillLinearGradientStartPoint={{ x: -50, y: -50 }}
            fillLinearGradientEndPoint={{ x: 50, y: 50 }}
            fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
          />
        ))}

        {_.range(beatGroup.length).map((n) => (
          <Line
            x={xOffset * beatWidth}
            y={yOffset * beatWidth}
            points={[
              0,
              (yOffset + n * ySpacing) * beatWidth,
              16 * beatWidth,
              (yOffset + n * ySpacing) * beatWidth,
            ]}
            tension={0.5}
            closed
            stroke="black"
            fillLinearGradientStartPoint={{ x: -50, y: -50 }}
            fillLinearGradientEndPoint={{ x: 50, y: 50 }}
            fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
          />
        ))}

        {beatGroup.map((beats, bgIdx) => {
          return beats.map((beat) => {
            return (
              <Rect
                x={(xOffset + beat.start) * beatWidth}
                y={(yOffset + bgIdx * ySpacing) * beatWidth}
                width={beat.duration * beatWidth}
                height={beatWidth / 2}
                fill={beatColors[bgIdx % beatColors.length]}
                shadowBlur={beatWidth / 10}
              />
            );
          });
        })}
      </Layer>
    </Stage>
  );
}
