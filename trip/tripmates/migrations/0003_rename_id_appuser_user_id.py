# Generated by Django 5.1.2 on 2024-10-19 14:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tripmates', '0002_rename_user_id_appuser_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appuser',
            old_name='id',
            new_name='user_id',
        ),
    ]