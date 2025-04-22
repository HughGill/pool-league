from flask import Flask
from python_helpers.fixtures import fixtures_bp
from python_helpers.tables import tables_bp
from python_helpers.results import results_bp

app = Flask(__name__)
app.register_blueprint(fixtures_bp)
app.register_blueprint(tables_bp)
app.register_blueprint(results_bp)

@app.route('/')
def index():
    return "API Server Running"

    
if __name__ == '__main__':
    app.run(debug=True)
