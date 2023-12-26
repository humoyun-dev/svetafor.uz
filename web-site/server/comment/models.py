from django.db import models
from user.models import CustomUser
from store.models import Product
from django.core.validators import MinValueValidator, MaxValueValidator

class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=False)
    text = models.TextField(default="")
    date = models.DateTimeField(auto_now_add=True)
    stars = models.IntegerField(default=0, validators=[MinValueValidator(1), MaxValueValidator(5)])
    product = models.ForeignKey(Product, blank=True, on_delete=models.CASCADE, null=True, default="")

    def __str__(self):
        return f"{self.text[:100]}... by {self.user.username}"