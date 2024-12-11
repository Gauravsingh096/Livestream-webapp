from flask import Flask, request, jsonify, send_from_directory
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId
from bson.errors import InvalidId

