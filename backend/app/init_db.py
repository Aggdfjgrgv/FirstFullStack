from sqlalchemy import select, update

from .db import Base, SessionLocal, engine
from .models.marine_entities import Prefecture, Spot
from .models.user_entities import UserEntity


PREFECTURES = [
    {"id": 1, "code": "hokkaido", "name": "北海道"},
    {"id": 2, "code": "aomori", "name": "青森県"},
    {"id": 3, "code": "iwate", "name": "岩手県"},
    {"id": 4, "code": "miyagi", "name": "宮城県"},
    {"id": 8, "code": "ibaraki", "name": "茨城県"},
    {"id": 12, "code": "chiba", "name": "千葉県"},
    {"id": 13, "code": "tokyo", "name": "東京都"},
    {"id": 14, "code": "kanagawa", "name": "神奈川県"},
    {"id": 15, "code": "niigata", "name": "新潟県"},
    {"id": 17, "code": "ishikawa", "name": "石川県"},
    {"id": 18, "code": "fukui", "name": "福井県"},
    {"id": 22, "code": "shizuoka", "name": "静岡県"},
    {"id": 24, "code": "mie", "name": "三重県"},
    {"id": 30, "code": "wakayama", "name": "和歌山県"},
    {"id": 32, "code": "shimane", "name": "島根県"},
    {"id": 35, "code": "yamaguchi", "name": "山口県"},
    {"id": 36, "code": "tokushima", "name": "徳島県"},
    {"id": 38, "code": "ehime", "name": "愛媛県"},
    {"id": 39, "code": "kochi", "name": "高知県"},
    {"id": 42, "code": "nagasaki", "name": "長崎県"},
    {"id": 43, "code": "kumamoto", "name": "熊本県"},
    {"id": 44, "code": "oita", "name": "大分県"},
    {"id": 45, "code": "miyazaki", "name": "宮崎県"},
    {"id": 46, "code": "kagoshima", "name": "鹿児島県"},
    {"id": 47, "code": "okinawa", "name": "沖縄県"},
]

SPOTS = [
    {"key": "hokkaido_shiretoko", "name": "知床（北海道）", "lat": 44.0700, "lon": 145.0200, "prefecture": "hokkaido"},
    {"key": "hokkaido_shakotan", "name": "積丹（北海道）", "lat": 43.3000, "lon": 140.6000, "prefecture": "hokkaido"},
    {"key": "aomori_sai", "name": "佐井（青森）", "lat": 41.4290, "lon": 140.8580, "prefecture": "aomori"},
    {"key": "iwate_jodogahama", "name": "浄土ヶ浜（岩手）", "lat": 39.6500, "lon": 141.9800, "prefecture": "iwate"},
    {"key": "miyagi_kinkasan", "name": "金華山（宮城）", "lat": 38.3000, "lon": 141.5800, "prefecture": "miyagi"},
    {"key": "ibaraki_oarai", "name": "大洗（茨城）", "lat": 36.3100, "lon": 140.5800, "prefecture": "ibaraki"},
    {"key": "chiba_katsuura", "name": "勝浦（千葉）", "lat": 35.1500, "lon": 140.3100, "prefecture": "chiba"},
    {"key": "chiba_hasama", "name": "波左間（千葉）", "lat": 34.9300, "lon": 139.8000, "prefecture": "chiba"},
    {"key": "chiba_nishikawana", "name": "西川名（千葉）", "lat": 34.9200, "lon": 139.8200, "prefecture": "chiba"},
    {"key": "chiba_ito", "name": "伊戸（千葉）", "lat": 34.9100, "lon": 139.8400, "prefecture": "chiba"},
    {"key": "tokyo_izu_oshima", "name": "伊豆大島（東京）", "lat": 34.7500, "lon": 139.3600, "prefecture": "tokyo"},
    {"key": "tokyo_izu_toshima", "name": "利島（東京）", "lat": 34.5200, "lon": 139.2800, "prefecture": "tokyo"},
    {"key": "tokyo_izu_niijima", "name": "新島（東京）", "lat": 34.3700, "lon": 139.2700, "prefecture": "tokyo"},
    {"key": "tokyo_izu_kozushima", "name": "神津島（東京）", "lat": 34.2200, "lon": 139.1500, "prefecture": "tokyo"},
    {"key": "tokyo_izu_miyakejima", "name": "三宅島（東京）", "lat": 34.0800, "lon": 139.5300, "prefecture": "tokyo"},
    {"key": "tokyo_izu_mikurajima", "name": "御蔵島（東京）", "lat": 33.8800, "lon": 139.6000, "prefecture": "tokyo"},
    {"key": "tokyo_izu_hachijojima", "name": "八丈島（東京）", "lat": 33.1100, "lon": 139.7800, "prefecture": "tokyo"},
    {"key": "ogasawara", "name": "小笠原諸島（東京）", "lat": 27.0800, "lon": 142.1900, "prefecture": "tokyo"},
    {"key": "kanagawa_jogashima", "name": "城ヶ島（神奈川）", "lat": 35.1400, "lon": 139.6200, "prefecture": "kanagawa"},
    {"key": "kanagawa_hayama", "name": "葉山（神奈川）", "lat": 35.2700, "lon": 139.5800, "prefecture": "kanagawa"},
    {"key": "kanagawa_manazuru", "name": "真鶴（神奈川）", "lat": 35.1500, "lon": 139.1400, "prefecture": "kanagawa"},
    {"key": "niigata_sado", "name": "佐渡（新潟）", "lat": 38.0000, "lon": 138.3700, "prefecture": "niigata"},
    {"key": "ishikawa_noto", "name": "能登半島（石川）", "lat": 37.4000, "lon": 137.2500, "prefecture": "ishikawa"},
    {"key": "fukui_echizen", "name": "越前海岸（福井）", "lat": 35.9700, "lon": 136.0400, "prefecture": "fukui"},
    {"key": "fukui_tsuruga", "name": "敦賀（福井）", "lat": 35.6500, "lon": 136.0600, "prefecture": "fukui"},
    {"key": "izu_osezaki", "name": "大瀬崎（静岡）", "lat": 35.0300, "lon": 138.7900, "prefecture": "shizuoka"},
    {"key": "izu_futo", "name": "富戸（静岡）", "lat": 34.9100, "lon": 139.1300, "prefecture": "shizuoka"},
    {"key": "izu_iop", "name": "伊豆海洋公園 IOP（静岡）", "lat": 34.9000, "lon": 139.1400, "prefecture": "shizuoka"},
    {"key": "izu_kawana", "name": "川奈（静岡）", "lat": 34.9300, "lon": 139.1200, "prefecture": "shizuoka"},
    {"key": "izu_ito", "name": "伊東（静岡）", "lat": 34.9700, "lon": 139.1000, "prefecture": "shizuoka"},
    {"key": "izu_ohkawa", "name": "伊豆大川（静岡）", "lat": 34.8600, "lon": 139.1000, "prefecture": "shizuoka"},
    {"key": "izu_yawatano", "name": "八幡野（静岡）", "lat": 34.8900, "lon": 139.1100, "prefecture": "shizuoka"},
    {"key": "izu_inatori", "name": "稲取（静岡）", "lat": 34.7700, "lon": 139.0400, "prefecture": "shizuoka"},
    {"key": "izu_hatsushima", "name": "初島（静岡）", "lat": 35.0500, "lon": 139.1800, "prefecture": "shizuoka"},
    {"key": "izu_atami", "name": "熱海（静岡）", "lat": 35.1000, "lon": 139.0800, "prefecture": "shizuoka"},
    {"key": "izu_ida", "name": "井田（静岡）", "lat": 34.9900, "lon": 138.7700, "prefecture": "shizuoka"},
    {"key": "izu_hirasawa", "name": "平沢（静岡）", "lat": 35.0100, "lon": 138.8200, "prefecture": "shizuoka"},
    {"key": "izu_tago", "name": "田子（静岡）", "lat": 34.7800, "lon": 138.7700, "prefecture": "shizuoka"},
    {"key": "izu_kumomi", "name": "雲見（静岡）", "lat": 34.6800, "lon": 138.7600, "prefecture": "shizuoka"},
    {"key": "izu_mikomoto", "name": "神子元（静岡）", "lat": 34.6000, "lon": 138.8500, "prefecture": "shizuoka"},
    {"key": "mie_owase", "name": "尾鷲（三重）", "lat": 34.0700, "lon": 136.1900, "prefecture": "mie"},
    {"key": "mie_kumano", "name": "熊野（三重）", "lat": 33.8800, "lon": 136.1000, "prefecture": "mie"},
    {"key": "mie_goza", "name": "御座（三重）", "lat": 34.2900, "lon": 136.8600, "prefecture": "mie"},
    {"key": "mie_ose", "name": "大瀬（三重）", "lat": 34.1400, "lon": 136.2600, "prefecture": "mie"},
    {"key": "wakayama_kushimoto", "name": "串本（和歌山）", "lat": 33.4700, "lon": 135.7800, "prefecture": "wakayama"},
    {"key": "wakayama_shirahama", "name": "白浜（和歌山）", "lat": 33.6800, "lon": 135.3500, "prefecture": "wakayama"},
    {"key": "wakayama_susami", "name": "すさみ（和歌山）", "lat": 33.5500, "lon": 135.5000, "prefecture": "wakayama"},
    {"key": "wakayama_nachikatsuura", "name": "那智勝浦（和歌山）", "lat": 33.6200, "lon": 135.9500, "prefecture": "wakayama"},
    {"key": "shimane_oki", "name": "隠岐諸島（島根）", "lat": 36.2000, "lon": 133.3000, "prefecture": "shimane"},
    {"key": "yamaguchi_omijima", "name": "青海島（山口）", "lat": 34.4100, "lon": 131.1900, "prefecture": "yamaguchi"},
    {"key": "tokushima_mugi", "name": "牟岐（徳島）", "lat": 33.6700, "lon": 134.4200, "prefecture": "tokushima"},
    {"key": "tokushima_takegashima", "name": "竹ヶ島（徳島）", "lat": 33.5600, "lon": 134.3500, "prefecture": "tokushima"},
    {"key": "ehime_uwajima", "name": "宇和島（愛媛）", "lat": 33.2200, "lon": 132.5600, "prefecture": "ehime"},
    {"key": "ehime_ainan", "name": "愛南（愛媛）", "lat": 32.9800, "lon": 132.5300, "prefecture": "ehime"},
    {"key": "kochi_kashiwajima", "name": "柏島（高知）", "lat": 32.7600, "lon": 132.6200, "prefecture": "kochi"},
    {"key": "kochi_okinoshima", "name": "沖の島（高知）", "lat": 32.7300, "lon": 132.5300, "prefecture": "kochi"},
    {"key": "nagasaki_goto", "name": "五島列島（長崎）", "lat": 32.7000, "lon": 128.8000, "prefecture": "nagasaki"},
    {"key": "nagasaki_tsushima", "name": "対馬（長崎）", "lat": 34.2000, "lon": 129.2900, "prefecture": "nagasaki"},
    {"key": "nagasaki_ikitsuki", "name": "生月島（長崎）", "lat": 33.4000, "lon": 129.4300, "prefecture": "nagasaki"},
    {"key": "kumamoto_amakusa", "name": "天草（熊本）", "lat": 32.4600, "lon": 130.2000, "prefecture": "kumamoto"},
    {"key": "kumamoto_ushibuka", "name": "牛深（熊本）", "lat": 32.1900, "lon": 130.0300, "prefecture": "kumamoto"},
    {"key": "oita_tsukumi", "name": "津久見（大分）", "lat": 33.0700, "lon": 131.8600, "prefecture": "oita"},
    {"key": "oita_saganoseki", "name": "佐賀関（大分）", "lat": 33.2400, "lon": 131.8900, "prefecture": "oita"},
    {"key": "miyazaki_nobeoka", "name": "延岡（宮崎）", "lat": 32.5800, "lon": 131.6700, "prefecture": "miyazaki"},
    {"key": "miyazaki_nichinan", "name": "日南（宮崎）", "lat": 31.6000, "lon": 131.4000, "prefecture": "miyazaki"},
    {"key": "yakushima", "name": "屋久島（鹿児島）", "lat": 30.3700, "lon": 130.6500, "prefecture": "kagoshima"},
    {"key": "amami", "name": "奄美大島（鹿児島）", "lat": 28.3800, "lon": 129.5000, "prefecture": "kagoshima"},
    {"key": "kagoshima_kakeroma", "name": "加計呂麻島（鹿児島）", "lat": 28.1200, "lon": 129.2300, "prefecture": "kagoshima"},
    {"key": "kagoshima_tanegashima", "name": "種子島（鹿児島）", "lat": 30.7300, "lon": 131.0000, "prefecture": "kagoshima"},
    {"key": "okinawa_kerama", "name": "慶良間諸島（沖縄）", "lat": 26.2000, "lon": 127.3000, "prefecture": "okinawa"},
    {"key": "okinawa_onna", "name": "恩納村（沖縄）", "lat": 26.5000, "lon": 127.8500, "prefecture": "okinawa"},
    {"key": "okinawa_chibishi", "name": "チービシ（沖縄）", "lat": 26.2500, "lon": 127.5000, "prefecture": "okinawa"},
    {"key": "okinawa_iriomote", "name": "西表島（沖縄）", "lat": 24.3300, "lon": 123.8500, "prefecture": "okinawa"},
    {"key": "okinawa_ishigaki", "name": "石垣島（沖縄）", "lat": 24.3400, "lon": 124.1500, "prefecture": "okinawa"},
    {"key": "okinawa_miyako", "name": "宮古島（沖縄）", "lat": 24.8100, "lon": 125.2800, "prefecture": "okinawa"},
    {"key": "okinawa_yonaguni", "name": "与那国島（沖縄）", "lat": 24.4700, "lon": 122.9800, "prefecture": "okinawa"},
    {"key": "okinawa_kume", "name": "久米島（沖縄）", "lat": 26.3300, "lon": 126.8100, "prefecture": "okinawa"},
]

USERS = [
    {
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo_lat": "-37.3159",
        "geo_lng": "81.1496",
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company_name": "Romaguera-Crona",
        "company_catch_phrase": "Multi-layered client-server neural-net",
        "company_bs": "harness real-time e-markets",
    },
    {
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo_lat": "-43.9509",
        "geo_lng": "-34.4618",
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company_name": "Deckow-Crist",
        "company_catch_phrase": "Proactive didactic contingency",
        "company_bs": "synergize scalable supply-chains",
    },
    {
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net",
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo_lat": "-68.6102",
        "geo_lng": "-47.0653",
        "phone": "1-463-123-4447",
        "website": "ramiro.info",
        "company_name": "Romaguera-Jacobson",
        "company_catch_phrase": "Face to face bifurcated interface",
        "company_bs": "e-enable strategic applications",
    },
]


def _seed_master_data() -> None:
    with SessionLocal() as session:
        for prefecture in PREFECTURES:
            target_id = prefecture["id"]
            code = prefecture["code"]
            name = prefecture["name"]

            by_code = session.scalar(select(Prefecture).where(Prefecture.code == code).limit(1))
            if by_code is None:
                session.add(Prefecture(id=target_id, code=code, name=name))
                continue

            by_code.name = name
            if by_code.id != target_id:
                conflict = session.scalar(select(Prefecture).where(Prefecture.id == target_id).limit(1))
                if conflict is not None and conflict.code != code:
                    raise RuntimeError(f"Prefecture id conflict: {target_id} is used by {conflict.code}")

                session.execute(
                    update(Spot)
                    .where(Spot.prefecture_id == by_code.id)
                    .values(prefecture_id=target_id)
                )
                by_code.id = target_id

        prefecture_id_by_code = {prefecture["code"]: prefecture["id"] for prefecture in PREFECTURES}
        existing_spots = {spot.key: spot for spot in session.scalars(select(Spot)).all()}

        for spot_data in SPOTS:
            prefecture_id = prefecture_id_by_code[spot_data["prefecture"]]
            existing = existing_spots.get(spot_data["key"])

            if existing is None:
                session.add(
                    Spot(
                        key=spot_data["key"],
                        name=spot_data["name"],
                        lat=spot_data["lat"],
                        lon=spot_data["lon"],
                        prefecture_id=prefecture_id,
                        is_active=True,
                    )
                )
                continue

            existing.name = spot_data["name"]
            existing.lat = spot_data["lat"]
            existing.lon = spot_data["lon"]
            existing.prefecture_id = prefecture_id
            existing.is_active = True

        has_user = session.scalar(select(UserEntity.id).limit(1))
        if has_user is None:
            for user in USERS:
                session.add(UserEntity(**user))

        session.commit()


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
    _seed_master_data()
