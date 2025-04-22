from flask import Blueprint, jsonify
import json

tables_bp = Blueprint('tables', __name__, url_prefix='/api')

@tables_bp.route('/tables')
def get_tables():
    with open('data/tables.json') as f:
        tables = json.load(f)
    return jsonify(tables)
