from django.db import models
from django.urls import reverse
from django.utils.text import slugify
import uuid

class MainCategory(models.Model):
    main_name = models.CharField(max_length=100, unique=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Main Categories"

    def __str__(self) -> str:
        return self.main_name
    
    def get_absolute_url(self):
        return reverse('main_categories', args=[str(self.main_name)])

class Category(models.Model):
    slug = models.SlugField(blank=True, null=True)
    main_cat_name = models.ForeignKey(MainCategory, on_delete=models.SET_NULL, null=True, blank=True)
    category_name = models.CharField(max_length=100)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "Categories"
    
    def __str__(self):
        return f"{self.main_cat_name} -- {self.category_name}"
    
    def get_main_category_name(self):
        return self.main_cat_name.main_name if self.main_cat_name else None

    def save(self, *args, **kwargs):
        if not self.slug:  # Generate slug only if it's not set
            self.slug = slugify(f"{self.get_main_category_name()}--{self.category_name}")
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('categories', args=[str(self.slug)])


class Product(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4)
    # image = models.ImageField(upload_to="products", blank=True, null=True)
    inside_number = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    setting = models.CharField(max_length=20)
    stone = models.CharField(max_length=100, blank=True, null=True)
    weight = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    # certificate = models.FileField(upload_to="certificate", blank=True, null=True)
    purchase_price = models.DecimalField(max_digits=20, decimal_places=2)
    sale_price = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    sold = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now = True)
    is_for_sale = models.BooleanField(default=False)
    index_page = models.BooleanField(default=False) 

    def __str__(self):
        return self.name
    

class Image(models.Model):
    item = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to="items", default="empty_f.jpeg", blank=True, null=True)

    def __str__(self):
        return self.item.name
    