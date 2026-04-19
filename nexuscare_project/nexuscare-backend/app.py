from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import bcrypt

app = Flask(__name__)
CORS(app)

# Connect to MySQL (WAMP default)
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root1234",  # Leave empty if no password
    database="nexuscare_project"
)

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_password(hashed, password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    password = hash_password(data['password'])
    
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        db.commit()
        return jsonify({"message": "User registered"}), 201
    except mysql.connector.IntegrityError:
        return jsonify({"error": "Username exists"}), 400
    finally:
        cursor.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    
    cursor = db.cursor()
    cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
    result = cursor.fetchone()
    cursor.close()
    
    if result:
        stored_hash = result[0]                    # This is bytes from DB
        if isinstance(stored_hash, str):           # If somehow it's string
            stored_hash = stored_hash.encode('utf-8')
        
        if bcrypt.checkpw(password.encode('utf-8'), stored_hash):
            return jsonify({"message": "Login successful", "username": username}), 200
    
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/complaints', methods=['GET'])
def get_complaints():
    username = request.args.get('username')
    role = request.args.get('role')  # We send 'admin' from frontend

    cursor = db.cursor(dictionary=True)
    
    if role == 'admin':
        cursor.execute("SELECT * FROM complaints ORDER BY created_at DESC")
    else:
        cursor.execute("SELECT * FROM complaints WHERE username = %s ORDER BY created_at DESC", (username,))
    
    complaints = cursor.fetchall() or []
    cursor.close()
    return jsonify(complaints)

@app.route('/complaints', methods=['POST'])
def create_complaint():
    data = request.json
    username = data['username']
    description = data['description']
    
    cursor = db.cursor()
    cursor.execute("INSERT INTO complaints (username, description) VALUES (%s, %s)", (username, description))
    db.commit()
    cursor.close()
    return jsonify({"message": "Complaint created"}), 201

@app.route('/complaints/<int:id>', methods=['PUT'])
def update_complaint(id):
    data = request.json
    description = data.get('description')
    status = data.get('status')
    
    cursor = db.cursor()
    if description and status:
        cursor.execute("UPDATE complaints SET description = %s, status = %s WHERE id = %s", (description, status, id))
    elif description:
        cursor.execute("UPDATE complaints SET description = %s WHERE id = %s", (description, id))
    elif status:
        cursor.execute("UPDATE complaints SET status = %s WHERE id = %s", (status, id))
    db.commit()
    cursor.close()
    return jsonify({"message": "Complaint updated"})

@app.route('/complaints/<int:id>', methods=['DELETE'])
def delete_complaint(id):
    cursor = db.cursor()
    cursor.execute("DELETE FROM complaints WHERE id = %s", (id,))
    db.commit()
    cursor.close()
    return jsonify({"message": "Complaint deleted"})

if __name__ == '__main__':
    app.run(debug=True)