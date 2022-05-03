import type {NextPage} from 'next';
import Head from 'next/head';
import {useEffect, useRef, useState} from 'react';
import type {PostShape} from './api/shape';

const shapeKeys = {
  circle: 'square',
  square: 'triangle',
  triangle: 'circle',
} as const;
type ShapeKey = keyof typeof shapeKeys;

export type Shape = {
  type: ShapeKey;
  x: number;
  y: number;
};

function renderShape(ctx: CanvasRenderingContext2D, shape: PostShape) {
  if (shape.__kind === 'circle') {
    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
    ctx.fillStyle = shape.color;
    ctx.fill();
  } else if (shape.__kind === 'square') {
    ctx.fillStyle = shape.color;
    ctx.fillRect(shape.x, shape.y, shape.side_length, shape.side_length);
  } else if (shape.__kind === 'triangle') {
    ctx.beginPath();
    ctx.moveTo(shape.x, shape.y);
    ctx.lineTo(shape.x - 0.6 * shape.tri_width, shape.y + shape.tri_height);
    ctx.lineTo(shape.x + 0.6 * shape.tri_width, shape.y + shape.tri_height);
    ctx.closePath();
    ctx.fillStyle = shape.color;
    ctx.fill();
  }
}

const Home: NextPage = () => {
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [activeShape, setActiveShape] = useState<ShapeKey>('circle');
  const [shapes, setShapes] = useState<PostShape[]>([]);
  const realCanvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    fetch('/api/shape', {
      method: 'GET',
    })
      .then((resp) => resp.json())
      .then((shapes: PostShape[]) => {
        console.log(`fetched ${shapes.length} shapes!`);
        console.log(shapes);
        const ctx = realCanvas.current?.getContext('2d')!;
        if (ctx) {
          for (const shape of shapes) {
            renderShape(ctx, shape);
          }
        }
      });
  });

  useEffect(() => {
    function handleResize() {
      setH(window.innerHeight);
      setW(window.innerWidth);
    }

    handleResize();

    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <div className={'container'}>
      <Head>
        <title>DrawDB</title>
        <meta name="description" content="Drawing app powered by EdgeDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          zIndex: 10,
          position: 'absolute',
          top: '10px',
          left: '10px',
        }}
      >
        <div
          onClick={() => setActiveShape(shapeKeys[activeShape])}
          style={{
            background: 'blue',
            color: 'white',
            borderRadius: '3px',
            padding: '4px',
            cursor: 'pointer',
            userSelect: 'none',
            fontFamily: 'monospace',
          }}
        >
          {activeShape}
        </div>
      </div>
      <canvas
        id="canvas"
        width={w}
        height={h}
        ref={realCanvas}
        onClick={async (e) => {
          console.log(`adding ${activeShape}!`);
          const ctx = realCanvas.current?.getContext('2d')!;
          const shapeData: Shape = {
            type: activeShape,
            x: e.clientX,
            y: e.clientY,
          };

          const resp = await fetch(`/api/shape`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(shapeData),
          });
          const shape: PostShape = await resp.json();
          console.log(shape);

          if (shape.__kind === 'circle') {
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            ctx.fillStyle = shape.color;
            ctx.fill();
          } else if (shape.__kind === 'square') {
            ctx.fillStyle = shape.color;
            ctx.fillRect(
              shape.x,
              shape.y,
              shape.side_length,
              shape.side_length
            );
          } else if (shape.__kind === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(shape.x, shape.y);
            ctx.lineTo(
              shape.x - 0.6 * shape.tri_width,
              shape.y + shape.tri_height
            );
            ctx.lineTo(
              shape.x + 0.6 * shape.tri_width,
              shape.y + shape.tri_height
            );
            ctx.closePath();
            ctx.fillStyle = shape.color;
            ctx.fill();
          }
        }}
      ></canvas>
      <style jsx global>{`
        html,
        body,
        .container {
          overflow: hidden;
          height: 100vh;
          width: 100vw;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
};

export default Home;
