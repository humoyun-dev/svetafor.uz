# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<slug:slug>/', ProductDetail.as_view(), name='product-detail'),
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('categories/<slug:slug>/', CategoryDetail.as_view(), name='category-detail'),
    path('car-types/', CarTypeList.as_view(), name='car-type-list'),
    path('car-types/<slug:slug>/', CarTypeDetail.as_view(), name='car-type-detail'),
    path('search/', ProductSearchView.as_view(), name='search'),
    path('coupon/', CouponViewSet.as_view({'post': 'apply_coupon'}), name='apply_coupon'),
]
