from django.urls import path
from . import views
import uuid
urlpatterns = [
    path("", views.ProductListView.as_view(), name="products"),
    path("generic/", views.ProductListViewGeneric.as_view(), name="products_generic"),
    path("detail/<uuid:pk>/", views.SingleProductGeneric.as_view(), name="product_detail"),

    path("main-categories/", views.AllMainCategories.as_view(), name="main_categories")
]