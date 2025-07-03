Instructions to test:
- Download the repository
- (Compulsory) Setup own mySQLDB and configure backend > config > DATABASES with own database information
- (Compulsory) Set up .env as with .env.example in your root directory, replace necessary API keys and Hash.
- (Compulsory) Get the demoMap Key from Google @ https://developers.google.com/maps/documentation/javascript/place-search#maps_place_text_search-html
  or (Optional) use your own Maps JavaScript API, Places API (new) to test food finder @ https://console.cloud.google.com/
- (Optional) Get telegramAPI to test promotion listener, signup @ https://my.telegram.org/auth

IMPORTANT: 
- as of 3/7/2025 places api has been turned off during testing stage.
- For owners of nomnom: to ensure that google maps api works for the app, make sure to turn on Places API (new) / Places API in google cloud
- This will eat into the credits, of course. 

Backend Startup:
  - Open terminal
  - `python -m venv .venv` create virtual environment
  - `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process`
  - `.venv\Scripts\Activate.ps1`
  - `cd backend`
  - `pip install -r requirements.txt` install all packages
  - `python.exe -m pip install --upgrade pip` if prompted to
  - `python manage.py makemigrations`
  - `python manage.py migrate`
  - `python manage.py runserver`

Frontend Startup:
  - Open new terminal
  - `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process` make sure .venv is created first
  - `.venv\Scripts\Activate.ps1`
  - `cd frontend`
  - `npm install` install all packages
  - navigate to NomNomsSavr > frontend > index.html and replace the Google Maps API Key in script src @ [yourkeygoeshere]
  - `npm run dev`

(Optional) Telethon Promotions Listener:
  - Open new terminal
  - `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process`
  - `.venv\Scripts\Activate.ps1`
  - `cd backend`
  - `python manage.py listen_telegram `
  - Enter in your telegram user and 2fa code
  - Send prompts into a temporary telegram channel, formatted as per .env.example's telegram channel. Message format taken from @ https://t.me/kiasufoodies

User guide (app functionality and navigation):
  Authentication:
  - Create an account by following the register link
  - Use the account details to log in, this will be required to access different pages as they are protected

  Post Creation:
  - Post creation can be done in the home page, which user will be redirected to upon login
  - User must fill in title and content. As of 31/5/2025, posts that the user creates will be accessible to other users under explore. However, only the user has the ability to delete their post in   their respective home page
  - Users will have the option to delete their post using the red delete button available under their post in the homepage

  Explore and other users:
  - Users are also able to see what other users have been up to through the explore tab in the navigation bar
  - By clicking on another username, users can view their public profile page. Users can also choose to follow the user in question
  - As of 31/5/2025, there is no functionality yet for users to see posts only posted by people they follow. However, this functionality will be added in upcoming versions

  Profile and personalization:
  - Users are able to update and view their profile through the profile tab in the navigation bar
  - Users are able to update their username, email dietary preferences as well as their password
  - Some of these changes not pertaining to personal information can be viewed by other users if they access your public profile. As of 31/5/2025 these fields include username, follower and           following count, as well as dietary preferences

  Promotions:
  - Promotions will appear in the list only if parsed by an active telethon parser, with appropriate formatting of food promotion from telegram channel.

  Food Finder Map
  - Allows Google's text search query (try: hotdogs in orchard) for food type in an area
  - Interactive Place Detail Cards that pan and zoom to location on map, creates an InfoWindow on marker
  - Dynamic map allows drag and scroll with real-time map features



  
