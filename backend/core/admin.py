from django.contrib import admin
from .models import Product, Category, MainCategory, Image
from django.utils.html import format_html


class ProductAdmin(admin.ModelAdmin):
    list_display = ["inside_number", "name", "is_for_sale"] 

    # def image_tag(self, obj):
    #     if obj.image:
    #         return format_html('<img src="{}" style="width: 50px"/>'.format(obj.image.url))
        

    # image_tag.short_description = 'Image'

class CategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "main_cat_name", "category_name"]


admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(MainCategory)
admin.site.register(Image)
