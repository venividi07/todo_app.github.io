var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var filterCompleted = document.querySelector('#filterCompleted')
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
var activeTasksTextholder = document.querySelector('#activeTasks');
const completedH3= document.querySelector('#completedH3');

function checkList (){
    if (completedTasksHolder.children.length != 0 ){
        activeTasksTextholder.textContent = "ACTIVE TASKS";
    } else{
        activeTasksTextholder.textContent = "NO ACTIVE TASKS AT THE MOMENT";
    }
}
// Check and toogle Active or NO Active Tasks
function loopCheckList (){
    let previousLength = incompleteTasksHolder.children.length;

  // Set an interval to check for changes
  const intervalId = setInterval(() => {
    const currentLength = incompleteTasksHolder.children.length;

    if (currentLength > previousLength) {
      // New elements added
      const newElement = incompleteTasksHolder.children[currentLength - 1]; // Get the newly added element
      console.log("New element added:", newElement);
      activeTasksTextholder.textContent = "ACTIVE TASKS";
      activeTasksTextholder.style.backgroundColor = '#f6e4ad';
      completedH3.style.backgroundColor = '#fff';

      if(currentLength >= 1){
        activeTasksTextholder.style.backgroundColor = '#f6e4ad';
      }

      // Check if the element is deleted after a delay
      setTimeout(() => {
        if (!incompleteTasksHolder.contains(newElement)) {
          console.log("Element was deleted!");
          activeTasksTextholder.textContent = "ACTIVE TASKS";
          
        }
      }, 500); // Check after 500 milliseconds (adjust as needed)
    } else if (currentLength < 1) {
      // Elements deleted
      //console.log("Elements deleted from the list!");
      activeTasksTextholder.textContent = "NO ACTIVE TASKS AT THE MOMENT";
      activeTasksTextholder.style.backgroundColor = '#ffcece';
    }

    // Update the previous length
    previousLength = currentLength;
  }, 50); // Check every 1000 milliseconds (1 second)

}


loopCheckList(completedTasksHolder);

// Check for active tasks on page load

window.onload = checkList();

//New Task List Item
var createNewTaskElement = function(taskString) {
	//Create List Item
	var listItem = document.createElement("li");

	//input (checkbox)
	var checkBox = document.createElement("input"); // checkbox
	//label
	var label = document.createElement("label");
	//input (text)
	var editInput = document.createElement("input"); // text
	//button.edit
	var editButton = document.createElement("button");
	//button.delete
	var deleteButton = document.createElement("button");

	//Each element needs modifying
	checkBox.type = "checkbox";
	editInput.type = "text";

	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	label.innerText = taskString;

	//Each element needs appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

//Add a new task
var addTask = function() {
	console.log("Add task...");
	//Create a new list item with the text from #new-task:
	var listItem = createNewTaskElement(taskInput.value);
	//Append listItem to incompleteTasksHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
}

//Edit an existing task
var editTask = function() {
	console.log("Edit task...");

	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");

	var containsClass = listItem.classList.contains("editMode");

	//if the class of the parent is .editMode
	if (containsClass) {
		//Switch from .editMode
		//label text become the input's value
		label.innerText = editInput.value;
        // Confirm editing
        confirm("Done editing?");
	} else {
		//Switch to .editMode
		//input value becomes the label's text
		editInput.value = label.innerText;
	}

	//Toggle .editMode on the list item
	listItem.classList.toggle("editMode");

}

//Delete an existing task
var deleteTask = function() {
	console.log("Delete task...");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;

	//Remove the parent list item from the ul with confirmation warning
    if (confirm("Are you sure you want to delete this task?")) {
	ul.removeChild(listItem)}
}

//Mark a task as complete
var taskCompleted = function() {
	console.log("Task complete...");
	//Append the task list item to the #completed-tasks
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
    completedTasksHolder.style.backgroundColor = '#BFD8AF';
    completedH3.style.backgroundColor = '#BFD8AF';
    // add how many itmes were completed
}

//Mark a task as incomplete
var taskIncomplete = function() {
	console.log("Task incomplete...");
	//Append the task list item to the #incomplete-tasks
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events");
	//select taskListItem's children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");

	//bind editTask to edit button
	editButton.onclick = editTask;

	//bind deleteTask to delete button
	deleteButton.onclick = deleteTask;

	//bind checkBoxEventHandler to checkbox
	checkBox.onchange = checkBoxEventHandler;
}


//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
//addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
	//bind events to list item's children (taskCompleted)
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
	//bind events to list item's children (taskIncomplete)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
    const itemCount = completedTasksHolder.children.length;
    const countElement = document.createElement("span");
    countElement.textContent = ` (${itemCount})`;
    completedTasksHolder.appendChild(countElement);
}

  function addItemCount(completedH3) {
    const itemCount = completedTasksHolder.children.length;
    const countElement = document.createElement("span");
    countElement.textContent = ` (${itemCount})`;
    completedH3.appendChild(countElement);

    const observer = new MutationObserver((mutations) => {
        const itemCount = completedTasksHolder.children.length;
        countElement.textContent = ` (${itemCount})`;
      });
    
      observer.observe(completedTasksHolder, { childList: true });
  }
  addItemCount(completedH3);

// Function to show completed tasks
function toggleElementVisibility() {
  
    if (completedTasksHolder.style.display === "none") {
        completedTasksHolder.style.display = "block";
        filterCompleted.textContent = 'Hide Completed';
    } else {
        completedTasksHolder.style.display = "none";   
        filterCompleted.textContent = 'Show Completed';
    }
  };
  // Button to toggle on/off completed tasks
  filterCompleted.addEventListener('click',toggleElementVisibility);