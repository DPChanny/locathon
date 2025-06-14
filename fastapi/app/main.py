import logging
from logging import Formatter

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.logger import logger
from fastapi.middleware.cors import CORSMiddleware
import db.database as database

import db.entity

from api.router.user_router import user_router
from api.router.store_router import store_router
from api.router.donation_router import donation_router

from core.exception import (
    CustomException,
    custom_exception_handler,
    validation_exception_handler,
)


logger.setLevel(logging.INFO)

if not logger.hasHandlers():
    handler = logging.StreamHandler()
    formatter = Formatter(
        "%(filename)s %(funcName)s():%(lineno)d\n%(message)s"
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)

app = FastAPI()

app.add_middleware(
    CORSMiddleware, # type: ignore
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    database.Base.metadata.create_all(bind=database.engine)


app.include_router(user_router, prefix="/api")
app.include_router(store_router, prefix="/api")
app.include_router(donation_router, prefix="/api")


app.add_exception_handler(CustomException, custom_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
