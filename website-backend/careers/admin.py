from django.contrib import admin
from .models import Career,CareerApplication

admin.site.register(Career)


@admin.register(CareerApplication)
class CareerApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'career', 'applied_at','resume_link','linkedin_url','email', 'phone',)
    list_filter = ('career', 'applied_at')
    search_fields = ('name', 'email', 'phone','career')

