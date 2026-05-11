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

INSERT OR IGNORE INTO prefectures (id, code, name) VALUES
  (1, 'hokkaido', '北海道'),
  (2, 'aomori', '青森県'),
  (3, 'iwate', '岩手県'),
  (4, 'miyagi', '宮城県'),
  (8, 'ibaraki', '茨城県'),
  (12, 'chiba', '千葉県'),
  (13, 'tokyo', '東京都'),
  (14, 'kanagawa', '神奈川県'),
  (15, 'niigata', '新潟県'),
  (17, 'ishikawa', '石川県'),
  (18, 'fukui', '福井県'),
  (22, 'shizuoka', '静岡県'),
  (24, 'mie', '三重県'),
  (30, 'wakayama', '和歌山県'),
  (32, 'shimane', '島根県'),
  (35, 'yamaguchi', '山口県'),
  (36, 'tokushima', '徳島県'),
  (38, 'ehime', '愛媛県'),
  (39, 'kochi', '高知県'),
  (42, 'nagasaki', '長崎県'),
  (43, 'kumamoto', '熊本県'),
  (44, 'oita', '大分県'),
  (45, 'miyazaki', '宮崎県'),
  (46, 'kagoshima', '鹿児島県'),
  (47, 'okinawa', '沖縄県');

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'hokkaido_shiretoko', '知床（北海道）', p.id, 44.0700, 145.0200, 1
FROM prefectures p WHERE p.code = 'hokkaido';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'hokkaido_shakotan', '積丹（北海道）', p.id, 43.3000, 140.6000, 1
FROM prefectures p WHERE p.code = 'hokkaido';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'aomori_sai', '佐井（青森）', p.id, 41.4290, 140.8580, 1
FROM prefectures p WHERE p.code = 'aomori';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'iwate_jodogahama', '浄土ヶ浜（岩手）', p.id, 39.6500, 141.9800, 1
FROM prefectures p WHERE p.code = 'iwate';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'miyagi_kinkasan', '金華山（宮城）', p.id, 38.3000, 141.5800, 1
FROM prefectures p WHERE p.code = 'miyagi';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'ibaraki_oarai', '大洗（茨城）', p.id, 36.3100, 140.5800, 1
FROM prefectures p WHERE p.code = 'ibaraki';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'chiba_katsuura', '勝浦（千葉）', p.id, 35.1500, 140.3100, 1
FROM prefectures p WHERE p.code = 'chiba';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'chiba_hasama', '波左間（千葉）', p.id, 34.9300, 139.8000, 1
FROM prefectures p WHERE p.code = 'chiba';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'chiba_nishikawana', '西川名（千葉）', p.id, 34.9200, 139.8200, 1
FROM prefectures p WHERE p.code = 'chiba';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'chiba_ito', '伊戸（千葉）', p.id, 34.9100, 139.8400, 1
FROM prefectures p WHERE p.code = 'chiba';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'tokyo_izu_oshima', '伊豆大島（東京）', p.id, 34.7500, 139.3600, 1
FROM prefectures p WHERE p.code = 'tokyo';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'tokyo_izu_toshima', '利島（東京）', p.id, 34.5200, 139.2800, 1
FROM prefectures p WHERE p.code = 'tokyo';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'tokyo_izu_niijima', '新島（東京）', p.id, 34.3700, 139.2700, 1
FROM prefectures p WHERE p.code = 'tokyo';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'tokyo_izu_kozushima', '神津島（東京）', p.id, 34.2200, 139.1500, 1
FROM prefectures p WHERE p.code = 'tokyo';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'tokyo_izu_miyakejima', '三宅島（東京）', p.id, 34.0800, 139.5300, 1
FROM prefectures p WHERE p.code = 'tokyo';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'tokyo_izu_mikurajima', '御蔵島（東京）', p.id, 33.8800, 139.6000, 1
FROM prefectures p WHERE p.code = 'tokyo';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'tokyo_izu_hachijojima', '八丈島（東京）', p.id, 33.1100, 139.7800, 1
FROM prefectures p WHERE p.code = 'tokyo';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'ogasawara', '小笠原諸島（東京）', p.id, 27.0800, 142.1900, 1
FROM prefectures p WHERE p.code = 'tokyo';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'kanagawa_jogashima', '城ヶ島（神奈川）', p.id, 35.1400, 139.6200, 1
FROM prefectures p WHERE p.code = 'kanagawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'kanagawa_hayama', '葉山（神奈川）', p.id, 35.2700, 139.5800, 1
FROM prefectures p WHERE p.code = 'kanagawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'kanagawa_manazuru', '真鶴（神奈川）', p.id, 35.1500, 139.1400, 1
FROM prefectures p WHERE p.code = 'kanagawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'niigata_sado', '佐渡（新潟）', p.id, 38.0000, 138.3700, 1
FROM prefectures p WHERE p.code = 'niigata';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'ishikawa_noto', '能登半島（石川）', p.id, 37.4000, 137.2500, 1
FROM prefectures p WHERE p.code = 'ishikawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'fukui_echizen', '越前海岸（福井）', p.id, 35.9700, 136.0400, 1
FROM prefectures p WHERE p.code = 'fukui';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'fukui_tsuruga', '敦賀（福井）', p.id, 35.6500, 136.0600, 1
FROM prefectures p WHERE p.code = 'fukui';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_osezaki', '大瀬崎（静岡）', p.id, 35.0300, 138.7900, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_futo', '富戸（静岡）', p.id, 34.9100, 139.1300, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_iop', '伊豆海洋公園 IOP（静岡）', p.id, 34.9000, 139.1400, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_kawana', '川奈（静岡）', p.id, 34.9300, 139.1200, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_ito', '伊東（静岡）', p.id, 34.9700, 139.1000, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_ohkawa', '伊豆大川（静岡）', p.id, 34.8600, 139.1000, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_yawatano', '八幡野（静岡）', p.id, 34.8900, 139.1100, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_inatori', '稲取（静岡）', p.id, 34.7700, 139.0400, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_hatsushima', '初島（静岡）', p.id, 35.0500, 139.1800, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_atami', '熱海（静岡）', p.id, 35.1000, 139.0800, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_ida', '井田（静岡）', p.id, 34.9900, 138.7700, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_hirasawa', '平沢（静岡）', p.id, 35.0100, 138.8200, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_tago', '田子（静岡）', p.id, 34.7800, 138.7700, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_kumomi', '雲見（静岡）', p.id, 34.6800, 138.7600, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'izu_mikomoto', '神子元（静岡）', p.id, 34.6000, 138.8500, 1
FROM prefectures p WHERE p.code = 'shizuoka';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'mie_owase', '尾鷲（三重）', p.id, 34.0700, 136.1900, 1
FROM prefectures p WHERE p.code = 'mie';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'mie_kumano', '熊野（三重）', p.id, 33.8800, 136.1000, 1
FROM prefectures p WHERE p.code = 'mie';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'mie_goza', '御座（三重）', p.id, 34.2900, 136.8600, 1
FROM prefectures p WHERE p.code = 'mie';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'mie_ose', '大瀬（三重）', p.id, 34.1400, 136.2600, 1
FROM prefectures p WHERE p.code = 'mie';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'wakayama_kushimoto', '串本（和歌山）', p.id, 33.4700, 135.7800, 1
FROM prefectures p WHERE p.code = 'wakayama';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'wakayama_shirahama', '白浜（和歌山）', p.id, 33.6800, 135.3500, 1
FROM prefectures p WHERE p.code = 'wakayama';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'wakayama_susami', 'すさみ（和歌山）', p.id, 33.5500, 135.5000, 1
FROM prefectures p WHERE p.code = 'wakayama';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'wakayama_nachikatsuura', '那智勝浦（和歌山）', p.id, 33.6200, 135.9500, 1
FROM prefectures p WHERE p.code = 'wakayama';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'shimane_oki', '隠岐諸島（島根）', p.id, 36.2000, 133.3000, 1
FROM prefectures p WHERE p.code = 'shimane';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'yamaguchi_omijima', '青海島（山口）', p.id, 34.4100, 131.1900, 1
FROM prefectures p WHERE p.code = 'yamaguchi';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'tokushima_mugi', '牟岐（徳島）', p.id, 33.6700, 134.4200, 1
FROM prefectures p WHERE p.code = 'tokushima';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'tokushima_takegashima', '竹ヶ島（徳島）', p.id, 33.5600, 134.3500, 1
FROM prefectures p WHERE p.code = 'tokushima';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'ehime_uwajima', '宇和島（愛媛）', p.id, 33.2200, 132.5600, 1
FROM prefectures p WHERE p.code = 'ehime';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'ehime_ainan', '愛南（愛媛）', p.id, 32.9800, 132.5300, 1
FROM prefectures p WHERE p.code = 'ehime';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'kochi_kashiwajima', '柏島（高知）', p.id, 32.7600, 132.6200, 1
FROM prefectures p WHERE p.code = 'kochi';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'kochi_okinoshima', '沖の島（高知）', p.id, 32.7300, 132.5300, 1
FROM prefectures p WHERE p.code = 'kochi';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'nagasaki_goto', '五島列島（長崎）', p.id, 32.7000, 128.8000, 1
FROM prefectures p WHERE p.code = 'nagasaki';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'nagasaki_tsushima', '対馬（長崎）', p.id, 34.2000, 129.2900, 1
FROM prefectures p WHERE p.code = 'nagasaki';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'nagasaki_ikitsuki', '生月島（長崎）', p.id, 33.4000, 129.4300, 1
FROM prefectures p WHERE p.code = 'nagasaki';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'kumamoto_amakusa', '天草（熊本）', p.id, 32.4600, 130.2000, 1
FROM prefectures p WHERE p.code = 'kumamoto';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'kumamoto_ushibuka', '牛深（熊本）', p.id, 32.1900, 130.0300, 1
FROM prefectures p WHERE p.code = 'kumamoto';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'oita_tsukumi', '津久見（大分）', p.id, 33.0700, 131.8600, 1
FROM prefectures p WHERE p.code = 'oita';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'oita_saganoseki', '佐賀関（大分）', p.id, 33.2400, 131.8900, 1
FROM prefectures p WHERE p.code = 'oita';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'miyazaki_nobeoka', '延岡（宮崎）', p.id, 32.5800, 131.6700, 1
FROM prefectures p WHERE p.code = 'miyazaki';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'miyazaki_nichinan', '日南（宮崎）', p.id, 31.6000, 131.4000, 1
FROM prefectures p WHERE p.code = 'miyazaki';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'yakushima', '屋久島（鹿児島）', p.id, 30.3700, 130.6500, 1
FROM prefectures p WHERE p.code = 'kagoshima';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'amami', '奄美大島（鹿児島）', p.id, 28.3800, 129.5000, 1
FROM prefectures p WHERE p.code = 'kagoshima';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'kagoshima_kakeroma', '加計呂麻島（鹿児島）', p.id, 28.1200, 129.2300, 1
FROM prefectures p WHERE p.code = 'kagoshima';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'kagoshima_tanegashima', '種子島（鹿児島）', p.id, 30.7300, 131.0000, 1
FROM prefectures p WHERE p.code = 'kagoshima';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'okinawa_kerama', '慶良間諸島（沖縄）', p.id, 26.2000, 127.3000, 1
FROM prefectures p WHERE p.code = 'okinawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'okinawa_onna', '恩納村（沖縄）', p.id, 26.5000, 127.8500, 1
FROM prefectures p WHERE p.code = 'okinawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'okinawa_chibishi', 'チービシ（沖縄）', p.id, 26.2500, 127.5000, 1
FROM prefectures p WHERE p.code = 'okinawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'okinawa_iriomote', '西表島（沖縄）', p.id, 24.3300, 123.8500, 1
FROM prefectures p WHERE p.code = 'okinawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'okinawa_ishigaki', '石垣島（沖縄）', p.id, 24.3400, 124.1500, 1
FROM prefectures p WHERE p.code = 'okinawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'okinawa_miyako', '宮古島（沖縄）', p.id, 24.8100, 125.2800, 1
FROM prefectures p WHERE p.code = 'okinawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'okinawa_yonaguni', '与那国島（沖縄）', p.id, 24.4700, 122.9800, 1
FROM prefectures p WHERE p.code = 'okinawa';

INSERT OR IGNORE INTO spots (spot_key, name, prefecture_id, lat, lon, is_active)
SELECT 'okinawa_kume', '久米島（沖縄）', p.id, 26.3300, 126.8100, 1
FROM prefectures p WHERE p.code = 'okinawa';
