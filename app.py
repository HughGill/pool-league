from flask import Flask, request, render_template, jsonify
import random

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
    print("First Leg\n", first_leg)
    second_leg = [[(away, home) for home, away in round] for round in first_leg]
    print("Second Leg\n",second_leg)
    return first_leg + second_leg

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    div_one = request.json.get('div_one', [])
    print("Division 1\n", div_one)
    div_two = request.json.get('div_two', [])
    print("Division 2\n", div_two)
    
    fixtures = {
        "div_one": generate_fixtures(div_one),
        "div_two": generate_fixtures(div_two)
    }
    return jsonify(fixtures)

if __name__ == '__main__':
    app.run(debug=True)
