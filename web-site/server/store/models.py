from django.db import models
from django.utils.text import slugify
from django.utils import timezone

class ProductSearch(models.Model):
    query = models.CharField(max_length=255)

    def search_products(self):
        products = Product.objects.filter(
            models.Q(name__icontains=self.query) |
            models.Q(category__name__icontains=self.query) |
            models.Q(car_types__name__icontains=self.query)
        )
        return products

class PromoCode(models.Model):
    code = models.CharField(max_length=20, unique=True)
    discount_percent = models.PositiveIntegerField(default=0)
    expiration_date = models.DateField()

    def __str__(self):
        return self.code

    def is_valid(self):
        return timezone.now().date() <= self.expiration_date

def generate_unique_slug(model, name, base_slug=None):
    if not base_slug:
        base_slug = slugify(name)

    unique_slug = base_slug
    counter = 1

    while model.objects.filter(slug=unique_slug).exists():
        unique_slug = f"{base_slug}-{counter}"
        counter += 1

    return unique_slug

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image = models.ImageField(upload_to='store/category/images', blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, null=True, editable=False)

    def save(self, *args, **kwargs):
        self.slug = generate_unique_slug(Category, self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class CarType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    make = models.CharField(max_length=100)
    image = models.ImageField(upload_to='store/car-type/images', blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, null=True, editable=False)

    def save(self, *args, **kwargs):
        self.slug = generate_unique_slug(CarType, self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date_added = models.DateField(auto_now_add=True)
    slug = models.SlugField(unique=True, blank=True, null=True, editable=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    car_types = models.ManyToManyField(CarType, blank=True)
    in_stock = models.BooleanField(default=True, blank=True)
    video = models.FileField(upload_to='store/product/videos', blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = generate_unique_slug(Product, self.name)
        super().save(*args, **kwargs)
        # import ichida bo'lish kere teymalarin
        # from .documents import ProductDocument
        # ProductDocument().update(self)

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.FileField(blank=False, upload_to='store/product/images')

    def image_url(self):
        return self.image.url

class Carousel(models.Model):
    image = models.ImageField(upload_to='images/')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def image_url(self):
        return self.image.url