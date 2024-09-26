import os
from flask import Flask, redirect, request, session, jsonify
from flask_cors import CORS
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS with credentials support for sessions

# Use environment variables for sensitive data
app.secret_key = os.getenv('FLASK_SECRET_KEY')
CLIENT_ID = os.getenv('SPOTIPY_CLIENT_ID')
CLIENT_SECRET = os.getenv('SPOTIPY_CLIENT_SECRET')
REDIRECT_URI = os.getenv('SPOTIPY_REDIRECT_URI')

# Initialize Spotify OAuth
def create_spotify_oauth():
    return SpotifyOAuth(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        redirect_uri=REDIRECT_URI,
        scope='user-top-read'
    )

# Route for login
@app.route('/login')
def login():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

# Callback URL that Spotify redirects to after authentication
@app.route('/callback')
def callback():
    sp_oauth = create_spotify_oauth()
    code = request.args.get('code')

    try:
        token_info = sp_oauth.get_access_token(code)
        session['token_info'] = token_info  # Store token info in session
    except Exception as e:
        return jsonify({"error": "Failed to get access token", "message": str(e)}), 500

    # After successful login, redirect to React app's /top-tracks route
    return redirect('http://localhost:5173/top-tracks')

# Helper function to check and refresh token if necessary
def get_token():
    token_info = session.get('token_info', None)
    if not token_info:
        return None

    sp_oauth = create_spotify_oauth()

    # Check if the token has expired, and refresh if necessary
    if sp_oauth.is_token_expired(token_info):
        token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
        session['token_info'] = token_info

    return token_info['access_token']

# API to fetch top tracks and return JSON data for React
@app.route('/api/top-tracks', methods=['GET'])
def get_top_tracks():
    access_token = get_token()
    if not access_token:
        return jsonify({'error': 'User not logged in or token expired'}), 401

    sp = spotipy.Spotify(auth=access_token)

    try:
        top_tracks = sp.current_user_top_tracks(limit=10, time_range='short_term')
        track_ids = [track['id'] for track in top_tracks['items']]

        audio_features = sp.audio_features(track_ids)

        # Prepare data to send back
        tracks_info = []
        for i, track in enumerate(top_tracks['items']):
            track_info = {
                'track_name': track['name'],
                'artist': track['artists'][0]['name'],  # Add artist info
                'album_cover': track['album']['images'][0]['url'],  # Add cover image
                'danceability': audio_features[i]['danceability'],
                'energy': audio_features[i]['energy'],
                'valence': audio_features[i]['valence'],
                'duration': track['duration_ms'] // 1000  # Convert duration from ms to seconds
            }
            tracks_info.append(track_info)

        return jsonify({"top_tracks": tracks_info}), 200

    except Exception as e:
        return jsonify({"error": "Failed to fetch top tracks", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8080)
