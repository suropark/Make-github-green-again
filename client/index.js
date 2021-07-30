let state = {};
let githubId = localStorage.getItem('githubContributionChecker');

const render = () => {
  document.querySelector('.app').innerHTML = `
    ${renderInput()}
    ${renderText()} `;
  githubCheck().then(() => {
    document.querySelector('.app').innerHTML = `
    ${renderInput()}
    ${renderText()} `;
  });
};

const githubCheck = async () => {
  await axios
    .get('https://29i6agp450.execute-api.ap-northeast-2.amazonaws.com/user', {
      params: {
        user: localStorage.getItem('githubContributionChecker'),
      },
    })
    .then((response) => {
      const today = new Date().toISOString().slice(0, 10);
      state = { count: response.data[today] };
    });
};
const renderText = () => {
  if (!githubId) {
    return `등록할 깃허브 아이디를 입력해주세요!`;
  } else if (!githubId || state.count === undefined) {
    return `데이터를 가져오고 있습니다!`;
  } else return `오늘은 ${state.count} 개의 contribution을 했어요! `;
};
// document.querySelector('.logout').addEventListener('click')

const renderInput = () => {
  if (githubId) {
    return `<div><input
        disabled
        class="id-input"
        type="text"
        value="${githubId} 님"
      /><button class="logout"> 로그아웃 </button> </div>`;
  } else {
    return `<div><input
      class="id-input"
      type="text"
      placeholder="Github 아이디"
    />
    <button class="login">입력</button>
    </div>`;
  }
};
render();
