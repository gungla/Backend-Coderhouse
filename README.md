To run the application locally or on a server, see the .envExample file for the the environmental variables to be set. 

For testing purposes in VS Code, the extension Rest Client can be installed: https://marketplace.visualstudio.com/items?itemName=humao.rest-client. The file api.calls.http can be used to test the endpoints locally and the file api.calls.production.http when the application runs on a server.

***ENDPOINTS***

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

@route GET /api/cart
@desc Gets the users cart. Requires an authorization token.

@route GET /api/cart/all
@desc Gets all the carts. Requires an authorization token.

@route POST /api/cart/add
@desc Adds a product to the user's cart. Requires an authorization token. Content-type: json.

{
    "product_id": "61005f9b0210d10fcdd335b5",
    "quantity": 1
}

@route DELETE /api/cart/delete
@desc Deletes a product from the user's cart. Requires an authorization token. Content-type: json.

{
    "product_id": "61005f9b0210d10fcdd335b5",
    "quantity": 1
}

@route POST /api/cart/submit
@desc Submits a cart. Requires an authorization token.

@route GET /api/orders
@desc Gets all the orders of the user. Requires an authorization token.

@route GET /api/orders/:id
@desc Gets one of the orders of the user. Requires an authorization token.

@route POST /api/orders/complete
@desc Changes the state of one the orders to 'FINALIZED'. Requires an authorization token and id in the body. Content-type: json.

{
    "id": "6105b6e012004311411abcff"
}

@route POST /api/image/upload?idproduct=6105b6e012004311411abcff
@desc Uploads an image of a product. Requires an authorization token, a query parameter and file in png or jpeg format.

@route GET /api/image/:id
@desc Gets the requested image.

@route DELETE /api/image/:id
@desc DELETES the image and updates the image reference in the respective product. Requires an authorization token. 

