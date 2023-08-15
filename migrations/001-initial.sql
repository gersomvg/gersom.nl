--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE
  images (
    id INTEGER PRIMARY KEY,
    filename TEXT NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    caption TEXT NOT NULL,
    isFeatured BOOLEAN NOT NULL CHECK (isFeatured IN (FALSE, TRUE)),
    sequence INTEGER NOT NULL,
    created DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    updated DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP)
  );

INSERT INTO
  images (
    filename,
    width,
    height,
    caption,
    isFeatured,
    sequence
  )
VALUES
  (
    'scotts-beach.jpeg',
    3729,
    2797,
    'Scotts Beach along the Heaphy Track in Karamea, New Zealand',
    TRUE,
    1
  ),
  (
    'kepler-track.jpeg',
    4032,
    3024,
    'Kepler Track, New Zealand',
    TRUE,
    2
  ),
  (
    'gentle-annies.jpeg',
    4032,
    3024,
    'Gentle Annies campground, West Coast, New Zealand',
    TRUE,
    3
  ),
  (
    'utmb-tarawera.jpg',
    4000,
    2666,
    'UTMB Tarawera Ultra Marathon, New Zealand',
    TRUE,
    4
  );

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE images;