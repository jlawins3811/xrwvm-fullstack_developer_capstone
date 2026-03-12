# Uncomment the imports before you add the code
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views  # Use this if urls.py is inside djangoapp folder

app_name = 'djangoapp'

urlpatterns = [
    # # path for registration
     path('', views.index, name='index'),
    # path for login
    path('login', views.login_user, name='login'),

    # path for dealer reviews view
    path('dealer_reviews', views.get_dealer_reviews, name='dealer_reviews'),

    # path for add a review view
    path('add_review', views.add_review, name='add_review'),
    path('get_dealers/', views.get_dealers, name='get_dealers'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
