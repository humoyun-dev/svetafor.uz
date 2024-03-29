# views.py
from rest_framework import generics
from rest_framework import viewsets, status
from .serializers import *
from rest_framework.permissions import AllowAny
from rest_framework.response import Response



class ProductList(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class CategoryList(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class CarTypeList(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = CarType.objects.all()
    serializer_class = CarTypeSerializer

class CarTypeDetail(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = CarType.objects.all()
    serializer_class = CarTypeDetailSerializer
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class ProductSearchView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer

    def get_queryset(self):
        query_param = self.request.query_params.get('q', '')
        product_search = ProductSearch(query=query_param)
        return product_search.search_products()

class CouponViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = PromoCode.objects.all()
    serializer_class = PromoCodeSerializer

    def apply_coupon(self, request):
        coupon_code = request.data.get('coupon_code', '')
        try:
            coupon = PromoCode.objects.get(code=coupon_code)
        except PromoCode.DoesNotExist:
            return Response({'message': 'Invalid coupon code'}, status=status.HTTP_200_OK)

        if coupon.is_valid():
            # Apply the discount logic here (customize based on your needs)
            discount_amount = coupon.discount_percent
            return Response({'message': 'Coupon applied successfully', 'discount_amount': discount_amount}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Expired coupon code'}, status=status.HTTP_200_OK)

class CarouselViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Carousel.objects.all()
    serializer_class = CarouselSerializer