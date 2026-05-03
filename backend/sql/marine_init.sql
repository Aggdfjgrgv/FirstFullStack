PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS prefectures (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  code          TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL UNIQUE,
  created_at    TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS spots (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  spot_key      TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  prefecture_id INTEGER NOT NULL,
  lat           REAL NOT NULL CHECK (lat BETWEEN -90 AND 90),
  lon           REAL NOT NULL CHECK (lon BETWEEN -180 AND 180),
  is_active     INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
  created_at    TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (prefecture_id) REFERENCES prefectures(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_spots_prefecture_id ON spots(prefecture_id);
CREATE INDEX IF NOT EXISTS idx_spots_name ON spots(name);
CREATE INDEX IF NOT EXISTS idx_spots_active ON spots(is_active);

INSERT OR IGNORE INTO prefectures (code, name) VALUES
  ('okinawa', '沖縄県'),
  ('shizuoka', '静岡県'),
  ('tokyo', '東京都'),
  ('kagoshima', '鹿児島県');

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'okinawa_kerama', '慶良間諸島（沖縄）', p.id, 26.1667, 127.2833, 1
FROM prefectures p WHERE p.code = 'okinawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'okinawa_iriomote', '西表島（沖縄）', p.id, 24.3167, 123.8667, 1
FROM prefectures p WHERE p.code = 'okinawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'okinawa_ishigaki', '石垣島（沖縄）', p.id, 24.3333, 124.1333, 1
FROM prefectures p WHERE p.code = 'okinawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_osezaki', '大瀬崎（伊豆）', p.id, 35.0333, 138.7833, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_futo', '富戸（伊豆）', p.id, 34.9167, 139.1333, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_yawatano', '八幡野（伊豆）', p.id, 34.8833, 139.1167, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'ogasawara', '小笠原諸島', p.id, 27.0833, 142.1833, 1
FROM prefectures p WHERE p.code = 'tokyo';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'yakushima', '屋久島（鹿児島）', p.id, 30.3667, 130.6500, 1
FROM prefectures p WHERE p.code = 'kagoshima';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'amami', '奄美大島（鹿児島）', p.id, 28.3667, 129.5000, 1
FROM prefectures p WHERE p.code = 'kagoshima';
