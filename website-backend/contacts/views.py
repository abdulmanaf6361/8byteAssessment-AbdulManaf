import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Contact
from .serializers import ContactSerializer
from utils.response import success_response, error_response

logger = logging.getLogger("scifyx")

class ContactCreateAPIView(APIView):
    def post(self, request):
        logger.debug("ContactCreateAPIView.post called")
        try:
            serializer = ContactSerializer(data=request.data)
            if serializer.is_valid():
                instance = serializer.save()
                logger.info("Contact message saved", extra={"contact_id": getattr(instance, "id", None)})
                return Response(success_response(serializer.data, "Message sent successfully"), status=status.HTTP_201_CREATED)
            logger.error("Invalid contact data", extra={"errors": serializer.errors})
            return Response(error_response(serializer.errors, "Invalid data"), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # log the exception message + full traceback (logger.exception includes traceback)
            logger.exception("Unexpected error creating contact: %s", str(e), extra={"path": request.path, "method": request.method})
            return Response(error_response({}, "Internal server error"), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
