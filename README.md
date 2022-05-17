# SHOP BRIDGE

## Overview:
ShopBridge is an e-commerce application. As a part of this app, you need to build a website that helps track the different items they have for sale.

So, as part of this app - I have only developed with respect to 'product admin'.

## Basic Introduction: 
To set a theme for this application, I have used a particular category of items - Books!

In this application, the product admin would be able to manage the products - Add, view, edit and delete items from the inventory.

I have used Firebase realtime database as a mock-api for storing and retrieving products.

## Technology used:
Front-End - Angular
BackEnd(MockApi) - Firebase

## Application contents:

### Home Page 
Product admin's home page where he can route to different pages of the app. Here, we have two pages.
'View Inventory' and 'Modify Inventory'

### View Inventory page
In this page, the admin can view the complete list of items available in the inventory.

### Enlarge Item page
When admin clicks an item from the view intentory page, an enlarged view of the respective product will be displayed.

### Modify Inventory page
In this page, the admin can perform all sorts of modification to the inventory.
Possible modifications: Add items to inventory, Edit items in the inventory, Delete items from the inventory.

### Additional items
Each of the page contains a navbar which has a home button using which admin can route to homepage from any screen.

Pagination has been implemented - 5 items per page to improve the UI experience.

Unit test case have been written as much as possible for all components.