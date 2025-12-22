# Uncomment the required imports before adding the code

from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import logout
from django.contrib import messages
from datetime import datetime

import json
import logging
from django.http import JsonResponse
from django.contrib.auth import login, authenticate
import logging
import json
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView


# Get an instance of a logger
logger = logging.getLogger(__name__)

# Home page using TemplateView (alternative to URL config)
class HomePageView(TemplateView):
    template_name = "djangoapp/Home.html"

# Example: Get list of dealers (replace with actual backend logic)
def get_dealerships(request, state=None):
    # Sample dealer data; in real app, fetch from database
    dealers = [
        {"id": 1, "name": "Dealer One", "state": "CA", "address": "123 Main St, CA"},
        {"id": 2, "name": "Dealer Two", "state": "NY", "address": "456 Broadway, NY"},
        {"id": 3, "name": "Dealer Three", "state": "CA", "address": "789 Sunset Blvd, CA"},
    ]

    # Filter dealers by state if state parameter is provided
    if state:
        filtered_dealers = [d for d in dealers if d["state"] == state]
    else:
        filtered_dealers = dealers

    # Return JSON response with status and dealers list
    return JsonResponse({
        "status": 200,
        "dealers": filtered_dealers
    })

# Example: Get dealer details
def get_dealer_details(request, dealer_id):
    # Sample dealer details; replace with real DB/MongoDB query in production
    dealer = {
        "id": dealer_id,
        "name": f"Dealer {dealer_id}",
        "state": "CA",
        "address": "123 Main St, CA",
        "city": "Los Angeles",
        "zip": "90001",
        "phone": "123-456-7890"
    }
    return JsonResponse({"dealer": dealer})

# Example: Get dealer reviews
def get_dealer_reviews(request, dealer_id):
    # Sample reviews data; replace with real database or MongoDB queries
    reviews = [
        {"review_id": 1, "dealer_id": dealer_id, "user_name": "Alice", "review": "Great service!", "sentiment": "positive", "purchase_date": "2023-01-15"},
        {"review_id": 2, "dealer_id": dealer_id, "user_name": "Bob", "review": "Friendly staff.", "sentiment": "neutral", "purchase_date": "2023-02-10"},
    ]
    return JsonResponse({"reviews": reviews})

# Example: Add review (POST)
@csrf_exempt
def add_review(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            # Extract review fields from data, e.g.:
            # user_name = data.get('user_name')
            # dealer_id = data.get('dealer_id')
            # review_text = data.get('review')
            # sentiment = data.get('sentiment')
            # purchase_date = data.get('purchase_date')
            
            # TODO: Save the review data to your database or MongoDB here
            
            return JsonResponse({"message": "Review added successfully"}, status=201)
        except Exception as e:
            logger.error(f"Error adding review: {str(e)}")
            return JsonResponse({"error": "Failed to add review"}, status=500)
    else:
        return JsonResponse({"error": "POST request required"}, status=405)

        import requests

def get_dealerships(request):
    url = "http://mongodb-service:27017/dealerships"  # Replace with your MongoDB service URL
    response = requests.get(url)
    if response.status_code == 200:
        dealers = response.json()
        return JsonResponse(dealers, safe=False)
    else:
        return JsonResponse({"error": "Failed to fetch dealers"}, status=500)