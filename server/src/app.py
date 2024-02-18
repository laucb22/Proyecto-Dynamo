from flask import *
from flask_cors import CORS
from controllers import main_controller as mc
app = Flask(__name__)

CORS(app)

@app.route("/get")
def get_all():
    return mc.test_get()