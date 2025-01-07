import os

import requests
from dotenv import load_dotenv
from flask import Blueprint, jsonify

# Load environment variables from .env file
load_dotenv()

fmp_routes = Blueprint("fmp", __name__)

# Get the FMP API key from environment variables
fmp_api_key = os.getenv("FMP_API_KEY")


@fmp_routes.route("")
def fmp():
    """
    Query FMP for Apple Inc. income statement
    """
    if not fmp_api_key:
        return {"error": "API key is missing"}, 400

    # Define the URL for the API endpoint
    url = f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?apikey={fmp_api_key}"

    try:
        # Make a GET request to the FMP API
        response = requests.get(url)

        # Check if the request was successful
        if response.status_code == 200:
            data = response.json()
            return jsonify(data)  # Return the data as a JSON response
        else:
            return {
                "error": f"Error fetching data: {response.status_code}"
            }, response.status_code
    except requests.RequestException as e:
        return {"error": f"An error occurred: {str(e)}"}, 500
