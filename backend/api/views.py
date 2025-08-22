import os
import stripe
from django.conf import settings
from django.shortcuts import redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response


from .serializers import *
from .models import *
from .filters import *


stripe.api_key = settings.STRIPE_SECRET_KEY
API_URL = os.environ.get("API_URL")

class PaymentListView(generics.ListAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    
class CreateCheckOutSession(APIView):
    def post(self, request, *args, **kwargs):
        prod_id = request.data.get('prod_id')

        try:
            product = Merch.objects.get(id=prod_id)
            first_image = product.images.first()
            image_url = request.build_absolute_uri(first_image.image.url)
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price_data': {
                            'currency': 'cop',
                            'unit_amount': int(product.price) * 100,
                            'product_data': {
                                'name': product.name,
                                'images': [image_url if image_url else []]
                            }
                        },
                        'quantity': 1,
                    },
                ],
                metadata={"product_id": product.id},
                mode='payment',
                success_url=API_URL + '/success',
                cancel_url=API_URL + '/',
                customer_creation='always',
                customer_email=None, 
                phone_number_collection={
                    "enabled": True
                },
                shipping_address_collection={
                    "allowed_countries": ['US', 'CA', 'CO', 'MX', 'ES']
                },
            )
            return Response({"url": checkout_session.url}, status=200)

        except Exception as e:
            return Response({
                'msg': 'something went wrong while creating stripe session',
                'error': str(e)
            }, status=500)


@csrf_exempt
def stripe_webhook_view(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
        payload, sig_header, settings.STRIPE_SECRET_WEBHOOK
        )
    except ValueError as e:
        return Response(status=400)
    except stripe.error.SignatureVerificationError as e:
        return Response(status=400)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        
        customer_email=session['customer_details']['email']
        customer_phone=session['customer_details']['phone']
        customer_address=session['customer_details']['address']
        prod_id=session['metadata']['product_id']
        product=Merch.objects.get(id=prod_id)
        
        Payment.objects.create(
            stripe_session_id=session.id,
            stripe_payment_intent=session.payment_intent,
            product=product,
            user_email=customer_email,
            amount=session['amount_total'] / 100,
            paid=True,
            phone=customer_phone,
            address_line1=customer_address.get('line1'),
            city=customer_address.get('city'),
            country=customer_address.get('country'),
            postal_code=customer_address.get('postal_code'),
        )
    return HttpResponse(status=200)
    
class CreatePayemntIntentView(APIView):
    def post(self, request, *args, **kwargs):
        amount = request.data.get('amount')
        currency = request.data.get('currency')
        user_email = request.data.get('user_email')
        
        if not user_email:
            return Response({'error': 'Invalid email'}, status=400)
        if not amount or int(amount) <= 0:
            return Response({'error': 'Invalid amount'}, status=400)
        if not currency:
            return Response({'error': 'Currency is required'}, status=400)

        supported_currencies = ['usd', 'eur']
        
        if currency.lower() not in supported_currencies:
            return Response({'error': 'Unsupported currency'}, status=400)

        try:
            intent = stripe.PaymentIntent.create(
                amount = int(amount),
                currency = currency,
            )
            
            payment_data = {
                'amount': amount,
                'currency': currency,
                'stripe_payment_id': intent['id'],
                'user_email': user_email
            }
            
            serializer = PaymentSerializer(data=payment_data)
            
            if serializer.is_valid():
                serializer.save()
                print("TEST4")
                return Response({
                    'clintSecret': intent['client_secret'],
                    'payment': serializer.data,
                }, status=status.HTTP_201_CREATED)

        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=400)

class MerchView(generics.ListAPIView):
    queryset = Merch.objects.all()
    serializer_class = MerchSerializer
    filterset_class = MerchFilter

class MerchDetailView(generics.RetrieveAPIView):
    queryset = Merch.objects.all()
    serializer_class = MerchSerializer

class ContactView(generics.ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class createContactView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class SubscriptionView(generics.ListAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    
class createSubscriptionView(generics.CreateAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer