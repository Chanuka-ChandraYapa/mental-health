import jwt
from flask import request, jsonify
import os


def token_required(f):
    def decorator(*args, **kwargs):
        token = request.headers.get('x-auth-token')
        if not token:
            return jsonify({'msg': 'No token, authorization denied'}), 401

        try:
            print(token)
            decoded = jwt.decode(token, os.getenv(
                'JWT_SECRET'), algorithms=['HS256'])
            request.user = decoded
        except jwt.ExpiredSignatureError:
            return jsonify({'msg': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'msg': 'Token is not valid'}), 401

        return f(*args, **kwargs)
    return decorator
