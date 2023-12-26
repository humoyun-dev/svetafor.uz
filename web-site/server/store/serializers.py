from rest_framework import serializers
from .models import Product, ProductImage, CarType, Category
from comment.models import Comment
from comment.serializer import CommentSerializer
from django.db.models import Avg

# Car type api start
#############################################################################################

class CarTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = ['id', 'name', 'slug', 'make', 'image']

class CarTypeDetailSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'products']

    def get_products(self, obj):
        products = Product.objects.filter(car_types=obj)
        serializer = ProductSerializer(products, many=True)
        return serializer.data

# Car type api end
###################################################################################################



# Product api start
###################################################################################################


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    car_types = CarTypeSerializer(many=True, read_only=True)
    average_stars = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'in_stock', 'category', 'price', 'images', 'car_types', 'average_stars']

    def get_images(self, obj):
        first_image = obj.images.first()
        if first_image:
            return ImageSerializer(first_image).data
        return None

    def get_category(self, obj):
        category = obj.category
        if category:
            return {
                'id': category.id,
                'name': category.name,
                'slug': category.slug,
            }
        return None

    def get_average_stars(self, obj):
        comments = Comment.objects.filter(product=obj)
        if comments.exists():
            average_stars = comments.aggregate(avg_stars=Avg('stars'))['avg_stars']
            return round(average_stars, 2)
        return None

class ProductDetailSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    car_types = CarTypeSerializer(many=True, read_only=True)
    comments = serializers.SerializerMethodField()
    average_stars = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'slug', 'in_stock', 'category', 'price', 'images', 'car_types', 'comments',
                  'average_stars']

    def get_images(self, obj):
        first_image = obj.images.first()
        if first_image:
            return ImageSerializer(first_image).data
        return None

    def get_category(self, obj):
        category = obj.category
        if category:
            return {
                'id': category.id,
                'name': category.name,
                'slug': category.slug,
            }
        return None

    def get_comments(self, obj):
        comments = Comment.objects.filter(product=obj)
        comment_serializer = CommentSerializer(comments, many=True)
        return comment_serializer.data

    def get_average_stars(self, obj):
        comments = Comment.objects.filter(product=obj)
        if comments.exists():
            average_stars = comments.aggregate(avg_stars=Avg('stars'))['avg_stars']
            return round(average_stars, 2)
        return None

#############################################################################################
# Product api end

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'image']

class CategoryDetailSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'products']

    def get_products(self, obj):
        products = Product.objects.filter(category=obj)
        serializer = ProductSerializer(products, many=True)
        return serializer.data

# Category api start
#############################################################################################

