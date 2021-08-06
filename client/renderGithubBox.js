let state = {};

const fetchGithubStatus = async (userId) => {
  await fetch(
    `https://29i6agp450.execute-api.ap-northeast-2.amazonaws.com/user?user=${userId}`,
  )
    .then((response) => response.json())
    .then((data) => {
      const today = new Date().toISOString().slice(0, 10);
      state = { ...state, count: data[today] };
    });
};
const renderGithubBox = () => {
  chrome.storage.sync.get('githubId', function ({ githubId }) {
    if (!githubId) {
      document.querySelector('.github-box').innerHTML = `
      <img id="github-img1" src='./img/GitHub-Mark-32px.png'/>
      등록할 깃허브 아이디를 입력해주세요!
      <div>
      <input
      class="id-input"
      type="text"
      placeholder="Github 아이디"
      />
      <button class="login-btn"> 입력 </button>
      </div>
     `;

      document.querySelector('.login-btn').addEventListener('click', (e) => {
        e.preventDefault();
        if (!document.querySelector('.id-input').value) {
          return alert('입력값이 존재하지 않습니다.');
        }
        chrome.storage.sync.set(
          {
            githubId: document.querySelector('.id-input').value,
          },
          () => renderGithubBox(),
        );
      });
    } else {
      document.querySelector('.github-box').innerHTML = `
      <img id="github-img1" src='./img/GitHub-Mark-32px.png'/>
      데이터를 가져오고 있습니다!
      <div>
      <input
      disabled
      class="id-input"
      type="text"
      value="${githubId} 님"
      /><button class="logout-btn" disabled> 로그아웃 </button> 
      </div>
       `;
      document
        .querySelector('.logout-btn')
        .addEventListener('click', (e) =>
          chrome.storage.sync.remove('githubId', () => renderGithubBox()),
        );

      fetchGithubStatus(githubId).then(() => {
        document.querySelector('.github-box').innerHTML = `
        <img id="github-img1" src='./img/GitHub-Mark-32px.png'/>
        오늘은 ${state.count} 개의 contribution을 했어요! 
        <div>
        <input
        disabled
        class="id-input"
        type="text"
        value="${githubId} 님"
        /><button class="logout-btn"> 로그아웃 </button>
        </div>
        `;
        document
          .querySelector('.logout-btn')
          .addEventListener('click', (e) =>
            chrome.storage.sync.remove('githubId', () => renderGithubBox()),
          );
      });
    }
  });
};
renderGithubBox();
