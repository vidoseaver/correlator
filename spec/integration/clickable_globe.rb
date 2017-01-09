# To run any example or example group through Selenium, just set :js => true:
require "rails_helper"

describe 'home page' do
  it 'shows title and subtitle when visiting home page', :js => true do
    visit root
    # fill_in 'Author', :with => 'J. Random Hacker'
    # fill_in 'Comment', :with => 'Awesome post!'
    # click_on 'Submit'  # this be an Ajax button -- requires Selenium
    page.should have_content('World Data Correlator')
    page.should have_content('View Country and City Travel Information World-Wide')
  end
  it 'has an world-globe svg element upon visiting home page', :js => true do
    visit root
    # page.should have_content('World Data Correlator')
    # page.should have_content('View Country and City Travel Information World-Wide')
  end
  it 'has an world-globe svg element upon visiting home page', :js => true do
    visit root
    page.should have_content('World Data Correlator')
    page.should have_content('View Country and City Travel Information World-Wide')
  end
end

# describe('Landing ToDo Box Page', function(){
#   browser.url('/')
#   it('should be able to grab the page title', function(){
#   	let title = browser.getTitle()
#
#   	assert.equal(title, 'To-Do Box | by Ian Lancaster and Kinan Whyte')
#   })
#   it('should have a header title that describes the page', function() {
#     let headerTitle = browser.element('.todobox-page-title')
#
#     assert.equal(headerTitle.getText(), 'to-dobox')
#   })
#   it('should have an input field for a todo title', function(){
#     let toDoTitle = browser.element("#title-input")
#     toDoTitle.setValue('amazing title')
#
#     assert.equal(toDoTitle.getValue(), 'amazing title')
#   })
#   it('should have an input field for a todo body', function(){
#     let toDoBody = browser.element("#body-input")
#     toDoBody.setValue('amazing body')
#
#     assert.equal(toDoBody.getValue(), 'amazing body')
#   })
#   it('should have a "save" button with the text "save"', function() {
#     let saveButton = browser.element('#save-button')
#
#     assert.equal(saveButton.getText(), 'save')
#   })
#   it('should have a functioning "save" button that is enabled and clickable', function() {
#     let toDoBody = browser.element("#body-input")
#     toDoBody.setValue('amazing body')
#
#     let saveButton = browser.element('#save-button')
#     browser.click('#save-button')
#     let toDo = browser.element('.todo-section')
#
#     assert.equal(toDo.isExisting(), true)
#     assert.equal(saveButton.isEnabled(), true)
#   })
#   it('should have an enabled and clickable "show-all-todos button"', function() {
#     let showAllToDos = browser.element('#show-all-todos-button')
#
#     browser.click('#show-all-todos-button')
#     assert.equal(showAllToDos.isEnabled(), true)
#
#     assert.equal(showAllToDos.getText(), 'show all TODOs')
#   })
#   it('should have an enabled and clickable "show-completed-todos button"', function() {
#     let showCompletedToDosButton = browser.element('#show-completed-todos-button')
#
#     browser.click('#show-completed-todos-button')
#     assert.equal(showCompletedToDosButton.isEnabled(), true)
#
#     assert.equal(showCompletedToDosButton.getText(), 'show completed TODOs')
#   })
#   it('should have an enabled and clickable "none" button', function() {
#     let noneButton = browser.element('#none-filter')
#
#     browser.click('#none-filter')
#     assert.equal(noneButton.isEnabled(), true)
#
#     assert.equal(noneButton.getText(), 'none')
#   })
#   it('should have an enabled and clickable "low" button', function() {
#     let lowButton = browser.element('#low-filter')
#
#     browser.click('#low-filter')
#     assert.equal(lowButton.isEnabled(), true)
#
#     assert.equal(lowButton.getText(), 'low')
#   })
#   it('should have an enabled and clickable "normal" button', function() {
#     let normalButton = browser.element('#normal-filter')
#
#     browser.click('#normal-filter')
#     assert.equal(normalButton.isEnabled(), true)
#
#     assert.equal(normalButton.getText(), 'normal')
#   })
#   it('should have an enabled and clickable "high" button', function() {
#     let highButton = browser.element('#high-filter')
#
#     browser.click('#high-filter')
#     assert.equal(highButton.isEnabled(), true)
#
#     assert.equal(highButton.getText(), 'high')
#   })
#   it('should have an enabled and clickable "critical" button', function() {
#     let criticalButton = browser.element('#critical-filter')
#
#     browser.click('#critical-filter')
#     assert.equal(criticalButton.isEnabled(), true)
#
#     assert.equal(criticalButton.getText(), 'critical')
#   })
#   it('should have default of 0 set to title-input-count', function() {
#     let titleInputCount = browser.element('#title-input-count')
#
#     assert.equal(titleInputCount.getText(), 0)
#   })
#   it('should have default of 0 set to body-input-count', function() {
#     let bodyInputCount = browser.element('#body-input-count')
#
#     assert.equal(bodyInputCount.getText(), 0)
#   })
# })
#
# describe('ToDos', function(){
#   browser.url('/')
#   it('should not have a default class of "complete"', function() {
#     let toDoTitle = browser.element("#title-input")
#     toDoTitle.setValue('Kittens and Puppies')
#
#     let toDoBody = browser.element("#body-input")
#     toDoBody.setValue('get a bunch of them')
#
#     browser.click('#save-button')
#     let completeClass = browser.element('.complete')
#
#     assert.equal(completeClass.isExisting(), false)
#   })
#   it('should have a class of "complete" after the todo is clicked as completed', function() {
#     let completeClass = browser.element('.complete')
#     let completeTask = browser.element('.complete-task-button')
#
#     assert.equal(completeClass.isExisting(), false)
#     browser.click('.complete-task-button')
#     assert.equal(completeClass.isExisting(), true)
#   })
#   it('should have a remove button that is enabled and clickable', function() {
#     let toDoTitle = browser.element("#title-input")
#     toDoTitle.setValue('Kittens and Puppies')
#
#     let toDoBody = browser.element("#body-input")
#     toDoBody.setValue('get a bunch of them')
#
#     let removeToDo = browser.element('.remove-todo')
#     browser.click('#save-button')
#     browser.click('.remove-todo')
#
#     let removeButton = browser.element('.remove-todo')
#     assert.equal(removeButton.isEnabled(), true)
#   })
#   it('should remove a ToDo from the page', function() {
#     let toDoTitle = browser.element("#title-input")
#     toDoTitle.setValue('Kittens and Puppies')
#
#     let toDoBody = browser.element("#body-input")
#     toDoBody.setValue('get a bunch of them')
#
#     browser.click('#save-button')
#     var allIdeas = browser.elements('section').getText()
#
#     assert.equal(allIdeas.length, 8)
#     browser.click('.remove-todo')
#     })
#   it('should have an default importance level of a todo set to "normal"', function() {
#     let toDoTitle = browser.element("#title-input")
#     toDoTitle.setValue('Kittens and Puppies')
#
#     let toDoBody = browser.element("#body-input")
#     toDoBody.setValue('amazing body')
#
#     browser.click('#save-button')
#     let importanceLevel = browser.element('.importance-control')
#
#     assert.equal(importanceLevel.getText(), 'importance: normal')
#   })
#   it('should have an upvote button that raises the importance level of a todo', function() {
#     let toDoTitle = browser.element('#title-input')
#     toDoTitle.setValue('Kittens and Puppies')
#     let importanceLevel = browser.element('.importance-control')
#
#     assert.equal(importanceLevel.getText(), 'importance: normal')
#     browser.click('.upvote')
#   })
#   it('should have a downvote button that lowers the importance level of a todo', function() {
#     let importanceLevel = browser.element('.importance-control')
#
#     assert.equal(importanceLevel.getText(), 'importance: high')
#     browser.click('.downvote')
#     browser.click('.downvote')
#   })
# })
#
# describe('Search Bar', function(){
#   it('should be able to take input', function() {
#     let searchBar = browser.element("#search-bar")
#     searchBar.setValue('amaz')
#
#     assert.equal(searchBar.getValue(), 'amaz')
#   })
# })
#
# describe('Clear Fields', function(){
#   it('should be able to clear input fields after a todo is saved', function() {
#     let toDoTitle = browser.element("#title-input")
#     let toDoBody = browser.element("#body-input")
#     let searchBar = browser.element("#search-bar")
#
#     assert.equal(toDoTitle.getValue(), 'Kittens and Puppies')
#     browser.click('#save-button')
#     assert.equal(toDoBody.getValue(), '')
#   })
# })
#
# describe('Show-All-ToDos-button', function(){
#   browser.url('/')
#   it('should be enabled, clickable, and be called "show all TODOs"', function() {
#     let showAllToDosButton = browser.element("#show-all-todos-button")
#
#     browser.click('#show-all-todos-button')
#
#     assert.equal(showAllToDosButton.getText(), 'show all TODOs')
#   })
# })
#
# describe('Title and Body Input Count', function(){
#   browser.url('/')
#   it('should increase its value by the length of characters in the title input', function() {
#     let toDoTitle = browser.element("#title-input")
#     toDoTitle.setValue('Kit')
#
#     browser.click('#save-button')
#     let titleInputCount = browser.element('#title-input-count')
#
#     assert.equal(titleInputCount.getText(), 3)
#   })
#   it('should increase its value by the length of characters in the body input', function() {
#     let toDoBody = browser.element("#body-input")
#     toDoBody.setValue('amaz')
#
#     browser.click('#save-button')
#     let bodyInputCount = browser.element('#body-input-count')
#
#     assert.equal(bodyInputCount.getText(), 4)
#   })
# })

#
# var assert = require('chai').assert
# var dom = require('../../lib/dom')
# var ToDo = require('../../lib/todo')
# var toDoBox = require('../../lib/todo-box')
# var controller = require('../../lib/controller')
#
# describe('Controller | Unit Tests', function(){
#   context('setToDoListToLS', function(){
#     it('is a method', function(){
#       assert.isFunction(controller.setToDoListToLS)
#     })
#   })
#   context('clearFields', function(){
#     it('is a method', function(){
#       assert.isFunction(controller.clearFields)
#     })
#   })
#   context('updateLSFromModel', function(){
#
#     it('should have a method called updateLSFromModel', function(){
#       assert.isFunction(controller.updateLSFromModel);
#     });
#     it('should save all toDos in toDoList in localStorage', function(){
#       localStorage.setItem('toDoList', JSON.stringify([]))
#       toDoBox.toDoList = []
#       toDoBox.addToDo('title1', 'body1')
#       toDoBox.addToDo('title2', 'body2')
#       toDoBox.addToDo('title3', 'body3')
#       controller.updateLSFromModel()
#
#       assert.equal(toDoBox.toDoList.length, JSON.parse(localStorage.getItem('toDoList')).length);
#     });
#   });
#   context('updateModelFromLS', function(){
#     it('should have a method called updateModelFromLS', function(){
#       assert.isFunction(controller.updateModelFromLS);
#     });
#     it('if toDoList exists in localStorage, it should set toDoBox.toDoList to parsed ls toDoList', function(){
#       localStorage.setItem('toDoList', JSON.stringify([]))
#       toDoBox.toDoList = []
#       toDoBox.addToDo('title1', 'body1')
#       toDoBox.addToDo('title2', 'body2')
#       toDoBox.addToDo('title3', 'body3')
#       controller.updateLSFromModel()
#       toDoBox.toDoList = []
#       controller.updateModelFromLS()
#
#       assert.equal(toDoBox.toDoList.length, JSON.parse(localStorage.getItem('toDoList')).length);
#     });
#   });
# });

# describe('Todo-box | Unit Test', function(){
#   context('toDoBox Object', function(){
#     it('has an activeToDoList array property', function(){
#       let activeToDoList = toDoBox.activeToDoList
#       assert.isArray(activeToDoList)
#     });
#   });
#   context('addToDo method', function(){
#     it('is a method', function(){
#       assert.isFunction(toDoBox.addToDo)
#     });
# });

# it('has an id', function(){
#   todo = new ToDo('laundry', 'kids')
#   assert.equal(todo.id, Date.now())
# });
# });
