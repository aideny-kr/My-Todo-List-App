//Problem: User interaction doesn't provide desired results
//Solution: Add interactivity so the user can manage daily tasks

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item 
var createNewTaskElement = function(taskString){
  //create list item
  var listItem = document.createElement("li"); 
  //input(checkbox)
  var checkBox = document.createElement("input"); //checkbox
    //label
  var label = document.createElement("label");
    //input(text)
  var editInput = document.createElement("input");  //text
    //button.edit
  var editButton = document.createElement("button");
    //button.delete
  var deleteButton = document.createElement("button");
  //Each elements needs modifying 
  
  checkBox.type="checkbox";
  editInput.type="text";
  label.innerText = taskString;
  editButton.innerText = "Edit";
  editButton.className ="edit";
  deleteButton.innerText = "Delete"; 
  deleteButton.className ="delete";
  
  //Each elements needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

//Add a new task
var addTask = function() {
  console.log("Add Task...");
  //when the button is pressed we want to create a task
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  //Empty input value
  taskInput.value = '';
}
//Edit an existing task
var editTask = function(){ 
  console.log("Edit Task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector("button.edit");
    //if the class of the parent is .editMode
      
  var containsClass = listItem.classList.contains("editMode");    
    if(containsClass){
      //Switch from .editMode
      //label text become the input's value
      label.innerText = editInput.value;
      editBtn.innerText = "Edit";

    } else {
      //Switch to .editMode
      //input value becomes the label's text
      editInput.value = label.innerText; // If this is not set, it will erase previous label.value
      editBtn.innerText = "Save";
    }
      
    //Toggle .editMode on the parent
    listItem.classList.toggle("editMode");
}
//Delete an existing task
var deleteTask = function(){ 
  console.log("Delete Task...");
  //Remove the parent list item from the ul
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted= function(){
  console.log("Task Complete...");
  //when the Checkbox is checked
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}
//Mark a task as Incomplete
var taskIncomplete = function(){
  console.log("Task Incomplete...");
  //when the Checkbox is unchecked
  //Append the task list item to the #incompleted-takss
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');
    //bind editTask to edit button
    editButton.onclick = editTask;
    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;
}

var ajaxFunction = function(){

  console.log("AJAX Code");
}
//Set the click Handler to the addTask function
//addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxFunction);
//cycle over incompleteTaksHolder ul list items 
  //for each list item 
for(var i = 0; i < incompleteTasksHolder.children.length; i++){
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}


//cycle over completedTasksHolder ul list items 
  //for each list item 
for(var i = 0; i < completedTasksHolder.children.length; i++){
  //bind events to list item's children (taskInompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




