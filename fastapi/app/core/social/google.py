import requests
import cachetools
from fastapi.logger import logger
from jose import jwt, JWTError, jwk
import core.envs as envs

_jwks_cache = cachetools.TTLCache(maxsize=1, ttl=3600)

def _get_google_jwks() -> dict:
    if "keys" not in _jwks_cache:
        resp = requests.get(envs.GOOGLE_JWKS)
        resp.raise_for_status()
        _jwks_cache["keys"] = resp.json()["keys"]
    return _jwks_cache["keys"]

def verify(id_token: str) -> tuple[str, str, str]:
    header = jwt.get_unverified_header(id_token)
    jwks = { key["kid"]: key for key in _get_google_jwks() }
    if header["kid"] not in jwks:
        raise JWTError(f"Unknown kid: {header['kid']}")

    unverified = jwt.get_unverified_claims(id_token)
    logger.info(f"expected aud: {envs.GOOGLE_CLIENT_ID}")
    logger.info("unverified iss:" + str(unverified.get("iss")))
    logger.info("unverified aud:" + str(unverified.get("aud")))
    logger.info("unverified exp:" + str(unverified.get("exp")))

    jwk_dict = jwks[header["kid"]]
    claims = jwt.decode(
        id_token,
        jwk_dict,
        algorithms=[header["alg"]],
        issuer=envs.GOOGLE_ISS,
        audience=envs.GOOGLE_CLIENT_ID,
        options={"require": ["exp", "iat", "sub"]},
    )

    return claims["sub"], claims.get("name", ""), claims.get("picture", "")
