#### Geting Started
*  Clone and run `bundle install` to install the required gems
*  Run `rake db:migrate && rake db:seed` to get the database initialized
*  Run `rspec` to make sure everything is working
*  Fire up your `rails server` and head to localhost:3000 to check it out!

This is [Alok's](https://github.com/alokpradhan/food_truck_app) and [Joseph's](https://github.com/joseph-lozano/food_truck_app) try at [Uber Coding Challenge #4](https://github.com/uber/coding-challenge-tools/blob/master/coding_challenge.md#food-trucks).  This is a full stack application, making use of a Ruby on Rails API to serve data to an Angular front-end.

#### Walkthrough
##### Database
The database is seeded from [data.sfgov.org](http://data.sfgov.org/resource/rqzj-sfat.json). It is then split into 3 tables, a food_trucks table, which stores information on each facilities' name, type, and what food items they have. The locations table stores location information, including latitude and longitude, address, and the location description.

Because food_trucks and locations have a many-to-many relationship, they are joined by an operations table, which also keeps track of operating hours for each truck at each location.

##### Testing
###### Controller Testing
Because our app is primarily an api to serve the front end, looking at the controller tests gives a great opportunity took look at the capabilities of the app.  Our API can receive location data in three formats, a string, such as `123 Fake Street, San Francisco, CA`, an JSON array or latitude and longitude coordinates, or as an IP address. In each of these cases, the controller successfully returns a JSON response object to the front-end, and limits the responses to 26.

Otherwise, if the location given is outside of San Francisco, the returned JSON object has a length of zero. That is, there are no nearby food trucks.
###### Model Testing
Our FoodTruck model is contains the search methods, called `FoodTruck.data()`, and so our model tests for data check that this method works properly. In addition, it also checks that FoodTruck has both the Location, and Operation associations.

##### Back-end
Our `FoodTruck.data()` method takes one argument, that argument can be either an address string, a stringified array, or a stringified IP address. Our if/else block parse through each possibility, and converts the address into an Array, and passes it onto the next method. `trucks_near_location()` Takes the array from the previous method, and a fixed radius, and returns an array of all trucks within that radius. If there are less than 26 trucks found, it will expand the radius, and search again until exactly 26 are found; `nearby_locations` is a helper function.

##### Front-end
Our Front-end is built on Angular. We used Angular to take use of services, small modules of code. We have 3 services. A userPosition service, which grabs location data from the browswer, a map service, which renders the map, and contains the functions for add markers to the map, and a data service, which talks to the Rails API.

All of these serve a slim angular controller which simply handles ng-model objects and functions from the html page.

#### Guided Tour
Step 1. Visit [SF Food Truck Locator](http://stormy-wave-6805.herokuapp.com/)
Step 2. a. Click on the 'Search Near Me' button to find a list of food options near you, or...
Step 2. b. Search for food options at any street address in San Francisco. Enter details and click on the 'Search by Address' button
Step 3. Scroll down to see a table populated with the locations, times, and menu details of trucks and stalls
Step 4. Enjoy a great meal!

