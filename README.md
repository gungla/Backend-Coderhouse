## API RESTful

- Run `npm install` to rebuild Node modules
- To run the server in dev mode `npm run dev`

## Configurar .env

-PORT=3001
- MONGO_URI= url a db
- JWT_SECRET=shhhhhhhhhhh

## ENDPOINTS

### Users

@route GET /api/users
@desc Lists all users, requires auth

@route GET /api/users/:id
@desc Gets one user, requires auth

@route PATCH /api/users/:id
@desc updates a user, requires auth, content-types: json

@route DELETE /api/users/:id
@desc Deletes a user, requires auth

@route POST /api/signup 
@desc creates a new user, for testing purpose allows to create an admin. Content-type: json. 

{
    "first_name": "First Name",
    "last_name": "Last Name",
    "email": "email@email.com",
    "password": "password",
    "confirm_password": "password",
    "phone": "1111111111",
    "admin": true,
    "address": {
        "street": "Street Name",
        "height": "111",
        "postal_code": "111111"
    }
}

@route POST /api/login 
@desc responds user a token. Content-type: json. 

{
    "email": "email@email.com",
    "password": "password"

}

### Products

@route GET /api/products 
@desc Responds with a list of all the products.

@route GET /api/products/:category
@desc Responds with a list of products by category.

@route POST /api/products/
@desc Creates a new product. Requires auth. Content-type: json.

{
    "product_name": "Product Name",
    "description": "Description",
    "category": "category",
    "price": 11,
    @route GET /api/image/:id
    @desc Gets the requested image.

@route PATCH /api/products/:id
@desc Updates an existing product. Requires auth. Content-type: json.

{
    "product_name": "Product Name",
    "description": "Description",
    "category": "category",
    "price": 11,
    "stock": 11

}

@route DELETE /api/products/:id
@desc Deletes a product. Requires auth. 

### Cart

@route GET /api/cart
@desc Gets the users cart. Requires an authorization token.

@route GET /api/cart/all
@desc Gets all the carts. Requires an authorization token.

@route POST /api/cart/add
@desc Adds a product to the user's cart. Requires an authorization token. Content-type: json.

{
    "product_id": "61cdc38918876711408c7d8a",
    "quantity": 1
}

@route DELETE /api/cart/delete
@desc Deletes a product from the user's cart. Requires an authorization token. Content-type: json.

{
    "product_id": "61cdc38918876711408c7d8a",
    "quantity": 1
}

@route POST /api/cart/submit
@desc Submits a cart. Requires an authorization token.

### Orders

@route GET /api/orders
@desc Gets all the orders of the user. Requires an authorization token.

@route GET /api/orders/:id
@desc Gets one of the orders of the user. Requires an authorization token.

@route POST /api/orders/complete
@desc Changes the state of one the orders to 'FINALIZED'. Requires an authorization token and id in the body. Content-type: json.

{
    "id": "61cddade18876711408c7dfa"
}

### Image 

@route POST /api/image/upload?idproduct=61cddade18876711408c7dfa
@desc Uploads an image of a product. Requires an authorization token, a query parameter and file in png or jpeg format.

@route GET /api/image/:id
@desc Gets the requested image.

@route DELETE /api/image/:id
@desc DELETES the image and updates the image reference in the respective product. Requires an authorization token. 

### Chat

You need the user token for use de chat
> Ver : [http://localhost:3001]


### Documentación

> Ver : [documentación postman](https://github.com/gungla/Backend-Coderhouse/tree/main/postman)

