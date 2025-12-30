from django.urls import path, re_path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from . import views

app_name = 'djangoapp'

 
urlpatterns = [
    # API endpoints
   path('dealers/', TemplateView.as_view(template_name="index.html")),
    path('dealer/<int:dealer_id>/', TemplateView.as_view(template_name="index.html")),
    path('postreview/<int:dealer_id>/', TemplateView.as_view(template_name="index.html")),
    path('api/get_dealers/', views.get_dealerships, name='get_dealers'),
    path('api/dealer/<int:dealer_id>/reviews/', views.get_dealer_reviews, name='dealer_reviews'),
    path('api/add_review/', views.add_review, name='add_review'),

    # React frontend routes: serve index.html for React Router, excluding static files
    re_path(r'^(?!static/).*$', TemplateView.as_view(template_name="index.html")),
]

# Serve static files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)