from rest_framework import generics
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from rest_framework.permissions import IsAuthenticated

class OrderListCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderItemsListCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer