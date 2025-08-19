from .models import *
from rest_framework import serializers

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'amount', 'currency', 'stripe_payment_id', 'created_at', 'user_email']

class MerchImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MerchImage
        fields = ('id', 'image', 'alt_text')

class MerchSerializer(serializers.ModelSerializer):
    images = MerchImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Merch
        fields = ('id', 'name', 'description', 'price', 'stock', 'images', 'created_at')


class MerchCreateSerializer(serializers.ModelSerializer):
    photos = serializers.ListField(
        child=serializers.ImageField(), write_only=True
    )

    class Meta:
        model = Merch
        fields = ['id', 'name', 'description', 'price', 'stock', 'photos']

    def create(self, validated_data):
        photos_data = validated_data.pop('photos')
        merch = Merch.objects.create(**validated_data)
        for photo_data in photos_data:
            MerchImage.objects.create(merch=merch, image=photo_data)
        return merch
    

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('id', 'name', 'email', 'phone', 'message', 'created_at')

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('id', 'email', 'created_at')