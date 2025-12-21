# Uncomment the following imports before adding the Model code

# from django.db import models
# from django.utils.timezone import now
# from django.core.validators import MaxValueValidator, MinValueValidator


from django.db import models

class Dealer(models.Model):
    name = models.CharField(max_length=100)
    state = models.CharField(max_length=2)

    def __str__(self):
        return self.name

class Review(models.Model):
    dealer = models.ForeignKey(Dealer, on_delete=models.CASCADE)
    review_text = models.TextField()
    purchase_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Review for {self.dealer.name}"