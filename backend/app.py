from flask import Flask, request, jsonify, send_from_directory
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId
from bson.errors import InvalidId

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client['videoOverlayDB']
overlays_collection = db['overlays']

# Create an overlay
@app.route("/api/overlay", methods=["POST"])
def create_overlay():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid data'}), 400

    position = data.get('position')
    text = data.get('text')

    if not position or not text:
        return jsonify({'error': 'Position and text are required'}), 400

    overlay_id = overlays_collection.insert_one(data).inserted_id
    return jsonify({'_id': str(overlay_id), 'position': position, 'text': text}), 201

# Get all overlays
@app.route('/api/overlay', methods=['GET'])
def get_overlays():
    overlays = list(overlays_collection.find())
    for overlay in overlays:
        overlay['_id'] = str(overlay['_id'])
    return jsonify(overlays), 200

# Update an overlay
@app.route('/api/overlay/<id>', methods=['PUT'])
def update_overlay(id):
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'Invalid input, data required for update.'}), 400

        overlays_collection.update_one({'_id': ObjectId(id)}, {'$set': data})
        return jsonify({'message': 'Overlay updated successfully'}), 200
    except InvalidId:
        return jsonify({'error': 'Invalid overlay ID.'}), 400

# Delete an overlay
@app.route('/api/overlay/<id>', methods=['DELETE'])
def delete_overlay(id):
    try:
        result = overlays_collection.delete_one({'_id': ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({'error': 'Overlay not found.'}), 404
        return jsonify({'message': 'Overlay deleted successfully'}), 200
    except InvalidId:
        return jsonify({'error': 'Invalid overlay ID.'}), 400

# Serve HLS Playlist and Segments
@app.route('/hls/<path:filename>')
def serve_hls_files(filename):
    try:
        return send_from_directory('hls', filename)
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
