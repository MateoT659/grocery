# Grocery App

Shop smarter to reduce food waste. Everyone's had that experience - you buy something from the grocery store, use it for a recipe, then it taunts you from the fridge until it expires. Our app prevents this by generating cost-efficient, low-waste grocery lists revolving around recipes you like.

## How to Run the App as a Developer

To use this app, you'll need git, Java 21 (or higher), and the latest version of npm. It's recommended to use IntelliJ Community Edition for backend development and Visual Studio for frontend development

1. Clone this repository onto your machine.
2. In IntelliJ, navigate to ```grocery/backend/src/main/java/com/ud11/groceries/GroceriesApplication.java``` and run the file. Wait until springboot has loaded.
3. In Visual Studio, open a terminal and navigate to ```grocery/frontend```.
4. In the terminal, run ```npm run start```, and wait until the package is created.
5. Install the Expo Go app on your phone.
6. Ensure your ios or android phone and computer are connected to the same WIFI network, and scan the qr code using your phone's camera to open the local development build.
7. Alternatively, you can use the web version at http://localhost:8081/ to open the app on your computer.

Now, your application should be running on your phone or computer, and the server should be live on your computer.

## High Level System Overview

Our app utilizes React Native for the frontend and Springboot for the backend. At this stage, we do not have a full database. All data is stored in JSON files in the ```grocery/backend/src/main/java/com/ud11/groceries/data``` folder.

### Data
Data is stored in four categories/files:
1. GroceryLists
2. Ingredients
3. Recipes
4. Users

The data in each of these files is modified using GET, PUT, POST, PATCH operations.

### Frontend Structure
The frontend is broken down into three main folders, representing the three main pages of our app:
1. Feed (```grocery\frontend\app\(tabs)\Feed```): Contains any files related to the functionality of the Feed Page including viewing a post and filtering or searching for recipes.
2. Lists (```grocery\frontend\app\(tabs)\Lists```): Contains any files related to the functionality of creating and viewing grocery lists the user creates.
3. User (```grocery\frontend\app\(tabs)\User```): Contains any files related to the functionality of user account settings, favorite recipes, creating new recipes, and adding allergy and dietary restrictions.

### Backend
The backend is broken down into four major folders:
1. Classes (```grocery\backend\src\main\java\com\ud11\groceries\classes```): Contains GroceryList, Ingredient, User, and Recipe classes as well several enums.
2. Controllers (```grocery\backend\src\main\java\com\ud11\groceries\controllers```): Contains all controllers utlized in the app to make the backend function.
3. Data (```grocery\backend\src\main\java\com\ud11\groceries\data```): Contains the data for the app in JSON functions as mentioned previously.
4. Services (```grocery\backend\src\main\java\com\ud11\groceries\services```): Contains all services utlized in the app to make the backend function.

## Limitations and Incomplete Features
1. Data is not stored in a real database. It is currently stored locally in JSON files in the backend.
2. There is no user authentication.
3. Users cannot edit grocery lists they create.

## Future Work Recommendations
1. Create a database.
2. Implement authentication and security measures.
3. Deploy app and put it on the app store.

