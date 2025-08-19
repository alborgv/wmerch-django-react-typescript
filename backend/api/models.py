from django.db import models

class Payment(models.Model):
    stripe_session_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_payment_intent = models.CharField(max_length=255, blank=True, null=True)
    currency = models.CharField(max_length=10, default="usd")
    
    product = models.ForeignKey('Merch', on_delete=models.CASCADE, blank=True, null=True)
    user_email = models.EmailField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid = models.BooleanField(default=False)

    phone = models.CharField(max_length=20, blank=True, null=True)
    address_line1 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    
class Merch(models.Model):

    id = models.AutoField(primary_key=True, blank=True)
    name = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=500, blank=True)
    price = models.CharField(max_length=255, blank=True)
    stock = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class MerchImage(models.Model):
    product = models.ForeignKey(Merch, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="wmerch/")
    alt_text = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return f"{self.product.name} - {self.id}"
    
class MerchPhoto(models.Model):
    merch = models.ForeignKey(Merch, related_name='photos', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='merch_photos/') 
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.merch.name

class Contact(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True)
    email = models.CharField(max_length=500, blank=True)
    phone = models.CharField(max_length=255, blank=True)
    message = models.CharField(max_length=1000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.name
    

class Subscription(models.Model):

    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return self.email