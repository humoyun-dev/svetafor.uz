from django.urls import path
from .views import CommentCreate

urlpatterns = [
    path('comments/', CommentCreate.as_view(), name='comment-create'),
]
