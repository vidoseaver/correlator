# World Data Correlator

An application that provides an interactive clickable globe that can display data about countries and cities relative to travelers. Once a user clicks on a country, they are able to view essential information from the [CIA World Factbook](https://www.cia.gov/library/publications/the-world-factbook/) and [NomadList](https://nomadlist.com/).

built with Rails - with a POSTGRESQL database -, D3.js, JavaScript, and SCSS.

[Live Version](http://corre1ator.herokuapp.com)

## Project Screen Shot(s)

#### Example:   

![screen shot 2017-01-11 at 9 28 49 pm](https://cloud.githubusercontent.com/assets/13802107/21877040/85a8349c-d845-11e6-9558-51618575f761.png)

![screen shot 2017-01-11 at 9 29 35 pm](https://cloud.githubusercontent.com/assets/13802107/21877041/88badb30-d845-11e6-97ed-b3bc6b50ea74.png)

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
    `rails console
    City.populate_cities
    exit`

  `bundle`

Then create and seed the database:

  In console enter:

  `rake db:{create, migrate, seed}`

  This will populate the countries from Cia World Factbook data stored locally.

  Next, populate the cities curated from Nomadlist.com.

  ` rails console
    City.populate_cities
    exit `
    
    ---

To Start Server:

`rails s`  

To Visit App:

`localhost:3000`  

To Run Test Suite:  

`rspec`

---

## Reflection

#### Kinan's reflection

The goal of this project was to create a successful web application from a project idea. The idea was for this app to be able to solve an actual problem. 

Because I love traveling so much, sometimes when you are researching places to visit, whether for vacation or for living, it's hard to find solid information that is consolidated in one place, that makes researching easier. 

The idea behind this app was to build a hub of consolidated information for countries and cities worldwide. I wanted to provide some visuals for data representation and create a unique UI experience for users. Being able to spin up a world "globe" that allows you to click on countries was very challenging, since d3 requires such a high learning curve. 

Overall, it has been awesome to see how so much data can come together in one place, that may lend lasting hours to a true wanderlust doing diligent research. 

We certainly ran into issues pushing up to Heroku as our project came to a close. Because of the immense amount of data that we are pulling in and rendering, we had to get creative with a true hosting source. Although Heroku is great for smaller apps, we ended up having to upgrade the account to be able to actually push everything up.

#### Vido's reflection
  This was our two week long personal project during my Third Module at Turing School of Software and Design.  The goal was to explore area's of interest.  

  I (@vidoseaver) reached out to @kswhyte who is also enrolled at in Turing but in the front end program. He too had a personal project due and so we decided to collaborate. I was to acquire the data and serve it for him to present with D3 and ES6.

  Working with him came with its own set of challenges. From setting up a development environment to incorporating ES6 and SASS into rails.

  To further add complications the Nomadlist api changed twice over the course of two weeks and ultimately stopped serving a lot of the information we were interested in.  Luckily we had saved it on our Heroku server but that made remote database changes especially scary.

  Mapping the data was interesting as well. Ultimately while exhausting it was a great learning experience. Between having a fragile legacy database, dealing with inconsistent data and different coding environments . I think this project probably modeled a lot of challenges that one comes across on the job.

At the end of the day, the technologies implemented in this project are Rails, Postrgresql, D3, and a significant amount of VanillaJS, AJAx, and CSS.
