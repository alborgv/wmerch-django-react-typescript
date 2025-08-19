from django.urls import path

from .views import *

urlpatterns = [
    path("create-checkout-session/", CreateCheckOutSession.as_view() , name="create-checkout-session"),
    path('webhooks/stripe/', stripe_webhook_view, name='stripe-webhook'),
    path("merch/", MerchView.as_view() , name="merch"),
    path("merch/<int:pk>", MerchDetailView.as_view() , name="merch_details"),
    path("contact/", ContactView.as_view() , name="contact"),
    path("send_contact/", createContactView.as_view() , name="create_contact"),
    path("subscription/", SubscriptionView.as_view() , name="subscription"),
    path("send_subscription/", createSubscriptionView.as_view() , name="create_subscription"),
]