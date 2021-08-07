let linkAddBtnClicked = false;
// chrome.storage.sync.remove('todo');
// chrome.storage.sync.get('link', ({ link }) => console.log(link));
const defaultLink = [
  { index: 1, name: '깃허브', url: 'https://www.github.com', img: '' },
  { index: 2, name: '노션', url: 'https://www.notion.so', img: '' },
  { index: 3, name: '네이버', url: 'https://www.naver.com', img: '' },
  { index: 4, name: '구글', url: 'https://google.com', img: '' },
];
const linkAddBtnRender = () => {
  return linkAddBtnClicked
    ? `
    <form class="add-form">
    <input type="text" class="name-input" placeholder="이름"/>
    <input type="text" class="url-input" placeholder="URL" />
    <button class="add-submit-btn"> 저장 </button>
    </form>
   `
    : `
    <li><a href="#" class="add-btn">추가하기</a></li>
  `;
};
const linkAddBtnEvent = () => {
  linkAddBtnClicked
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
          linkAddBtnClicked = false;
          renderLinkBox();
        })
    : document.querySelector('.add-btn').addEventListener('click', () => {
        linkAddBtnClicked = true;
        renderLinkBox();
      });

  linkAddBtnClicked ? document.querySelector('.name-input').focus() : null;
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

const renderLinkBox = () => {
  chrome.storage.sync.get('link', function ({ link }) {
    let concatenatedLinks = link ? defaultLink.concat(link) : defaultLink;
    document.querySelector('.link-box').innerHTML = `${concatenatedLinks
      .map((item) => {
        return `<li><a href=${item.url}>${item.name}</a>  <a id=${item.index} class="del-btn" href="#">삭제 </a></li>`;
      })
      .join('')}
        ${linkAddBtnRender()}
        `;
    linkAddBtnEvent();
    delBtnEvent();
  });
};

renderLinkBox();
