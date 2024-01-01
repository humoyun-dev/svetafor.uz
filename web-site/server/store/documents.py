# store/documents.py

from django_elasticsearch_dsl import Document, Index, fields
from elasticsearch_dsl import analyzer
from .models import Product, Category, CarType

# Define custom analyzers if needed
custom_analyzer = analyzer('custom_analyzer', tokenizer='standard', filter=['lowercase'])

product_index = Index('product_index')

@product_index.document
class ProductDocument(Document):
    class Django:
        model = Product

    # Specify fields to be indexed
    name = fields.TextField(attr='name', analyzer=custom_analyzer)
    description = fields.TextField(attr='description', analyzer=custom_analyzer)
    price = fields.FloatField(attr='price')
    date_added = fields.DateField(attr='date_added')
    category = fields.ObjectField(properties={
        'name': fields.TextField(attr='category.name', analyzer=custom_analyzer),
        'slug': fields.KeywordField(attr='category.slug')
    })
    car_types = fields.NestedField(properties={
        'name': fields.TextField(attr='name', analyzer=custom_analyzer),
        'slug': fields.KeywordField(attr='slug')
    })

    class Index:
        name = 'product_index'
        settings = {'number_of_shards': 1, 'number_of_replicas': 0}
