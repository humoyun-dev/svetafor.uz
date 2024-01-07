from rest_framework import generics, status
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

class OrderListCreateView(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        # Ensure that the token is present and has a user associated with it
        if not request.auth or not request.auth.user:
            return Response({'detail': 'Invalid or missing token.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Extract user from the token
        user = request.auth.user

        # Create a mutable copy of the QueryDict
        mutable_data = request.data.copy()

        # Set the user field in the mutable data to the authenticated user
        mutable_data['user'] = user.id

        # Continue with your logic to create a new order
        serializer = OrderSerializer(data=mutable_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderItemsListCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)