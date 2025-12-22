# Uncomment the imports below before you add the function code
import requests
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import CarDealer, DealerReview
from .restapis import get_dealers_from_cf, get_dealer_reviews_from_cf, post_request

# Example URL endpoints (replace with your actual URLs)
DEALERSHIPS_URL = "https://your-cloud-function-url/get-dealers"
REVIEWS_URL = "https://your-cloud-function-url/get-reviews"
POST_REVIEW_URL = "https://your-cloud-function-url/post-review"

def get_dealers_from_cf(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        dealers = response.json()
        return dealers
    except requests.exceptions.RequestException as e:
        print(f"Error fetching dealers: {e}")
        return []

def get_dealer_reviews_from_cf(url, dealer_id):
    try:
        response = requests.get(url, params={'dealerId': dealer_id})
        response.raise_for_status()
        reviews = response.json()
        return reviews
    except requests.exceptions.RequestException as e:
        print(f"Error fetching reviews: {e}")
        return []

def post_request(url, json_payload):
    try:
        response = requests.post(url, json=json_payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error posting review: {e}")
        return None

def get_dealers(request):
    if request.method == "GET":
        dealers = get_dealers_from_cf(DEALERSHIPS_URL)
        return JsonResponse(dealers, safe=False)
    else:
        return JsonResponse({"error": "GET method required"}, status=400)

def get_dealer_reviews(request, dealer_id):
    if request.method == "GET":
        reviews = get_dealer_reviews_from_cf(REVIEWS_URL, dealer_id)
        return JsonResponse(reviews, safe=False)
    else:
        return JsonResponse({"error": "GET method required"}, status=400)

@csrf_exempt
def add_review(request):
    if request.method == "POST":
        try:
            review_data = json.loads(request.body)
            response = post_request(POST_REVIEW_URL, review_data)
            if response:
                return JsonResponse(response, status=201)
            else:
                return JsonResponse({"error": "Failed to post review"}, status=500)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    else:
        return JsonResponse({"error": "POST method required"}, status=400)