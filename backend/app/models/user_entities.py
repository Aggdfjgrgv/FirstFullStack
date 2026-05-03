from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from ..db import Base


class UserEntity(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    username: Mapped[str] = mapped_column(String(80), unique=True, nullable=False, index=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    street: Mapped[str] = mapped_column(String(120), nullable=False)
    suite: Mapped[str] = mapped_column(String(120), nullable=False)
    city: Mapped[str] = mapped_column(String(120), nullable=False)
    zipcode: Mapped[str] = mapped_column(String(30), nullable=False)
    geo_lat: Mapped[str] = mapped_column(String(30), nullable=False)
    geo_lng: Mapped[str] = mapped_column(String(30), nullable=False)
    phone: Mapped[str] = mapped_column(String(80), nullable=False)
    website: Mapped[str] = mapped_column(String(120), nullable=False)
    company_name: Mapped[str] = mapped_column(String(120), nullable=False)
    company_catch_phrase: Mapped[str] = mapped_column(String(200), nullable=False)
    company_bs: Mapped[str] = mapped_column(String(200), nullable=False)
