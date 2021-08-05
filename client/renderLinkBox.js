const demoLink = [
  { name: '깃허브', url: 'https://www.github.com', img: '' },
  { name: '노션', url: 'https://www.notion.so', img: '' },
  { name: '네이버', url: 'https://www.naver.com', img: '' },
  { name: '구글', url: 'https://google.com', img: '' },
];
const renderLinkBox = () => {
  chrome.storage.sync.get('link', function ({ link }) {
    if (link) {
      document.querySelector('.link-box').innerHTML = link
        .map((item) => {
          return `<li><a href=${item.url}>${item.name}</a></li>`;
        })
        .join('');
    } else {
      document.querySelector('.link-box').innerHTML = demoLink
        .map((item) => {
          return `<li><a href=${item.url}>${item.name}</a></li>`;
        })
        .join('');
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
