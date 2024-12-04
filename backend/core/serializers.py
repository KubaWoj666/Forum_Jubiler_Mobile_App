from rest_framework import serializers
from .models import Product, Image, Category, MainCategory

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"

class MainCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MainCategory
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    main_cat_name = MainCategorySerializer()
    class Meta:
        model = Category
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    details = serializers.HyperlinkedIdentityField(view_name="product_detail", lookup_field="pk")
    images = ImageSerializer(many=True)
    # category = CategorySerializer()
    class Meta:
        model = Product
        fields = "__all__"

class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"



class MainCategoryWitchSubCategorySerializer(serializers.ModelSerializer):
    sub_categories = serializers.SerializerMethodField()
    class Meta: 
        model = MainCategory
        fields = ["id", "main_name", "sub_categories"]
    
    def get_sub_categories(self, obj):
        sub_cat = Category.objects.filter(main_cat_name=obj.id)
        return CategorySerializer(sub_cat, many=True).data