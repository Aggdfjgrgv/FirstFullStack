from sqlalchemy import select

from .db import Base, SessionLocal, engine
from .models.marine_entities import Prefecture, Spot
from .models.user_entities import UserEntity


PREFECTURES = [
    {"code": "okinawa", "name": "沖縄県"},
    {"code": "shizuoka", "name": "静岡県"},
    {"code": "tokyo", "name": "東京都"},
    {"code": "kagoshima", "name": "鹿児島県"},
]

SPOTS = [
    {"key": "okinawa_kerama", "name": "慶良間諸島（沖縄）", "lat": 26.1667, "lon": 127.2833, "prefecture": "okinawa"},
    {"key": "okinawa_iriomote", "name": "西表島（沖縄）", "lat": 24.3167, "lon": 123.8667, "prefecture": "okinawa"},
    {"key": "okinawa_ishigaki", "name": "石垣島（沖縄）", "lat": 24.3333, "lon": 124.1333, "prefecture": "okinawa"},
    {"key": "izu_osezaki", "name": "大瀬崎（伊豆）", "lat": 35.0333, "lon": 138.7833, "prefecture": "shizuoka"},
    {"key": "izu_futo", "name": "富戸（伊豆）", "lat": 34.9167, "lon": 139.1333, "prefecture": "shizuoka"},
    {"key": "izu_yawatano", "name": "八幡野（伊豆）", "lat": 34.8833, "lon": 139.1167, "prefecture": "shizuoka"},
    {"key": "ogasawara", "name": "小笠原諸島", "lat": 27.0833, "lon": 142.1833, "prefecture": "tokyo"},
    {"key": "yakushima", "name": "屋久島（鹿児島）", "lat": 30.3667, "lon": 130.6500, "prefecture": "kagoshima"},
    {"key": "amami", "name": "奄美大島（鹿児島）", "lat": 28.3667, "lon": 129.5000, "prefecture": "kagoshima"},
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
        has_spot = session.scalar(select(Spot.id).limit(1))
        if has_spot is None:
            prefecture_by_code: dict[str, Prefecture] = {}
            for prefecture in PREFECTURES:
                row = Prefecture(code=prefecture["code"], name=prefecture["name"])
                session.add(row)
                prefecture_by_code[prefecture["code"]] = row

            session.flush()

            for spot in SPOTS:
                session.add(
                    Spot(
                        key=spot["key"],
                        name=spot["name"],
                        lat=spot["lat"],
                        lon=spot["lon"],
                        prefecture_id=prefecture_by_code[spot["prefecture"]].id,
                    )
                )

        has_user = session.scalar(select(UserEntity.id).limit(1))
        if has_user is None:
            for user in USERS:
                session.add(UserEntity(**user))

        session.commit()


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
    _seed_master_data()
