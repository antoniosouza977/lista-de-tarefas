// Selecionando HTML do documento para LocalStorage
const Doc_HTML = document.querySelector('#main-box')

/* Criação de listas personalizadas */
let tasks = document.querySelectorAll('.task')
const tasksLists_select = document.querySelector('#tasks-lists-sel')
const add_NewList_btn = document.querySelector('#add-new-task-list')
const new_tsk_itens = document.querySelectorAll('.ntsk-item')
const cancel_NewList = document.querySelector('#cancel-new-task-btn')
const confirm_newTaskli_btn = document.querySelector('#confirm-list-btn')
const name_newTaskLi = document.querySelector('#add-new-list-input')
const currentList_h4 = document.querySelector('#current-list-h4')


tasksLists_select.addEventListener('input', () => {
    localStorage.setItem('listvalue',tasksLists_select.value) 
    new_task_sel.value = tasksLists_select.value;
    refresh_lists();
    toggleNewTaskDivs();
})
add_NewList_btn.addEventListener('click', () => {
    toggleNewTaskDivs();
    closeSearch();
    currentList_h4.style.display = 'none';
    tasksLists_select.style.display = 'none';
    add_NewList_btn.style.display = 'none'
    new_tsk_itens.forEach((tskiten) => {
        tskiten.style.display = 'flex';
    })
    name_newTaskLi.value = '';
    
    name_newTaskLi.focus();
});
cancel_NewList.addEventListener('click', () => {
   toggleNewListsDivs();      
});
confirm_newTaskli_btn.addEventListener('click',() => {
    if (!/^\s*$/.test(name_newTaskLi.value)){

        let newtask = document.createElement('option');

        newtask.value = name_newTaskLi.value;
        newtask.textContent = name_newTaskLi.value;

        tasksLists_select.appendChild(newtask);

        name_newTaskLi.value = '';
        currentList_h4.style.display = 'flex';
        tasksLists_select.style.display = 'flex';
        add_NewList_btn.style.display = 'flex'
        new_tsk_itens.forEach((tskiten) => {
        tskiten.style.display = 'none';
        tasksLists_select.value = newtask.value;
        refresh_lists();
        storageTasks();
        new_task_sel.innerHTML = tasksLists_select.innerHTML;
        localStorage.setItem('listvalue',tasksLists_select.value)
    })      
    } else{
        name_newTaskLi.value = 'Digite um nome!'
        setTimeout(() => {
            name_newTaskLi.value = '';
        },750)
    }
});
/* Busca e filtro */
const search_input = document.querySelector('#search-input')
const search_btn = document.querySelector('#search-button')
const back_search = document.querySelector('#erase_search')
let tasks_titles = document.querySelectorAll('.taskTitle')
const search_div = document.querySelector('#search_div')

search_btn.addEventListener('click', () => {
    toggleFIlterDiv();
    toggleNewTaskDivs();
    toggleNewListsDivs();
    erase_search.style.display = 'flex'  
    search_input.style.display = 'flex'
    search_btn.style.display = 'none'
    search_input.value = '';
    search_input.focus();     
})
search_input.addEventListener('input', () => {
    tasks_titles = document.querySelectorAll('.taskTitle')
    let search_input_value = search_input.value.toLowerCase();
    
    tasks_titles.forEach(title => {
        let titletext = title.textContent.toLowerCase();
        if(titletext.includes(search_input_value)){
            title.closest('div').style.display = 'flex'
        } else {
            title.closest('div').style.display = 'none' 
        }
    });
});
back_search.addEventListener('click', () => {
    closeSearch();
    FilterDiv.style.display = 'flex'
    search_div.style.width= '100%'
});

//filtro

const filter = document.querySelector('#tasks-filter')

filter.addEventListener('change', () => {
    refresh_filter();
    
  });
/* Criação de novas tarefas */

const new_task_btn = document.querySelector("#new-task-btn");
const create_newTask_input = document.querySelector('#create-task-field');
const add_newTask_div = document.querySelector('#create-task')
const new_task_sel = document.querySelector('#add-task-to-list');
const confirm_newTask_btn = document.querySelector('#confirm-newTask-btn')
const cancel_newTask_btn = document.querySelector('#cancel-newTask-btn')
const input_newTask_Name = document.querySelector('#new-task-fied')
const tasks_mainBox = document.querySelector('#tasks-todo-box')

new_task_btn.addEventListener('click', () => {
    toggleNewListsDivs();
    input_newTask_Name.value = '';
    add_newTask_div.style.display = 'none'
    create_newTask_input.style.display = 'flex'
    new_task_sel.value = tasksLists_select.value;
    input_newTask_Name.focus();
    closeSearch();
    refresh_lists();
});
confirm_newTask_btn.addEventListener('click', () => {
    if (!/^\s*$/.test(input_newTask_Name.value)) { // Testa se o valor do input não possui apenas espaços.
        // criação da div principal
        let newTask_div = document.createElement('div')
        newTask_div.classList.add('task',`${new_task_sel.value.replace(/\s/g, '-')}`)
        
    
        // criação dos elementos
        let newTask_check_icon = document.createElement('i')
        newTask_check_icon.classList.add('fa-sharp', 'fa-regular', 'fa-square')
        newTask_div.appendChild(newTask_check_icon)
    
        let newTask_title = document.createElement('h3')
        newTask_title.classList.add('taskTitle', 'tlb-item')
        newTask_title.textContent = input_newTask_Name.value;
        newTask_div.appendChild(newTask_title)
    
        let newTask_done_button = document.createElement('button')
        newTask_done_button.classList.add('finish-task')
        newTask_done_button.innerHTML = ` <i class="fa-solid fa-check"></i>`;
        newTask_div.appendChild(newTask_done_button)
    
        let newTask_edit_button = document.createElement('button')
        newTask_edit_button.classList.add('edit-task')
        newTask_edit_button.innerHTML = ` <i class="fa-solid fa-pen"></i>`;
        newTask_div.appendChild(newTask_edit_button)
    
        let newTask_remove_button = document.createElement('button')
        newTask_remove_button.classList.add('remove-task')
        newTask_remove_button.innerHTML = ` <i class="fa-sharp fa-solid fa-trash"></i>`;
        newTask_div.appendChild(newTask_remove_button)
    
        tasks_mainBox.appendChild(newTask_div)

        add_newTask_div.style.display = 'flex'
        create_newTask_input.style.display = 'none'
        tasks = document.querySelectorAll('.task')
        tasks_titles = document.querySelectorAll('.taskTitle')
        refresh_lists();
        checkFirstTask();
        storageTasks();
    } else {
        input_newTask_Name.value = 'Insira um nome!'
        setTimeout(() => {
            input_newTask_Name.value = ''
        },750)
    }

});
cancel_newTask_btn.addEventListener('click', () => {
    toggleNewTaskDivs();
})

/* Botoes das tarefas */

const edit_task_div = document.querySelector('#edit-task-div')
const edit_task_input = document.querySelector('#edit-task-input')
const confirm_newTaskName_btn = document.querySelector('#confirm_newTaskName_btn')


document.addEventListener('click', (e) => {
    const targetEl = e.target ;
    const parentEl = targetEl.closest('div') // seleciona a div mais proxima do target
    let todoTitle;

    // abaixo checagem se existe o titulo
    if (parentEl && parentEl.querySelector('h3')){
        todoTitle = parentEl.querySelector('h3').innerText;
    }

    if(targetEl.classList.contains('finish-task')){

        if(targetEl.closest("div").querySelector('i').classList.contains('fa-square-check')){
            parentEl.style.opacity ='1'
            parentEl.classList.toggle('done');
            targetEl.closest("div").querySelector('i').classList.replace('fa-square-check','fa-square')
        } else{
            targetEl.closest("div").querySelector('i').classList.replace('fa-square','fa-square-check')
            parentEl.classList.toggle('done');
            parentEl.style.opacity ='0.5'
        }
    }

    if(targetEl.classList.contains('remove-task')){
        parentEl.remove();
        storageTasks();
        tasks = document.querySelectorAll('.task')
    }

    if(targetEl.classList.contains('edit-task')){
        old_input_value = parentEl.querySelector('h3').textContent;
        edit_task_div.style.display = 'flex'
        parentEl.style.display = 'none'
        edit_task_input.value = parentEl.querySelector('h3').textContent
        
    }
    if (targetEl === confirm_newTaskName_btn){
        
        if (!/^\s*$/.test(edit_task_input)) {
            tasks.forEach((task) => {
                if(old_input_value == task.querySelector('h3').textContent){
                    task.querySelector('h3').textContent = edit_task_input.value;  
                }
                task.style.display = 'flex';
            })
            edit_task_div.style.display = 'none';
            tasks_mainBox.style.display = 'block';
        }
        storageTasks();
    }
});

/* Funçoes de uso geral */

const refresh_lists = () => {
    if (tasksLists_select.value.includes(' ')) {
        let refreshToSelect = tasksLists_select.value.replace(/\s/g, '-')
        tasks.forEach((task) => {
            if (!task.classList.contains(`${refreshToSelect}`)){
                task.style.display = 'none';
            } else if(task.classList.contains(`${refreshToSelect}`)){
                task.style.display = 'flex';
            }
        })
    } else {
        tasks.forEach((task) => {
            if (!task.classList.contains(`${tasksLists_select.value}`)){
                task.style.display = 'none';
            } else if(task.classList.contains(`${tasksLists_select.value}`)){
                task.style.display = 'flex';
            }
        })
    }
}

const toggleNewTaskDivs = () => {
    add_newTask_div.style.display = 'flex'
    create_newTask_input.style.display = 'none'
    input_newTask_Name.value = '';
}

const toggleNewListsDivs = () => {
    currentList_h4.style.display = 'flex';
    tasksLists_select.style.display = 'flex';
    add_NewList_btn.style.display = 'flex'
    new_tsk_itens.forEach((tskiten) => {
        tskiten.style.display = 'none';
    })      
}
const checkFirstTask = () => {
    if(tasks[0].classList.contains('exemplo')){
        if (!tasks[0].classList.contains('done')){
            tasks[0].classList.add('done')
            tasks[0].querySelector('i').classList.replace('fa-square','fa-square-check');
            tasks[0].style.opacity ='0.5'
        }
    }
}
const closeSearch = () => {
    back_search.style.display = 'none'  
    search_input.style.display = 'none'
    search_btn.style.display = 'flex'
    search_input.value = '';
    tasks.forEach(task => {
        task.style.display = 'flex'
    });  
}
const FilterDiv = document.querySelector('#filter_div')
const toggleFIlterDiv = () => {   
    FilterDiv.style.display = 'none'
}

const storageTasks = () => {
    localStorage.setItem('tasks', tasks_mainBox.innerHTML)
    localStorage.setItem('lists', tasksLists_select.innerHTML)
}
const refresh_filter = () => {
    const selectedOption = filter.value;

    tasks.forEach(task => {
        task.style.display = 'none';
    })
    
    if ((selectedOption === 'all')) {
        for (let i = 0; i < tasks.length; i++){
            tasks[i].style.display = 'flex' 
        }
        refresh_lists();
    } else if (selectedOption === 'done') {
        tasks.forEach((task) => {
            task.style.display = 'flex';
        })
        refresh_lists();
        for (let i = 0; i < tasks.length; i++){
            if(!tasks[i].classList.contains('done')){
                tasks[i].style.display = 'none'
            }
        }
    } else if (selectedOption === 'todo') {
        tasks.forEach((task) => {
            task.style.display = 'flex';
        })
        refresh_lists();
        for (let i = 0; i < tasks.length; i++){
            if(tasks[i].classList.contains('done')){
                tasks[i].style.display = 'none'
            }
        }
    } 
}


 document.addEventListener('DOMContentLoaded', () =>{
    tasks.forEach(task => {
        task.style.display = 'flex'
    })
    
     if((localStorage.getItem('tasks') === null) && (localStorage.getItem('lists') === null)){
        localStorage.setItem('lists', tasksLists_select.innerHTML)
        localStorage.setItem('tasks', tasks_mainBox.innerHTML)
    } else {
        tasksLists_select.innerHTML = localStorage.getItem('lists')
        tasks_mainBox.innerHTML = localStorage.getItem('tasks')
    } 
    if (localStorage.getItem('listvalue') != null) {
        tasksLists_select.value = localStorage.getItem('listvalue')
    }
    refresh_lists();
    
})
 