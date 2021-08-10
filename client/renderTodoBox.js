const todoBox = document.querySelector('.todo-box');

let todoAddBtnClicked = false;

const todoAddBtnRender = () => {
  return todoAddBtnClicked
    ? `
      <form class="add-form">
      <input type="text" class="todo-input" placeholder="이름"/>
      <button class="todo-submit-btn"> 저장 </button>
      </form>
     `
    : `
      <a href="#" class="todo-add-btn">할 일 추가하기 </a>
    `;
};
const todoAddBtnEvent = () => {
  todoAddBtnClicked
    ? document
        .querySelector('.todo-submit-btn')
        .addEventListener('click', (e) => {
          e.preventDefault();
          let todoName = document.querySelector('.todo-input').value;
          chrome.storage.sync.get('todo', function ({ todo }) {
            chrome.storage.sync.set(
              {
                todo: todo
                  ? [
                      ...todo,
                      {
                        index: todo.length + 1,
                        name: todoName,
                      },
                    ]
                  : [
                      {
                        index: 1,
                        name: todoName,
                      },
                    ],
              },
              () => renderTodoBox(),
            );
          });
          todoAddBtnClicked = false;
          renderTodoBox();
        })
    : document.querySelector('.todo-add-btn').addEventListener('click', () => {
        todoAddBtnClicked = true;
        renderTodoBox();
      });

  todoAddBtnClicked ? document.querySelector('.todo-input').focus() : null;
};
function todoCheckBox(item) {
  return `<label class="todo-label"> <input class="todo-checkbox" id=${item.index} type="checkbox"/><span>${item.name}</span></label>`;
}
const renderTodoBox = () => {
  chrome.storage.sync.get('todo', function ({ todo }) {
    let checkTodo = todo ?? [];

    renderList('.todo-box', checkTodo, todoCheckBox, todoAddBtnRender);

    delEventToElement('.todo-checkbox', 'change', 'todo', renderTodoBox);

    todoAddBtnEvent();
  });
};
renderTodoBox();
