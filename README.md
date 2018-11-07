# The Perfect Tea 

## Overview

After water, tea is the most widely consumed beverage on the planet. It's tasty, refreshing, and carries a number of health benefits. For centuries people have drank tea for a variety of purposes, including for health and spiritual practices.

Have a sore throat? Trying to detox? Need to relax? Whether you're drinking for health purposes or just to calm your nerves, The Perfect Tea web application is here to help. 

Users can search key words associated with the tea to suit their needs. These search words operate as tags, which will be used to filter through the database of teas to find matches. The user can then select which tea they'd like to learn more about based off of the search results. 
Users also have the option to create accounts, so as to save their favorite teas in a favorites tab or a wishlist.


## Data Model

The application will store tea types, tags, and users and lists

* the teas and the tags will reference one another (references)
* users will each have a favorites list associated with them, which contains references to different tea types


An Example Tea Schema:

```javascript
{
  name: "Green",
  desc: //description of tea origins, properties, whatnot,
  tags: "antioxidant", etc. //a reference to tag documents that contain this tea
}
```

An Example Tag Schema
```javascript
{
  tag: "antioxidant",
  teas: "Green", etc. //a reference to tea documents that contain this tag
}
```

An Example User:

```javascript
{
  username: "teabee",
  hash: // a password hash,
  list: // an array of references to tea documents
}
```


## [Link to Commented First Draft Schema](db.js) 



## Wireframes

/- landing page

![landing page](documentation/home)

/search... - page generating search results

![list](documentation/search)

/favorites - page for showing user's saved teas

![list](documentation/favorites)

## Site map

[sitemap](documentation/sitemap.pdf)

## User Stories or Use Cases

1. as non-registered user, I can search for teas related to my key words
2. as a user, I can log in to the site
3. as a user, I can save searches and teas in my favorites list

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)