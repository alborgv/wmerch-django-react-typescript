import django_filters
from .models import *

class MerchFilter(django_filters.FilterSet):
    class Meta:
        model = Merch
        fields = {
            'id': ['exact'],
        }