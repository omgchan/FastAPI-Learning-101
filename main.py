from fastapi import FastAPI, Depends
from models import Product
import database_models
from database import engine, session
from sqlalchemy.orm import Session

app = FastAPI()
database_models.Base.metadata.create_all(bind=engine)





products = [ 
    Product(id=1, name="Laptop", price=999.99, description="High-performance laptop"),
    Product(id=2, name="Mouse", price=29.99, description="Wireless mouse"),
    Product(id=3, name="Keyboard", price=79.99, description="Mechanical keyboard")
]   


def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

def init_db():
    db = session()
    count = db.query(database_models.Product).count()
    if count == 0:
        for product in products:
            db_product = database_models.Product(**product.model_dump() )
            db.add(db_product)
        db.commit()

init_db()





@app.get("/")
def read_root():
    return {"hello": "world"}

@app.get("/products")
def read_products(db: Session = Depends(get_db)):
    return db.query(database_models.Product).all()


@app.get("/products/{product_id}")
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == product_id).first()
    if db_product is None:
        return {"error": "Product not found"}
    return db_product

@app.post("/products")
def add_product(product: Product, db: Session = Depends(get_db)):
   db.add(database_models.Product(**product.model_dump()))
   db.commit()
   return {"message": "Product added successfully"}

@app.put("/products/{product_id}")
def update_product(product_id: int, updated_product: Product, db: Session = Depends(get_db)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == product_id).first()
    if db_product is None:
        return {"error": "Product not found"}
    for key, value in updated_product.model_dump().items():
        setattr(db_product, key, value)
    db.commit()
    return {"message": "Product updated successfully"}
           
        
@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == product_id).first()
    if db_product is None:
        return {"error": "Product not found"}
    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted successfully"}