from rest_framework import serializers

from store.models import Product
from store.serializers import ProductSerializer
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    product_data = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'order', 'product_data']

    def get_product_data(self, obj):
        products = Product.objects.filter(id=obj.product_id)
        serializer = ProductSerializer(products, many=True)
        return serializer.data

class OrderSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'shipping_address', 'user', 'status', 'total_price', 'date_added', 'items', 'promo_code']

    def get_items(self, obj):
        products = OrderItem.objects.filter(order=obj)
        serializer = OrderItemSerializer(products, many=True)
        return serializer.data