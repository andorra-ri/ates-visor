import { z } from 'zod';
import type { Point, LineString, Polygon, MultiPolygon } from '@turf/helpers';

const Point = z.object({
  coordinates: z.number().array(),
  type: z.literal('Point'),
}) satisfies z.ZodType<Point>;

const LineString = z.object({
  coordinates: z.array(Point.shape.coordinates),
  type: z.literal('LineString'),
}) satisfies z.ZodType<LineString>;

const Polygon = z.object({
  coordinates: z.array(LineString.shape.coordinates),
  type: z.literal('Polygon'),
}) satisfies z.ZodType<Polygon>;

const MultiPolygon = z.object({
  coordinates: z.array(Polygon.shape.coordinates),
  type: z.literal('MultiPolygon'),
}) satisfies z.ZodType<MultiPolygon>;

export const Grade = z.enum(['SIMPLE', 'CHALLENGING', 'COMPLEX']);
export type Grade = z.infer<typeof Grade>;

export const Terrain = z.object({
  id: z.string(),
  grade: Grade,
  geometry: z.union([Polygon, MultiPolygon]),
  updatedAt: z.string(),
  createdAt: z.string(),
});
export type Terrain = z.infer<typeof Terrain>;

export const Orientation = z.enum(['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']);
export type Orientation = z.infer<typeof Orientation>;

export const Trail = z.object({
  id: z.number(),
  main: z.boolean(),
  down: z.boolean(),
  duration: z.number(),
  routeCode: z.string(),
  geometry: LineString,
  updatedAt: z.string(),
  createdAt: z.string(),
});
export type Trail = z.infer<typeof Trail>;

export const Route = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string(),
  departure: z.string(),
  arrival: z.string(),
  zone: z.string(),
  grade: Grade,
  duration: z.number(),
  distance: z.number(),
  verticalDrop: z.number(),
  orientation: z.array(Orientation),
  circular: z.boolean(),
  trails: z.array(Trail),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Route = z.infer<typeof Route>;

export const ListRoute = Route.omit({
  description: true,
  departure: true,
  arrival: true,
  trails: true,
});
export type ListRoute = z.infer<typeof ListRoute>;

export const Waypoint = z.object({
  id: z.number(),
  kind: z.enum(['DECISION', 'ALERT']),
  name: z.string(),
  description: z.string(),
  routeCodes: z.string().array(),
  geometry: Point,
});
export type Waypoint = z.infer<typeof Waypoint>;

export const Array = z.array;
