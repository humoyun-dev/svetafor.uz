# urls.py

from django.urls import path
from .views import *

urlpatterns = [
    path('', OrderListCreateView.as_view(), name='order-list-create'),
    path('item/', OrderItemsListCreateView.as_view(), name='order-item-create'),
]
