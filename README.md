# WEB-115-0003-Final-Project
Taskmanager website

Developing `taskmanager.html` and `taskmanager.js` helped me connect JavaScript concepts with real DOM interaction. I started by planning the data structure for each task as an object with properties like `id`, `name`, `priority`, `isImportant`, `isCompleted`, and `date`, and storing them in an array. From there, I built a simple, clean HTML form with inputs for the task name, priority, and checkboxes for importance and completion, plus a div to display the tasks.

Most of the logic went into `taskmanager.js`. I used event listeners to handle form submission and button clicks instead of inline HTML events. Rendering the tasks with `innerHTML` and then applying conditional styling using the `.style` property reinforced how JavaScript and CSS work together. Making sure that important tasks showed in red and completed tasks had a strikethrough required careful DOM selection.

One challenge was keeping the UI updated after every add, delete, or toggle action while also logging updates using `JSON.stringify(tasks)`. Overall, this project strengthened my understanding of event handling, objects, and dynamic web pages.

