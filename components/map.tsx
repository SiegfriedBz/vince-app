"use client";

import MapView, { Marker, Popup, useMap } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";

const TOKEN = process.env.NEXT_PUBLIC_MAPB_TOKEN;

type MarkerT = {
  id: string;
  designation: string;
  lat: number;
  lng: number;
};

type Props = {
  pcdMarkersData: MarkerT[];
  probeMarkersData: MarkerT[];
};

export const CMap: FC<Props> = (props) => {
  const { pcdMarkersData, probeMarkersData } = props;
  const { map } = useMap();

  const allCoord = useMemo(
    () => [...pcdMarkersData, ...probeMarkersData],
    [pcdMarkersData, probeMarkersData]
  );
  const allLat = useMemo(() => allCoord.map((d) => d.lat), [allCoord]);
  const allLng = useMemo(() => allCoord.map((d) => d.lng), [allCoord]);

  useEffect(() => {
    if (!allLat.length || !allLng.length) return;

    const minLat = Math.min(...allLat);
    const maxLat = Math.max(...allLat);
    const avLat = (minLat + maxLat) / 2;
    const minLng = Math.min(...allLng);
    const maxLng = Math.max(...allLng);
    const avLng = (minLng + maxLng) / 2;

    map?.flyTo({
      center: [avLng, avLat],
      zoom: 6,
      speed: 0.5,
      curve: 1.5,
      essential: true,
    });
  }, [map, allLat, allLng]);

  return (
    <MapView
      id="map"
      mapboxAccessToken={TOKEN}
      initialViewState={{
        longitude: 7.5,
        latitude: 32,
        zoom: 2,
      }}
      style={{ width: 1200, height: 800 }}
      mapStyle="mapbox://styles/mapbox/streets-v8"
    >
      {pcdMarkersData?.map((m) => {
        return (
          <Marker
            key={m.id}
            longitude={m.lng}
            latitude={m.lat}
            anchor="bottom"
          />
        );
      })}

      {probeMarkersData?.map((m) => {
        return (
          <Marker
            key={m.id}
            longitude={m.lng}
            latitude={m.lat}
            anchor="bottom"
          />
        );
      })}
    </MapView>
  );
};
