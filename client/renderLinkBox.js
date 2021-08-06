let addBtnClicked = false;
// chrome.storage.sync.remove('link');
// chrome.storage.sync.get('link', ({ link }) => console.log(link));
const demoLink = [
  { index: 1, name: '깃허브', url: 'https://www.github.com', img: '' },
  { index: 2, name: '노션', url: 'https://www.notion.so', img: '' },
  { index: 3, name: '네이버', url: 'https://www.naver.com', img: '' },
  { index: 4, name: '구글', url: 'https://google.com', img: '' },
];
const addBtnRender = () => {
  return addBtnClicked
    ? `
    <form class="add-form">
    <input type="text" class="name-input" placeholder="이름"/>
    <input type="text" class="url-input" placeholder="URL" />
    <button class="add-submit-btn"> 저장 </button>
    </form>
   `
    : `
    <li><a href="#" class="add-btn">추가하기  </a></li>
  `;
};
const addBtnEvent = () => {
  addBtnClicked
    ? document
        .querySelector('.add-submit-btn')
        .addEventListener('click', (e) => {
          e.preventDefault();
          chrome.storage.sync.get('link', function ({ link }) {
            if (link) {
              chrome.storage.sync.set(
                {
                  link: [
                    ...link,
                    {
                      index: link.length + 5,
                      name: document.querySelector('.name-input').value,
                      url: document.querySelector('.url-input').value,
                    },
                  ],
                },
                () => renderLinkBox(),
              );
            } else {
              chrome.storage.sync.set(
                {
                  link: [
                    {
                      index: 5,
                      name: document.querySelector('.name-input').value,
                      url: document.querySelector('.url-input').value,
                    },
                  ],
                },
                () => renderLinkBox(),
              );
            }
          });
          addBtnClicked = false;
          renderLinkBox();
        })
    : document.querySelector('.add-btn').addEventListener('click', () => {
        addBtnClicked = true;
        renderLinkBox();
      });
};
const delBtnEvent = () => {
  let delBtns = document.querySelectorAll('.del-btn');
  for (let i = 0; i < delBtns.length; i++) {
    delBtns[i].addEventListener('click', (e) => {
      chrome.storage.sync.get('link', ({ link }) => {
        chrome.storage.sync.set(
          {
            link: link.filter((item) => item.index !== +e.target.id),
          },
          () => renderLinkBox(),
        );
      });
    });
  }
};
// <img class="add-btn" src="plus-solid.svg" alt="add button"> 추가하기

const renderLinkBox = () => {
  chrome.storage.sync.get('link', function ({ link }) {
    if (link && link.length) {
      document.querySelector('.link-box').innerHTML = `${link
        .map((item) => {
          return `<li><a href=${item.url}>${item.name}</a>  <a id=${item.index} class="del-btn" href="#">삭제 </a></li>`;
        })
        .join('')}
        ${addBtnRender()}
        `;
      addBtnEvent();
      delBtnEvent();
    } else {
      document.querySelector('.link-box').innerHTML = `
      ${demoLink
        .map((item) => {
          return `<li><a href=${item.url}>${item.name}</a> <a id=${item.index} class="del-btn" href="#">삭제 </a> </li>`;
        })
        .join('')}
        ${addBtnRender()}
        `;
      addBtnEvent();
      delBtnEvent();
    }
  });
};

renderLinkBox();
// 1. storage check -> 저장된 데이터 있는지 없는지
// 1-1 없으면 default 값으로 제공

// 2. 있으면 가져와서 추가시켜주기
// for (let index = 0; index < link.length; index++) {
//   const _name = link[index].name;
//   const _url = link[index].url;
//   const _img = link[index].img;
//   console.log(_name, _url, _img);
// }
