const trelContainer = document.querySelector('.trel-container');

export default class AddTask{
    constructor(){
        this.trelContainer = trelContainer;
    }

    clickBtn(){ /*переименовать*/
        let actualElement;
        let positionTask = false;




        this.trelContainer.addEventListener('click', (e)=>{
            if(e.target.classList.contains('trel__todo-task-add')){
                this.addTextArea(e);
            }

            if(e.target.classList.contains('trel__todo-task-add-contaiener-btnclose')){
                this.closeTaskAdd(e);
            }

            if(e.target.classList.contains('trel__todo-task-add-contaiener-btnadd')){
                this.addTask(e);
                this.closeTaskAdd(e);
            }

            if(e.target.classList.contains('trel__todo-task-close')){
                let deleteTaskContainer = e.target.closest('.trel__todo-task-container');
                deleteTaskContainer.remove();
            }
        })

        this.trelContainer.addEventListener('input', (e)=>{
            if(e.target.classList.contains('trel__todo-task-add-contaiener-textarea')){
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
            }
        })

        this.trelContainer.addEventListener('mouseover', (e)=>{     
            if(e.target.classList.contains('trel__todo-task')){
                if(e.target.nextElementSibling == null){  
                    this.deleteTask(e)   
                }
            }
        })

        
       this.trelContainer.addEventListener('mouseout', (e)=>{
            if(e.target.classList.contains('trel__todo-task') && !e.relatedTarget.classList.contains('trel__todo-task-close')){
                if(e.target.nextElementSibling !== null){
                    e.target.nextElementSibling.remove();
                }                
            } else if (e.target.classList.contains('trel__todo-task-close')){
                e.target.remove();
            }                
        })

        this.trelContainer.addEventListener('mousedown', (e)=>{
            if(e.target.classList.contains('trel__todo-task')){
                e.preventDefault();
                actualElement = e.target;
                actualElement.classList.add('dragged')
                actualElement.style.width = '60px';
                actualElement.style.height = '30px';
                this.trelContainer.addEventListener('mouseup', onMouseUp);
                this.trelContainer.addEventListener('mouseover', onMouseOver)
            }
        })

        const onMouseUp = ()=>{
            actualElement.classList.remove('dragged');
            actualElement.style.width = '100%';
            actualElement.style.height = '';
            actualElement = undefined;
            this.trelContainer.removeEventListener('mouseup', onMouseUp);
            this.trelContainer.removeEventListener('mouseover', onMouseOver)
        }

        const onMouseOver = (e)=>{
            console.log(e)
            
            actualElement.style.top = e.clientY + 'px';
            actualElement.style.left = e.clientX + 'px';
            
        }
    }

    addTextArea(e){
        const textAreaContaier = document.createElement('div');
        textAreaContaier.classList.add('trel__todo-task-add-container');        
        e.target.after(textAreaContaier);

        const textAreaTask = document.createElement('textarea');
        textAreaTask.placeholder = 'Enter a title for this card...';
        textAreaTask.classList.add('trel__todo-task-add-contaiener-textarea');

        const btnAddTask = document.createElement('button');
        btnAddTask.classList.add('trel__todo-task-add-contaiener-btnadd');
        btnAddTask.textContent="Add Task";

        const closeTask = document.createElement('div');
        closeTask.classList.add('trel__todo-task-add-contaiener-btnclose');


        e.target.nextElementSibling.appendChild(textAreaTask);
        e.target.nextElementSibling.appendChild(btnAddTask);
        e.target.nextElementSibling.appendChild(closeTask);
        e.target.style.display ='none';
    }

    addTask(e){
        const newContainerTask = document.createElement('div');
        newContainerTask.classList.add('trel__todo-task-container');
        
        const newTask = document.createElement('div');
        newTask.classList.add('trel__todo-task');
        const searchContainerTaskBoard = e.target.closest('.trel__todo-board');
        const searchContainerTask = searchContainerTaskBoard.querySelector('.trel__todo-container-task');  
        const searchTextArea = searchContainerTaskBoard.querySelector('.trel__todo-task-add-contaiener-textarea');    
        newTask.innerHTML = searchTextArea.value;

        searchContainerTask.appendChild(newContainerTask);
        searchContainerTask.lastChild.appendChild(newTask);
    }

    closeTaskAdd(e){
        let searchParrent = e.target.closest('.trel__todo-board');
        let searchBtn = searchParrent.querySelector('.trel__todo-task-add');
        searchBtn.style.display = 'block';
        let deleteTextArea = searchParrent.querySelector('.trel__todo-task-add-container');
        deleteTextArea.innerHTML = ''; 
    }

    deleteTask(e){        
        const deleteTask = document.createElement('div');
        deleteTask.classList.add('trel__todo-task-close');
        deleteTask.innerHTML = "&#9587;";
        e.target.after(deleteTask);
    }
    
}