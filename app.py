from flask import Flask, request, render_template, jsonify
import random
import os

FIXTURE_FILE = 'fixtures.json'

app = Flask(__name__)

def round_robin(teams):
    if len(teams) % 2 != 0:
        teams.append("BYE")  # Add dummy if odd number of teams

    n = len(teams)
    rounds = []
    for round_num in range(n - 1):
        round_matches = []
        for i in range(n // 2):
            home = teams[i]
            away = teams[n - 1 - i]
            if round_num % 2 == 0:
                round_matches.append((home, away))
            else:
                round_matches.append((away, home))
        rounds.append(round_matches)
        # Rotate teams (except the first)
        teams = [teams[0]] + [teams[-1]] + teams[1:-1]
    return rounds

def generate_fixtures(division):
    teams = division.copy()
    random.shuffle(teams)
    first_leg = round_robin(teams)
    second_leg = [[(away, home) for home, away in round] for round in first_leg]

    def structure_matches(rounds):
        structured = []
        for round in rounds:
            structured.append([
                {
                    "home": home,
                    "away": away,
                    "date": None,
                    "venue": None,
                    "status": "scheduled"
                } for home, away in round
            ])
        return structured

    return structure_matches(first_leg + second_leg)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
   div_one = request.json.get('div_one', [])
    div_two = request.json.get('div_two', [])
    
    fixtures = {
        "div_one": generate_fixtures(div_one),
        "div_two": generate_fixtures(div_two)
    }

    with open(FIXTURE_FILE, 'w') as f:
        json.dump(fixtures, f, indent=4)

    return jsonify({"status": "success", "message": "Fixtures generated", "fixtures": fixtures})



@app.route('/fixtures', methods=['GET'])
def get_fixtures():
    if not os.path.exists(FIXTURE_FILE):
        return jsonify({"status": "error", "message": "No fixture file found"}), 404

    with open(FIXTURE_FILE, 'r') as f:
        fixtures = json.load(f)

    return jsonify(fixtures)

@app.route('/update-fixture', methods=['PUT'])
def update_fixture():
    data = request.json
    division = data['division']
    round_number = data['round']  # 0-based index
    match_index = data['match']   # 0-based index
    update_fields = data['updates']  # dict of fields like {"date": "2025-05-01", "status": "postponed"}

    with open(FIXTURE_FILE, 'r') as f:
        fixtures = json.load(f)

    fixture = fixtures[division][round_number][match_index]
    fixture.update(update_fields)

    with open(FIXTURE_FILE, 'w') as f:
        json.dump(fixtures, f, indent=4)

    return jsonify({"status": "success", "updated": fixture})
    
if __name__ == '__main__':
    app.run(debug=True)
