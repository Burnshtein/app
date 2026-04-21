from django.urls import path
from core.api.views import RegisterView, LoginView, ProductListView, ProductDetailView

urlpatterns = [
    path('auth/register', RegisterView.as_view()),
    path('auth/login', LoginView.as_view()),
    path('products', ProductListView.as_view()),
    path('products/<int:product_id>', ProductDetailView.as_view()),
]