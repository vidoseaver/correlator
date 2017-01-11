## Correlator



An application display data about cities and countries relative to travelers built with Rails - with a POSTGRESQL database -, D3.js, JavaScript, and CSS.

## Project Screen Shot(s)

#### Example:   

[ PRETEND SCREEN SHOT IS HERE ]

[ PRETEND OTHER SCREEN SHOT IS HERE ]

## Installation and Setup Instructions

#### Example:  

Clone down this repository. You will need Ruby and installed globally on your machine.  

Installation:
  In console enter
  
  `bundle`

Then create and seed the database:

  In console enter:
  
  `rake db:{create, migrate, seed}`

  This will populate the countries from Cia World Factbook data stored locally.

  Next, populate the cities curated from Nomadlist.com.
  
  ` rails console
    City.populate_cities
    exit `

To Run Test Suite:  

`rspec`
 

To Start Server:

`rails s`  

To Visit App:

`localhost:3000`  

## Reflection 
#### Vido's reflection
  This was our two week long personal project during my Third Module at Turing School of Software and Design.  The goal was to explore area's of interest.  

  I (@vidoseaver) reached out to @kswhyte who is also enrolled at in Turing but in the front end program. He too had a personal project due and so we decided to collaborate. I was aqire the data and server the data for him to present with D3 and ES6.

  Working with him came with its own set of challenges. From setting up a devopement enviorment to incorperating ES6 and SASS in a rails project. 
  
  To Further complications the Nomadlist api changed twice over the course of two weeks and ultimately stopped servering alot of the information we were interested in.  Luckily we had saved it on our heroku server but that made remote database changes especially scary. 
  
  Mapping the data was interesting as well. Ultimately while exhausting it was a great learning experience. Between having a fragile legacy database, dealing with inconsitent data and different coding enviorments . I think this project probably modeled alot of challenges that one comes across on the job.


This was a 3 week long project built during my third module at Turing School of Software and Design. Project goals included using technologies learned up until this point and familiarizing myself with documentation for new features.  

Originally I wanted to build an application that allowed users to pull data from the Twitter API based on what they were interested in, such as 'most tagged users'. I started this process by using the `create-react-app` boilerplate, then adding `react-router-4.0` and `redux`.  

One of the main challenges I ran into was Authentication. This lead me to spend a few days on a research spike into OAuth, Auth0, and two-factor authentication using Firebase or other third parties. Due to project time constraints, I had to table authentication and focus more on data visualization from parts of the API that weren't restricted to authenticated users.

At the end of the day, the technologies implemented in this project are React, React-Router 4.0, Redux, LoDash, D3, and a significant amount of VanillaJS, JSX, and CSS. I chose to use the `create-react-app` boilerplate to minimize initial setup and invest more time in diving into weird technological rabbit holes. In the next iteration I plan on handrolling a `webpack.config.js` file to more fully understand the build process.  
Add Comment Collapse
