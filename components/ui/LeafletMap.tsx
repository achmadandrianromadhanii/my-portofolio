"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/portfolio";

export default function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Inject Leaflet JS
    if (!window.L && !document.getElementById("leaflet-script")) {
      const script = document.createElement("script");
      script.id = "leaflet-script";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      document.body.appendChild(script);

      script.onload = () => initMap();
    } else if (window.L) {
      initMap();
    }

    let map: any = null;

    function initMap() {
      if (!mapRef.current || !window.L || map) return;

      // Default Malang coordinates
      const lat = -7.9839;
      const lng = 112.6214;

      map = window.L.map(mapRef.current, {
        zoomControl: true,
        attributionControl: true,
      }).setView([lat, lng], 13);

      // Gunakan default OpenStreetMap tile layer (Tampilan natural aslinya)
      window.L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        },
      ).addTo(map);

      // Gunakan default Leaflet Marker (JANGAN custom style)
      // Karena icon default butuh image yang mungkin 404 di Next.js tanpa setup, kita define icon default manual ke CDN
      const defaultIcon = window.L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      window.L.marker([lat, lng], { icon: defaultIcon })
        .addTo(map)
        .bindPopup(
          `<b style="color: black;">${profile.location}</b><br><span style="color: #666;">Area domisili.</span>`,
        )
        .openPopup();
    }

    return () => {
      if (map) {
        map.remove();
        map = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="h-[300px] w-full sm:h-[400px] rounded-3xl z-0"
      style={{ backgroundColor: "#e5e5e5" }}
    />
  );
}

// Tambahkan definisi global type
declare global {
  interface Window {
    L: any;
  }
}
