// Shared data for the triangle hero; kept out of component files so Fast Refresh stays clean.

/** "Book a Site Visit" goes to the contact section on the home page. */
export const BOOK_HREF = "/#contact";

/**
 * Tree-ring mark radii, innermost first, so a stagger draws from the centre outward. One ring per
 * corner of the triangle: land (brown), growth (green), returns (logo red) — see `rw-ring--*`.
 */
export const RINGS = [5.5, 10.5, 15.5];

// Fraunces 600 (SOFT 50, WONK 0) and Manrope, loaded in the home route head.
export const TRIANGLE_FONTS =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,600,50,0&family=Manrope:wght@400;500;600;700&display=swap";

/** Fraunces italic 500 for the accent phrase; loaded after first paint. */
export const TRIANGLE_FONTS_ITALIC =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@1,9..144,500,50,0&display=swap";
