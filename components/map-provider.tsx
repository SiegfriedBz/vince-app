"use client";

import type { FC, PropsWithChildren } from "react";
import { MapProvider } from "react-map-gl/mapbox";

export const CMapProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return <MapProvider>{children}</MapProvider>;
};
