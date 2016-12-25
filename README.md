# rails_template

The purpose of this repo is to provide the setup I generally needs when starting a new rails project

### Here's what it has:

* Pry - because obvi,
* Postgres - database,
* Rspec - testing suite,
* Simplecov -  test coverage
* Factory girl - generating object(and database cleaner),
* Faker - populating the database,
* Figaro - hiding your secrets 
* VCR & Webmock -  mocking your api calls

Pretty much everything is already set up.

Here is how to use it.

First, clone the repo via your command line my_new_app_name is whatever you want to call your project

``` 
git clone git@github.com:vidoseaver/rails_template.git my_new_app_name
```
Next cd, into the folder.

```
cd my_new_app_name

```

Now remove the origin and bundle

```
git remote rm origin
bundle
```

If you want to user figaro to hide your secrets your going to have to

```
bundle exec figaro install
```

Voi la! You're good to go!

