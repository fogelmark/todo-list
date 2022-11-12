let taskArray = []
let inputEl = document.querySelector('.input-el')
const addBtn = document.querySelector('#add-btn')
const clearBtn = document.querySelector('#clear-btn')
const ulEl = document.querySelector('#ul-el')



let storageInput = JSON.parse(localStorage.getItem('taskArray'))
console.log(storageInput);

if (storageInput) {
    taskArray = storageInput
    render(taskArray)
}

inputEl.addEventListener('keyup', e => {
    if (inputEl.value.trim() === '') {
        alert('enter a task')
    } else if (e.key == 'Enter') {
    taskArray.push({name: inputEl.value, status: 'pending'})
    inputEl.value = ''

    localStorage.setItem('taskArray', JSON.stringify(taskArray))
    render(taskArray)
    }
})


// addBtn.addEventListener('click', function() {
//     if (inputEl.value.trim() === '') {
//         alert('enter a task')
//     } else {
//         taskArray.push({name: inputEl.value, status: 'pending'})
//         inputEl.value = ''
//         localStorage.setItem('taskArray', JSON.stringify(taskArray))
//         render(taskArray)
//     }
// })

clearBtn.addEventListener('dblclick', function() {
    taskArray = []
    localStorage.clear()
    render(taskArray)
})

function render() {
    let listItems = ''
    taskArray.forEach((task, id) => {
        let isCompleted = task.status == 'completed' ? 'checked' : '';
        listItems += `
        <li class="task">
        <label for="${id}">
        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}/>
        <p class="${isCompleted}">${task.name}</p>
        </label>
        </li>`
    })
    ulEl.innerHTML = listItems
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add('checked')
        taskArray[selectedTask.id].status = 'completed'
    } else {
        taskName.classList.remove('checked')
        taskArray[selectedTask.id].status = 'pending'
    }
    localStorage.setItem('taskArray', JSON.stringify(taskArray))
}

