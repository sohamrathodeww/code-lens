import { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodeLens — Developer Tools Suite",
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/favicon-light.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-large.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
