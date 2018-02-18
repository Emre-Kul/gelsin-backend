# Gelsin (BG-HACKATHON-18 backend)
An application which the customers can give order from nearby shops.

## Features
* The customer can see nearby shops in a map.
* The customer can see shop products by selecting nearby shops in the map.
* The customer can give an order by preparing shopping list.

* The owner of a shop can sell their products by adding his/her shop to Gelsin.
* The owner of a shop can see other products to add new products for his/her shop. 

## Team Members
* Emre Kul
* Ramazan Vapurcu

## Api-Doc
### Customer
* GET customer : list the customers
* POST customer : add new customer
``` 
ExampleRequest = {
    'name': '',
    'latitude': '',
    'longitude': ''
}
```
* GET customer/id : get specific customer
### Order
* GET order : list the orders
* POST order : add new order
```
ExampleRequest = {
    'user':'user_id'
    'customer': 'customer_id',
    'products': '[product_id]'
}
```
* GET order/id : get specific order
* GET order/customer/customer_id : get orders of customer
### Product
* GET product : list the products
* POST product : add new produc
```
ExampleRequest = {
    'name': '',
    'price': '',
    'shop': 'shop_id'
}
```
* GET product/id : get specific product
* GET product/shop/shop_id : get shop's products
### Shop 
* GET shop : list the shops
* POST shop : add new shop
```
ExampleRequest = {
    'name': '',
    'category': '',
    'longitude': '',
    'latitude' : ''
}
```
* GET shop/id : get specific shop
* GET shop/near : get near shops
```
ExampleRequest = {
    'longitude':'',
    'latitude':'',
    'distance' : ''
}
```
### ShopCategory 
* GET shopCategory : list the shop categories
* GET shopCategory/id : get specific category
