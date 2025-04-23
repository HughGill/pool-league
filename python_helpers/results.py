from flask import Blueprint, jsonify
import json

results_bp = Blueprint('results', __name__, url_prefix='/server-api')

@results_bp.route('/results')
def get_results():
    with open('data/results.json') as f:
        results = json.load(f)
    return jsonify(results)
