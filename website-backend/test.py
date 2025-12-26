import os
import django
from django.core.files.base import ContentFile
from django.conf import settings



os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")  # 🔁 Replace this
django.setup()
from django.core.files.storage import default_storage
print("📦 Storage backend in use:", default_storage.__class__)

def test_s3_connection():
    try:
        file_name = "s3_test/test_file.txt"
        content = ContentFile(b"This is a test file for checking S3 connection.")
        
        saved_path = default_storage.save(file_name, content)
        file_url = default_storage.url(saved_path)

        print("✅ File uploaded to S3 successfully!")
        print("🔗 File URL:", file_url)
    except Exception as e:
        print("❌ Failed to upload file to S3.")
        print("Error:", str(e))


if __name__ == "__main__":
    test_s3_connection()
