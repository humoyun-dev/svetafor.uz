from django.db import models
from django.utils import timezone
from user.models import CustomUser
from store.models import Product, PromoCode

class Order(models.Model):
    shipping_address = models.CharField(max_length=255)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    date_added = models.DateTimeField(default=timezone.now, editable=False)
    promo_code = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    phone_number = models.CharField(max_length=12, default="none")

    def __str__(self):
        return f"Order #{self.id} by {self.user.username}"

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"