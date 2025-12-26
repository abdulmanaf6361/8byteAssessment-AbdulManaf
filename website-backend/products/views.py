import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer
from utils.response import success_response, error_response

logger = logging.getLogger("scifyx")

class ProductListAPIView(APIView):
    def get(self, request):
        logger.debug("ProductListAPIView.get called")
        try:
            products = Product.objects.filter(active=True).order_by('created_at')
            serializer = ProductSerializer(products, many=True)
            logger.info("Product list fetched", extra={"count": len(serializer.data)})
            return Response(success_response(serializer.data, "Product list fetched"))
        except Exception as e:
            logger.exception("Error fetching product list: %s", str(e), extra={"path": request.path, "method": request.method})
            return Response(error_response({}, "Internal server error"), status=status.HTTP_500_INTERNAL_SERVER_ERROR)