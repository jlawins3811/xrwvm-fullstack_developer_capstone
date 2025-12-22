# Uncomment the imports before you add the code
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from . import views

app_name = 'djangoapp'

urlpatterns = [
    # Backend API endpoints
    path('get_dealers', views.get_dealerships, name='get_dealers'),
    path('get_dealers/<str:state>', views.get_dealerships, name='get_dealers_by_state'),
    path('dealer/<int:dealer_id>/reviews', views.get_dealer_reviews, name='dealer_reviews'),
    path('add_review', views.add_review, name='add_review'),

    # React frontend routes serving index.html for React routing
    path('', TemplateView.as_view(template_name="index.html"), name='home'),
    path('dealers/', TemplateView.as_view(template_name="index.html"), name='dealers'),
    path('dealer/<int:dealer_id>/', TemplateView.as_view(template_name="index.html"), name='dealer_detail'),
    path('postreview/<int:dealer_id>/', TemplateView.as_view(template_name="index.html"), name='post_review'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
