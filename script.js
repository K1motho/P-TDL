// Countdown Timer Logic
let countdownTimer;
let deadlineTime;
let taskList = [];
let completedTasks = [];

// Handle setting the global countdown timer
document.getElementById('start-timer').addEventListener('click', function() {
    const deadlineInput = document.getElementById('deadline').value;
    if (deadlineInput) {
        deadlineTime = new Date(deadlineInput).getTime();
        updateCountdown();
        if (countdownTimer) clearInterval(countdownTimer);
        countdownTimer = setInterval(updateCountdown, 1000);
    }
});

// Update countdown
function updateCountdown() {
    if (deadlineTime) {
        let now = new Date().getTime();
        let distance = deadlineTime - now;
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown').textContent = "Our time's up! 💔";
        } else {
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById('countdown').textContent = `${hours}h ${minutes}m ${seconds}s`;
        }
    }
}

// Add new task
document.getElementById('add-btn').addEventListener('click', function() {
    const taskName = document.getElementById('new-task').value;
    const taskImage = document.getElementById('task-image').files[0];

    if (taskName) {
        const task = { name: taskName, image: taskImage, completed: false };
        taskList.push(task);
        displayTasks();
        document.getElementById('new-task').value = '';
        document.getElementById('task-image').value = '';
    }
});

// Display tasks
function displayTasks() {
    const taskListContainer = document.getElementById('task-list');
    taskListContainer.innerHTML = '';
    taskList.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.innerHTML = `
            <h3>${task.name}</h3>
            ${task.image ? `<img src="${URL.createObjectURL(task.image)}" alt="Task Image" />` : ''}
            <button class="complete-btn" onclick="markTaskAsCompleted(${index})">Mark as Completed 💕</button>
        `;
        taskListContainer.appendChild(taskCard);
    });
}

// Mark task as completed
function markTaskAsCompleted(index) {
    const task = taskList[index];
    task.completed = true;
    completedTasks.push(task);
    taskList.splice(index, 1);
    displayTasks();
    displayCompletedTasks();
    showEncouragementPopup();
}

// Display completed tasks
function displayCompletedTasks() {
    const completedCardsContainer = document.getElementById('completed-cards');
    completedCardsContainer.innerHTML = '';
    completedTasks.forEach((task) => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card completed';
        taskCard.innerHTML = `
            <h3>${task.name}</h3>
            ${task.image ? `<img src="${URL.createObjectURL(task.image)}" alt="Completed Task Image" />` : ''}
        `;
        completedCardsContainer.appendChild(taskCard);
    });
}

// Show encouragement popup
function showEncouragementPopup() {
    document.getElementById('encouragement-popup').style.display = 'flex';
}

// Close encouragement popup
document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('encouragement-popup').style.display = 'none';
});

// Download completed tasks as an image
document.getElementById('download-completed').addEventListener('click', function() {
    html2canvas(document.getElementById('completed-cards')).then(function(canvas) {
        const link = document.createElement('a');
        link.download = 'completed_love_tasks.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});
