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
          let todoName = document.querySelector('.todo-input').value;
          e.preventDefault();
          chrome.storage.sync.get('todo', function ({ todo }) {
            if (todo) {
              chrome.storage.sync.set(
                {
                  todo: [
                    ...todo,
                    {
                      index: todo.length + 1,
                      name: todoName,
                    },
                  ],
                },
                () => renderTodoBox(),
              );
            } else {
              chrome.storage.sync.set(
                {
                  todo: [
                    {
                      index: 1,
                      name: todoName,
                    },
                  ],
                },
                () => renderTodoBox(),
              );
            }
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
const todoDelBtnEvent = () => {
  let todos = document.querySelectorAll('.todo-checkbox');
  for (let i = 0; i < todos.length; i++) {
    todos[i].addEventListener('change', (e) => {
      chrome.storage.sync.get('todo', ({ todo }) => {
        chrome.storage.sync.set(
          {
            todo: todo.filter((item) => item.index !== +e.target.id),
          },
          () => renderTodoBox(),
        );
      });
    });
  }
};
const renderTodoBox = () => {
  chrome.storage.sync.get('todo', function ({ todo }) {
    document.querySelector('.todo-box').innerHTML = `
        ${todo
          .map((item) => {
            return `<label class="todo-label"> <input class="todo-checkbox" id=${item.index} type="checkbox"/><span>${item.name}</span></label>`;
          })
          .join('')}
          ${todoAddBtnRender()}
  `;
    todoAddBtnEvent();
    todoDelBtnEvent();
  });
};

renderTodoBox();
