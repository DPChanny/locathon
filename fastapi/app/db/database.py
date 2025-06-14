from fastapi.logger import logger
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from tenacity import retry, wait_fixed, stop_after_attempt
import core.envs as envs

MYSQL_URL = (
    f"mysql+pymysql://{envs.MYSQL_USER}:{envs.MYSQL_PASSWORD}"
    f"@{envs.MYSQL_HOST}:{envs.MYSQL_PORT}/{envs.MYSQL_DATABASE}"
)

@retry(
    stop=stop_after_attempt(20),
    wait=wait_fixed(5),
)
def _create_engine():
    _engine = create_engine(
        MYSQL_URL,
        pool_pre_ping=True,
        future=True,
        echo=True,
        pool_timeout=3,
    )
    with _engine.connect():
        logger.info("MySQL connection successful")
    return _engine

engine = _create_engine()

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    future=True
)

Base = declarative_base()
