// taskmanager.js
// Vanilla JS Task Manager
// Stores tasks in an array of objects and renders them into the DOM.

// Global array to store all tasks
let tasks = [];
let nextTaskId = 1; // simple incremental id for each task

// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const taskNameInput = document.getElementById("task-name");
  const taskPrioritySelect = document.getElementById("task-priority");
  const taskImportantCheckbox = document.getElementById("task-important");
  const taskCompletedCheckbox = document.getElementById("task-completed");
  const taskManagerDiv = document.getElementById("taskmanager");

  // FORM SUBMIT: Add a new task
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent page reload

    const name = taskNameInput.value.trim();
    const priority = taskPrioritySelect.value;
    const isImportant = taskImportantCheckbox.checked;
    const isCompleted = taskCompletedCheckbox.checked;
    const date = new Date(); // date task was added

    // Prevent invalid input (empty task name)
    if (name === "") {
      alert("Please enter a task name.");
      return;
    }

    // Build task object
    const newTask = {
      id: nextTaskId++,
      name: name,
      priority: priority,
      isImportant: isImportant,
      isCompleted: isCompleted,
      date: date
    };

    // Add to array
    tasks.push(newTask);

    // Log current task list to console
    logTasks();

    // Re-render task list in DOM
    renderTasks(taskManagerDiv);

    // Reset form
    form.reset();
    taskPrioritySelect.value = "Medium"; // default back to Medium
  });

  // EVENT DELEGATION: handle clicks on delete/complete buttons
  taskManagerDiv.addEventListener("click", (event) => {
    const target = event.target;

    // Delete button
    if (target.classList.contains("delete-task")) {
      const id = Number(target.dataset.id);
      deleteTask(id);
      logTasks();
      renderTasks(taskManagerDiv);
    }

    // Toggle complete button
    if (target.classList.contains("toggle-complete")) {
      const id = Number(target.dataset.id);
      toggleTaskCompletion(id);
      logTasks();
      renderTasks(taskManagerDiv);
    }
  });
});

/**
 * Render all tasks into the given container using innerHTML.
 * Also applies conditional styling with .style based on:
 * - priority
 * - importance
 * - completion status
 */
function renderTasks(container) {
  let html = "";

  tasks.forEach((task) => {
    const dateString = task.date.toLocaleString();

    html += `
      <div class="task" data-id="${task.id}">
        <div class="task-info">
          <div class="task-name-line">
            <strong class="task-name-text">${task.name}</strong>
            <span class="priority-label">[${task.priority} priority]</span>
          </div>
          <div>Added: ${dateString}</div>
          <div>
            Important: ${task.isImportant ? "Yes" : "No"} |
            Completed: ${task.isCompleted ? "Yes" : "No"}
          </div>
        </div>
        <div class="task-buttons">
          <button class="toggle-complete" data-id="${task.id}">
            ${task.isCompleted ? "Mark Incomplete" : "Mark Complete"}
          </button>
          <button class="delete-task" data-id="${task.id}">
            Delete
          </button>
        </div>
      </div>
    `;
  });

  // Put HTML into the page
  container.innerHTML = html;

  // Apply styling via JavaScript .style property
  const taskDivs = container.querySelectorAll(".task");

  taskDivs.forEach((div) => {
    const id = Number(div.dataset.id);
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    // Reference to the task name text (for important/completed styling)
    const nameText = div.querySelector(".task-name-text");

    // ----- Priority styling (background color) -----
    // Apply different background colors based on priority
    if (task.priority === "High") {
      div.style.backgroundColor = "#ffe5e5"; // light red
    } else if (task.priority === "Medium") {
      div.style.backgroundColor = "#fff8e1"; // light yellow
    } else if (task.priority === "Low") {
      div.style.backgroundColor = "#e6ffed"; // light green
    } else {
      div.style.backgroundColor = ""; // default
    }

    // ----- Important styling -----
    // Important tasks highlighted in red
    if (task.isImportant) {
      nameText.style.color = "red";
    } else {
      nameText.style.color = ""; // reset
    }

    // ----- Completed styling -----
    // Completed tasks have strikethrough
    if (task.isCompleted) {
      nameText.style.textDecoration = "line-through";
    } else {
      nameText.style.textDecoration = "none";
    }
  });
}

/**
 * Delete a task by its id.
 */
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
}

/**
 * Toggle completion status of a task by its id.
 */
function toggleTaskCompletion(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.isCompleted = !task.isCompleted;
  }
}

/**
 * Log the full task list to the console as JSON.
 * REQUIRED FORMAT: console.log(JSON.stringify(tasks));
 */
function logTasks() {
  console.log(JSON.stringify(tasks));
}
