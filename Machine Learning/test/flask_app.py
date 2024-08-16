import numpy as np
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load the model
model = pickle.load(open('model.pkl', 'rb'))

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.route('/Descion/Bank', methods=['POST'])
def rice():
    # Get the data from the POST request
    data = request.get_json(force=True)
    
    # Extract features from the data, taking the first value from each list
    try:
        p_test = [
            data['variance'][0], data['skewness'][0],
            data['curtosis'][0], data['entropy'][0], 
        ]
    except (KeyError, IndexError) as e:
        return jsonify({"error": f"Missing or incorrect key in the input data: {str(e)}"}), 400

    # Convert to numpy array
    X_test = np.array([p_test])
    
    # Make prediction using the loaded model
    try:
        y_test_hat = model.predict(X_test)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    # Convert the output to a Python int
    output = int(y_test_hat[0])
    
    return jsonify(output=output)

# Start the server
if __name__ == '__main__':
    app.run(port=5000, debug=True)
