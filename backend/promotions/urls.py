from django.urls import path
from .views import FoodPromotionList

urlpatterns = [
    path('', FoodPromotionList.as_view(), name='food-promotion-list')
]