from django.contrib import admin

from .models import Order, OrderItem

def set_active(modeladmin, request, queryset):
    for order in queryset:
        order.status = not order.status
        order.save()

set_active.short_description = "Status o'zgartirish"

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'shipping_address', 'status', 'total_price', 'date_added', 'promo_code']
    inlines = [OrderItemInline]
    list_filter = ('user', 'status')
    search_fields = ('id', 'total_price', 'shipping_address', 'user__username')
    actions = [set_active]

admin.site.register(Order, OrderAdmin)
