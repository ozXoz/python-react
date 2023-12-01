from flask import Flask, jsonify, request
from flask_graphql import GraphQLView
from models import db
from schema import schema
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "your-secret-key"  # Change this secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgresql:Azr2010q+@localhost/backend'
db.init_app(app)
app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))
jwt = JWTManager(app)

# Mock database (you should replace this with your actual database logic)
users = {}

# JWT blacklist
blacklist = set()

# Check if a token has been blacklisted
@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in blacklist

@app.route('/signup', methods=['POST'])
def signup():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    if username in users:
        return jsonify({"msg": "Username already exists"}), 409

    # Here, you should ideally hash the password
    users[username] = password

    return jsonify({"msg": "Signup successful"}), 201

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    user_password = users.get(username, None)
    if user_password != password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()['jti']
    blacklist.add(jti)
    return jsonify({"msg": "Successfully logged out"}), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    app.run(debug=True)
