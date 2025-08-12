#from django.shortcuts import render
from promotions.models import FoodPromotion
from rest_framework import generics
from .serializers import FoodPromotionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from datetime import date

class FoodPromotionList(generics.ListAPIView): 

    serializer_class = FoodPromotionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = FoodPromotion.objects.is_valid() #is_valid filters yet to expire (prefilter)
        deals_chosen = self.request.query_params.getlist('deal_type') #from frontend
        period_chosen = self.request.query_params.get('period_type', 'all') #from frontend

        today = date.today().isoformat()

        if deals_chosen: #first pass filter on deals
            
            filtered = []
            for promotion in queryset:
                if promotion.deal_type in deals_chosen:
                    filtered.append(promotion)
            
            queryset = filtered

        if period_chosen == 'today':

            filtered = []
            for promotion in queryset: #this takes the first pass filter and filters it
                if today in promotion.active_dates: #only promos that are today
                    filtered.append(promotion)

            queryset = filtered 
            
        elif period_chosen == 'upcoming':

            filtered = []
            for promotion in queryset:
                if today not in promotion.active_dates: #promotions to come, not inc today
                    filtered.append(promotion)
            
            queryset = filtered

        # else: 'all' option does nothing

        return queryset