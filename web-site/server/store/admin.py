from django.contrib import admin
from .models import CarType, Product, Category, ProductImage, PromoCode

def toggle_in_stock(modeladmin, request, queryset):
    for product in queryset:
        product.in_stock = not product.in_stock
        product.save()

toggle_in_stock.short_description = 'Toggle In Stock Status'

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]
    list_display = ('name', 'category', 'in_stock', 'price')
    list_filter = ('category', 'in_stock')  # Updated list_filter fields
    search_fields = ('name', 'category__name')  # Use double-underscore to search the related field
    actions = [toggle_in_stock]

admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(CarType)
admin.site.register(PromoCode)