from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=155, blank=True, null=True)
    last_name = models.CharField(max_length=158, blank=True, null=True)
    username = models.CharField(max_length=12, unique=True)
    address = models.TextField(blank=True, null=True)
    passport = models.CharField(max_length=9, unique=True, blank=True, null=True)
    last_token_exchange = models.DateTimeField(blank=True, null=True)
    profile_image = models.ImageField(upload_to='user/profile/images', blank=True, null=True)

    def __str__(self):
        return self.username

@receiver(post_save, sender=CustomUser)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        create_new_auth_token(instance)
    else:
        update_auth_token(instance)

def create_new_auth_token(user_instance):
    # Create a new authentication token
    token, created = Token.objects.get_or_create(user=user_instance)

    # Update the last_token_exchange field to the current date and time
    user_instance.last_token_exchange = timezone.now()
    user_instance.save()

def update_auth_token(user_instance):
    if user_instance.last_token_exchange is not None:
        # Check if it's been 30 days since the last token exchange
        days_since_last_exchange = (timezone.now() - user_instance.last_token_exchange).days
        if days_since_last_exchange >= 30:
            create_new_auth_token(user_instance)