from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics


from .models import Product, MainCategory, Category
from .serializers import ProductSerializer, ProductDetailSerializer, MainCategorySerializer, CategorySerializer, MainCategoryWitchSubCategorySerializer

class ProductListView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ProductSerializer(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductListViewGeneric(generics.ListCreateAPIView):
    
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        is_for_sale = self.request.query_params.get("is_for_sale")
        category = self.request.query_params.get("category")
        sub_category = self.request.query_params.get("sub_category")
        if is_for_sale is not None:
            is_for_sale = is_for_sale.lower() == "true"
            queryset = queryset.filter(is_for_sale=is_for_sale)
        if category and sub_category:
            queryset = queryset.filter(category__main_cat_name__main_name=category, category__category_name=sub_category)
        if category:
            queryset = queryset.filter(category__main_cat_name__main_name=category)
        
        return queryset[:4]
        

class SingleProductGeneric(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # lookup_field = "id"


class AllMainCategories(generics.ListCreateAPIView):
    queryset = MainCategory.objects.all()
    serializer_class = MainCategoryWitchSubCategorySerializer