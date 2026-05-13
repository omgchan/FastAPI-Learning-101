from fastapi import FastAPI
from models import Product


app = FastAPI()



products = [ 
    Product(id=1, name="Laptop", price=999.99, description="High-performance laptop"),
    Product(id=2, name="Mouse", price=29.99, description="Wireless mouse"),
    Product(id=3, name="Keyboard", price=79.99, description="Mechanical keyboard")
]   

@app.get("/")
def read_root():
    return {"hello": "world"}

@app.get("/products")
def read_products():
    return products


@app.get("/products/{product_id}")
def read_product(product_id: int):
    for product in products:
        if product.id == product_id:
            return product
    return {"error": "Product not found"}

