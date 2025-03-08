import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParamsParser = {
  pcd_id: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
  probe_id: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
  sensor_id: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParser);
