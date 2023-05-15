
/* Criação de listas personalizadas */

let tasks = document.querySelectorAll('.task');

const current_list_select = document.querySelector('#tasks-lists-sel');
const new_list_add_btn = document.querySelector('#add-new-task-list');
const new_list_cancel_btn = document.querySelector('#cancel-new-task-btn');
const confirm_newTaskli_btn = document.querySelector('#confirm-list-btn');
const name_newTaskLi_input = document.querySelector('#add-new-list-input');
const current_list_div = document.querySelector('#current-list-div');
const new_list_div = document.querySelector('#new-list-div');
const list_buttons_div = document.querySelector('#list-buttons-div');
const del_list_btn = document.querySelector('#del-list-btn')
const confirm_delete_list_div = document.querySelector('#confirm_delete_list_div')
const msg_to_delete_list = document.querySelector('#msg_to_delete_list');

current_list_select.addEventListener('input', () => {
    localStorage.setItem('listvalue',current_list_select.value); 
    new_task_sel.value = current_list_select.value;
    refresh_lists();
    toggleNewTaskDivs();
});
new_list_add_btn.addEventListener('click', () => {
    toggleNewTaskDivs();
    closeSearch();
    current_list_div.style.display = 'none';
    list_buttons_div.style.display = 'none';
    new_list_div.style.display = 'flex';
    name_newTaskLi_input.value = '';
    name_newTaskLi_input.focus();
});
del_list_btn.addEventListener('click', () => {
    const option_selected = current_list_select.value
    const confirm_delete_list_btn = document.querySelector('#confirm_delete_list_btn')
    if (current_list_select.length > 1) {

        msg_to_delete_list.innerHTML = `Tem certeza que deseja deletar a lista <strong>${current_list_select.value}</strong> ?`
        current_list_div.style.display = 'none';
        list_buttons_div.style.display = 'none';
        confirm_delete_list_div.style.display = 'flex'

        const cancel_delete_list_btn = document.querySelector('#cancel_delete_list_btn')

        cancel_delete_list_btn.addEventListener('click', () => {
        current_list_div.style.display = 'flex';
        list_buttons_div.style.display = 'flex';
        confirm_delete_list_div.style.display = 'none';
    });

    const confirm_delete_list_btn = document.querySelector('#confirm_delete_list_btn');

    confirm_delete_list_btn.addEventListener('click', () => {
        
        let list_options = document.querySelectorAll('#tasks-lists-sel option');

        list_options.forEach((list) => {
            if (list.value === option_selected) {

                let listClass = option_selected.replace(/\s/g, '-');
                tasks.forEach((task) => {
                    if (task.classList.contains(`${listClass}`)){
                task.remove();
                }});
                
            list.remove();
            };
            current_list_div.style.display = 'flex';
            list_buttons_div.style.display = 'flex';
            confirm_delete_list_div.style.display = 'none'         
        });
        current_list_select.value = current_list_select[0].value;
        tasks = document.querySelectorAll('.task');
        refresh_lists();
    });
    } else {
        msg_to_delete_list.innerHTML = `Impossível deletar <strong>${current_list_select.value}</strong>, você precisa ter pelo menos uma lista ativa!`;
        confirm_delete_list_btn.style.display = 'none';
        current_list_div.style.display = 'none';
        list_buttons_div.style.display = 'none';
        confirm_delete_list_div.style.display = 'flex'
    }
});
    

new_list_cancel_btn.addEventListener('click', () => {
   toggleNewListsDivs();  
});
confirm_newTaskli_btn.addEventListener('click',() => {

    if (!/^\s*$/.test(name_newTaskLi_input.value)){
        let newtask = document.createElement('option');
        newtask.value = name_newTaskLi_input.value;
        newtask.textContent = name_newTaskLi_input.value;
        current_list_select.appendChild(newtask);
        current_list_select.value = newtask.value; 
        new_task_sel.innerHTML = current_list_select.innerHTML;
        localStorage.setItem('listvalue',current_list_select.value)
        toggleNewListsDivs(); 
        refresh_lists();
        storageTasks();
    } else {
        name_newTaskLi_input.value = 'Digite um nome!';
        setTimeout(() => {
            name_newTaskLi_input.value = '';
        },1000);
    }
});

/* Busca e filtro */
const search_input = document.querySelector('#search-input');
const search_btn = document.querySelector('#search-button');
const back_search_btn = document.querySelector('#erase_search');
let tasks_titles = document.querySelectorAll('.taskTitle');
const search_div = document.querySelector('#search_div');
const glass_button_div = document.querySelector('#glass_button_div');

search_btn.addEventListener('click', () => {
    toggleFIlterDiv();
    toggleNewTaskDivs();
    toggleNewListsDivs();
    search_div.style.display = 'flex';
    glass_button_div.style.display = 'none';
    search_input.value = '';
    search_input.focus();     
});
search_input.addEventListener('input', () => {
    tasks_titles = document.querySelectorAll('.taskTitle');
    let search_input_value = search_input.value.toLowerCase();
    
    tasks_titles.forEach(title => {
        let titletext = title.textContent.toLowerCase();
        if(titletext.includes(search_input_value)){
            title.closest('div').style.display = 'flex';
        } else {
            title.closest('div').style.display = 'none'; 
        }
    });
});
back_search_btn.addEventListener('click', () => {
    closeSearch();
    FilterDiv.style.display = 'flex';
    glass_button_div.style.display = 'flex';
    refresh_lists();
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
    new_task_sel.innerHTML = current_list_select.innerHTML;
    toggleNewListsDivs();
    input_newTask_Name.value = '';
    add_newTask_div.style.display = 'none'
    create_newTask_input.style.display = 'flex'
    new_task_sel.value = current_list_select.value;
    input_newTask_Name.focus();
    closeSearch();
    refresh_lists();
});

new_task_sel.addEventListener('input', () => {
    current_list_select.value = new_task_sel.value
    refresh_lists();
})

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
/* Tools */

const tools_btn = document.querySelector('#tools_btn')
const erase_data_op = document.querySelector('#erase_data_op')
const feedback_op = document.querySelector('#feedback_op')

tools_btn.addEventListener('click', () => {

    const tools_options_div = document.querySelector('#tools_options');
    let tools_options_display = tools_options_div.style.display;
    
    if (tools_options_display === 'none'){
        tools_options_div.style.display = 'flex';
    } else if (tools_options_display === 'flex') {
        tools_options_div.style.display = 'none';
    }
});

erase_data_op.addEventListener('click', () => {
    let confirm_ask = confirm('Tem certeza que deseja deletar todos os dados?');
    if (confirm_ask) {
        localStorage.clear();
        location.reload(); 
    }
});

feedback_op.addEventListener('click', () => {
    window.open('https://wa.me/5567991214516','_blank')
})

/* Funçoes de uso geral */

const refresh_lists = () => {
    if (current_list_select.value.includes(' ')) {
        let refreshToSelect = current_list_select.value.replace(/\s/g, '-')
        tasks.forEach((task) => {
            if (!task.classList.contains(`${refreshToSelect}`)){
                task.style.display = 'none';
            } else if(task.classList.contains(`${refreshToSelect}`)){
                task.style.display = 'flex';
            }
        })
    } else {
        tasks.forEach((task) => {
            if (!task.classList.contains(`${current_list_select.value}`)){
                task.style.display = 'none';
            } else if(task.classList.contains(`${current_list_select.value}`)){
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
    current_list_div.style.display = 'flex'
    list_buttons_div.style.display = 'flex'
    new_list_div.style.display = 'none'
    name_newTaskLi_input.value = '';
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
    FilterDiv.style.display = 'flex'
    glass_button_div.style.display = 'flex'
    search_div.style.display = 'none'
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
    localStorage.setItem('lists', current_list_select.innerHTML)
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
     if((localStorage.getItem('tasks') === null) && (localStorage.getItem('lists') === null)){
        localStorage.setItem('lists', current_list_select.innerHTML)
        localStorage.setItem('tasks', tasks_mainBox.innerHTML)
    } else {
        current_list_select.innerHTML = localStorage.getItem('lists')
        tasks_mainBox.innerHTML = localStorage.getItem('tasks')
    } 
    if (localStorage.getItem('listvalue') != null) {
        current_list_select.value = localStorage.getItem('listvalue')
    }
    tasks = document.querySelectorAll('.task')
    refresh_lists();
})