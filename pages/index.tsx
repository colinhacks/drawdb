import type {NextPage} from 'next';
import Head from 'next/head';
import {useEffect, useRef, useState} from 'react';

const shapeKeys = {
  circle: 'square',
  square: 'triangle',
  triangle: 'circle',
} as const;
type ShapeKey = keyof typeof shapeKeys;
type Shape = {
  type: ShapeKey;
  x: number;
  y: number;
};
const Home: NextPage = () => {
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [activeShape, setActiveShape] = useState<ShapeKey>('circle');
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    function handleResize() {
      setH(window.innerHeight);
      setW(window.innerWidth);
    }

    handleResize();

    window.addEventListener('resize', handleResize);
  }, []);

  const realCanvas = useRef<HTMLCanvasElement>(null);

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
          const coords = {shape: activeShape, x: e.clientX, y: e.clientY};
          console.log(coords);

          // const resp = await fetch(`/api/shape`, {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          // });
          // console.log(await resp.json());
          const SIZE = 15;
          const X = e.clientX;
          const Y = e.clientY;

          if (activeShape === 'circle') {
            ctx.beginPath();
            ctx.arc(X, Y, SIZE / 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
          } else if (activeShape === 'square') {
            ctx.fillStyle = 'red';
            ctx.fillRect(X, Y, SIZE, SIZE);
          } else if (activeShape === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(X, Y);
            ctx.lineTo(X - 0.6 * SIZE, Y + SIZE);
            ctx.lineTo(X + 0.6 * SIZE, Y + SIZE);
            ctx.closePath();
            ctx.fillStyle = 'red';
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
