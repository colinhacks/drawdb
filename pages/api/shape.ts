// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createClient from 'edgedb';
import type {NextApiRequest, NextApiResponse} from 'next';
import {Shape} from '..';

import e from '../../dbschema/edgeql-js';

const client = createClient();

async function makeShape(type: string, x: number, y: number) {
  if (type === 'circle') {
    const insertQuery = e.insert(e.Circle, {x, y});
    const selectQuery = e.select(insertQuery, () => ({
      __kind: e.str(type),
      ...e.Circle['*'],
    }));
    const result = await selectQuery.run(client);
    return result;
  }

  if (type === 'square') {
    const insertQuery = e.insert(e.Square, {x, y});
    const selectQuery = e.select(insertQuery, () => ({
      __kind: e.str(type),
      ...e.Square['*'],
    }));
    const result = await selectQuery.run(client);
    return result;
  }

  if (type === 'triangle') {
    const insertQuery = e.insert(e.Triangle, {x, y});
    const selectQuery = e.select(insertQuery, () => ({
      __kind: e.str(type),
      ...e.Triangle['*'],
    }));
    const result = await selectQuery.run(client);
    return result;
  }

  throw Error('Invalid shape');
}

type Depromise<T> = T extends Promise<infer U> ? U : T;
export type PostShape = Depromise<ReturnType<typeof makeShape>>;

async function getShapes() {
  const allShapes = e.select(e.Shape, (shape) => ({
    __kind: e.str_split(e.str_lower(shape.__type__.name), e.str('::'))[1],
    id: true,
    x: true,
    y: true,
    color: true,
    ...e.is(e.Circle, {radius: true}),
    ...e.is(e.Square, {side_length: true}),
    ...e.is(e.Triangle, {tri_height: true, tri_width: true}),
  }));
  return (await allShapes.run(client)) as PostShape[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return res.json(await getShapes());
  }

  if (req.method !== 'POST') return res.status(400);

  const body: Shape = req.body;

  try {
    const shape = await makeShape(body.type, body.x, body.y);
    console.log(shape);
    return res.status(200).json(shape);
  } catch {
    return res.status(400).send('Invalid shape');
  }
}
