import { z } from 'zod';

// By ggoodman
export const literalZ = z.union([z.string(), z.number(), z.boolean(), z.null()]);
export type LiteralZ = z.infer<typeof literalZ>;
export type JsonZ = LiteralZ | { [key: string]: JsonZ } | JsonZ[];
export const jsonZ: z.ZodType<JsonZ> = z.lazy(() =>
	z.union([literalZ, z.array(jsonZ), z.record(jsonZ)])
);
