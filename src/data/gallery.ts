import type { ImageMetadata } from "astro";

import img01 from "../assets/WhatsApp Image 2026-07-19 at 21.21.19.jpeg";
import img02 from "../assets/WhatsApp Image 2026-08-09 at 22.03.24 (1).jpeg";
import img03 from "../assets/WhatsApp Image 2026-08-09 at 22.03.24.jpeg";
import img04 from "../assets/WhatsApp Image 2026-08-09 at 22.03.25.jpeg";
import img05 from "../assets/WhatsApp Image 2026-08-09 at 22.03.26 (1).jpeg";
import img06 from "../assets/WhatsApp Image 2026-08-09 at 22.03.26.jpeg";
import img07 from "../assets/WhatsApp Image 2026-08-09 at 22.03.27 (1).jpeg";
import img08 from "../assets/WhatsApp Image 2026-08-09 at 22.03.27.jpeg";
import img09 from "../assets/WhatsApp Image 2026-08-09 at 22.03.28 (1).jpeg";
import img10 from "../assets/WhatsApp Image 2026-08-09 at 22.03.28 (2).jpeg";
import img11 from "../assets/WhatsApp Image 2026-08-09 at 22.03.28.jpeg";
import img12 from "../assets/WhatsApp Image 2026-08-09 at 22.03.29 (1).jpeg";
import img13 from "../assets/WhatsApp Image 2026-08-09 at 22.03.29.jpeg";
import img14 from "../assets/WhatsApp Image 2026-08-09 at 22.03.31 (1).jpeg";
import img15 from "../assets/WhatsApp Image 2026-08-09 at 22.03.31 (2).jpeg";
import img16 from "../assets/WhatsApp Image 2026-08-09 at 22.03.31.jpeg";
import img17 from "../assets/WhatsApp Image 2026-08-09 at 22.03.32.jpeg";

/**
 * Galería de fotos de Flor y Leo.
 * El orden del array es el orden de navegación en el lightbox.
 * `featured` marca las fotos que se muestran como burbujas en el collage.
 */
export interface GalleryImage {
  src: ImageMetadata;
  alt: string;
  featured?: boolean;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: img01, alt: "Foto de Flor y Leo" },
  { src: img02, alt: "Foto de Flor y Leo", featured: true },
  { src: img03, alt: "Foto de Flor y Leo" },
  { src: img04, alt: "Foto de Flor y Leo", featured: true },
  { src: img05, alt: "Foto de Flor y Leo", featured: true },
  { src: img06, alt: "Foto de Flor y Leo" },
  { src: img07, alt: "Foto de Flor y Leo", featured: true },
  { src: img08, alt: "Foto de Flor y Leo" },
  { src: img09, alt: "Foto de Flor y Leo", featured: true },
  { src: img10, alt: "Foto de Flor y Leo" },
  { src: img11, alt: "Foto de Flor y Leo" },
  { src: img12, alt: "Foto de Flor y Leo", featured: true },
  { src: img13, alt: "Foto de Flor y Leo" },
  { src: img14, alt: "Foto de Flor y Leo", featured: true },
  { src: img15, alt: "Foto de Flor y Leo" },
  { src: img16, alt: "Foto de Flor y Leo" },
  { src: img17, alt: "Foto de Flor y Leo", featured: true },
];

/** ID del video de Vimeo que se muestra al final de la galería */
export const VIMEO_ID = "1219692622";