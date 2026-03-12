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
from django.views.decorators.csrf import csrf_exempt
# from .populate import initiate
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


# Get an instance of a logger
logger = logging.getLogger(__name__)

from django.shortcuts import render

def index(request):
    return render(request, 'Home.html')
# Create a `login_request` view to handle sign in request
@csrf_exempt
def login_user(request):
    # Get username and password from request.POST dictionary
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    # Try to check if provide credential can be authenticated
    user = authenticate(username=username, password=password)
    data = {"userName": username}
    if user is not None:
        # If user is valid, call login method to login current user
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
    return JsonResponse(data)

@csrf_exempt
def logout_user(request):
    logout(request)
    return JsonResponse({"status": "Logged out"})

# Create a `registration` view to handle sign up request
# @csrf_exempt
# def registration(request):
# ...

from django.http import JsonResponse

def get_dealers(request):
    # This is a placeholder response, replace with your actual logic
    dealers = [
        {"id": 1, "name": "Dealer One"},
        {"id": 2, "name": "Dealer Two"},
    ]
    return JsonResponse({"dealers": dealers})

from django.http import JsonResponse

def get_dealer_reviews(request):
    # Your code to get dealer reviews here
    data = {"reviews": []}  # Example placeholder data
    return JsonResponse(data)

# Create a `get_dealer_details` view to render the dealer details
# def get_dealer_details(request, dealer_id):
# ...

@csrf_exempt
def add_review(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # Extract review details from data, for example:
            review_text = data.get('review')
            rating = data.get('rating')
            # You would typically save this review to your database here
            
            # Return success response
            return JsonResponse({'message': 'Review added successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)
