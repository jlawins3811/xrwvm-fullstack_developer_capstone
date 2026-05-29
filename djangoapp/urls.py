# Uncomment the imports before you add the code
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'djangoapp'

urlpatterns = [
    # User registration path
    path('register/', views.register_user, name='register'),

    # User login path
    path('login/', views.login_user, name='login'),

    # Dealer reviews view path
    path('reviews/', views.dealer_reviews, name='reviews'),

    # Add a review view path
    path('add_review/', views.add_review, name='add_review'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
