import numpy as np # type: ignore
# pip i scikit-learn
import pickle
model = pickle.load(open('model.pkl','rb'))
# pip i Flask
from flask import Flask, request,jsonify
app = Flask(__name__)
# pip i flask-core
from flask_cors import CORS # type: ignore
CORS(app)
@app.route('/linear-regression/height-weight', methods=['POST'])
def heightweight():
  # get the data from the POST request
  data = request.get_json(force=True)
  # make prediction using model loaded from disk as per the data
  p_test = data['height']
  X_test = np.array([p_test])
  y_test_hat = model.predict(X_test)
  # take the first value of predcition
  output = y_test_hat[0]
  return jsonify(output)
  # start server
if __name__ == '__main__':
    app.run(port=5000, debug=True)