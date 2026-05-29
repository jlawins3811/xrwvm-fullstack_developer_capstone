# Uncomment the required imports before adding the code

# from django.shortcuts import render
# from django.http import HttpResponseRedirect, HttpResponse
# from django.contrib.auth.models import User
# from django.shortcuts import get_object_or_404, render, redirect
# from django.contrib.auth import logout
# from django.contrib import messages
# from datetime import datetime

from django.http import JsonResponse
from django.contrib.auth import login, authenticate
import logging
import json
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import csrf_exempt
import requests

# Logger instance
logger = logging.getLogger(__name__)

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('userName')
            password = data.get('password')

            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"userName": username, "status": "Authenticated"})
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=401)
        except json.JSONDecodeError:
            logger.error("Invalid JSON data in login request")
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    else:
        return JsonResponse({"error": "POST request required"}, status=405)
from django.shortcuts import render, redirect

def register_user(request):
    if request.method == 'POST':
        # Add registration logic here (e.g., form validation, user creation)
        return redirect('djangoapp:login')
    return render(request, 'djangoapp/register.html')
# Create a `login_request` view to handle sign in request
@csrf_exempt
def logout_user(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({"status": "Logged out"})
    else:
        return JsonResponse({"error": "POST request required"}, status=405)

def dealer_reviews(request):
    """
    Fetch and display dealers information from an external API.
    """
    api_url = "https://example.com/api/dealers"  # Replace with your actual API endpoint

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        dealers = response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching dealers data: {e}")
        return HttpResponse(f"Error fetching dealers data: {e}", status=500)

    context = {
        'dealers': dealers,
    }
    return render(request, 'djangoapp/dealer_reviews.html', context)

@csrf_exempt
def add_review(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # Process review data here (e.g., save to DB or send to API)
            # Example: review_text = data.get('review')
            # You would implement saving logic here

            return JsonResponse({"status": "Review submitted"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    else:
        return JsonResponse({"error": "POST request required"}, status=405)

from django.shortcuts import render
import requests  # if you use requests to call an external API

def get_dealers_from_api_or_db():
    # Example: Fetch dealer data from an external API
    try:
        response = requests.get('https://your-dealer-api-endpoint')
        response.raise_for_status()
        dealers = response.json()  # Adjust depending on API response format
        return dealers
    except Exception as e:
        print(f"Error fetching dealers: {e}")
        return []  # Return empty list if error occurs

def home(request):
    dealers = get_dealers_from_api_or_db()
    return render(request, 'home.html', {'dealers': dealers})