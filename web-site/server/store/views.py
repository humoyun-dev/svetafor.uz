# views.py
from rest_framework import generics
from .models import *
from django.shortcuts import render
from .serializers import ProductSerializer, ProductDetailSerializer, CategorySerializer, CategoryDetailSerializer, CarTypeDetailSerializer, CarTypeSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

class CategoryDetail(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer
    lookup_field = 'slug'
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class CarTypeList(generics.ListAPIView):
    queryset = CarType.objects.all()
    serializer_class = CarTypeSerializer
    permission_classes = [IsAuthenticated]

class CarTypeDetail(generics.RetrieveAPIView):
    queryset = CarType.objects.all()
    serializer_class = CarTypeDetailSerializer
    lookup_field = 'slug'
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class ProductSearchView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        query_param = self.request.query_params.get('q', '')
        product_search = ProductSearch(query=query_param)
        return product_search.search_products()
