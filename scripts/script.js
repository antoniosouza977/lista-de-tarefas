/* Criação de listas personalizadas */

const tsk_li_sel = document.querySelector('#tasks-lists-sel')
const add_new_list_btn = document.querySelector('#add-new-task-list')
const new_tsk_itens = document.querySelectorAll('.ntsk-item')
const cancel_newTask_btn = document.querySelector('#cancel-new-task-btn')
const confirm_newTaskli_btn = document.querySelector('#confirm-list-btn')
const name_newTaskLi = document.querySelector('#add-new-list-input')
const currentList_h4 = document.querySelector('#current-list-h4')



add_new_list_btn.addEventListener('click', () => {
    currentList_h4.style.display = 'none';
    tsk_li_sel.style.display = 'none';
    add_new_list_btn.style.display = 'none'
    new_tsk_itens.forEach((tskiten) => {
        tskiten.style.display = 'flex';
    })
});
cancel_newTask_btn.addEventListener('click', () => {
    currentList_h4.style.display = 'flex';
    tsk_li_sel.style.display = 'flex';
    add_new_list_btn.style.display = 'flex'
    new_tsk_itens.forEach((tskiten) => {
        tskiten.style.display = 'none';
    })      

});
confirm_newTaskli_btn.addEventListener('click',() => {
    if (name_newTaskLi.value.length > 0){

        let newtask = document.createElement('option');

        newtask.value = name_newTaskLi.value;
        newtask.textContent = name_newTaskLi.value;

        tsk_li_sel.appendChild(newtask);

        name_newTaskLi.value = '';
        add_new_list_btn.style.display = 'flex'
        new_tsk_itens.forEach((tskiten) => {
        tskiten.style.display = 'none';
        tsk_li_sel.value = newtask.value;
    })      
    } else{
        name_newTaskLi.value = 'Digite um nome!'
        setTimeout(() => {
            name_newTaskLi.value = '';
        },750)
    }
});
