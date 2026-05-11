from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..db import get_db
from ..models.user_entities import UserEntity
from ..schemas.user import Address, Company, Geo, UserResponse

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)) -> list[UserResponse]:
    rows = db.scalars(select(UserEntity).order_by(UserEntity.id.asc())).all()

    return [
        UserResponse(
            id=row.id,
            name=row.name,
            username=row.username,
            email=row.email,
            address=Address(
                street=row.street,
                suite=row.suite,
                city=row.city,
                zipcode=row.zipcode,
                geo=Geo(lat=row.geo_lat, lng=row.geo_lng),
            ),
            phone=row.phone,
            website=row.website,
            company=Company(
                name=row.company_name,
                catchPhrase=row.company_catch_phrase,
                bs=row.company_bs,
            ),
        )
        for row in rows
    ]
