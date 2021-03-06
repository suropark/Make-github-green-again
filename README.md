간단하게 크롤링을 연습해보기 위해서 깃헙 contribution을 확인하는 프로그램을 만들어보기로 하였다.

github.com/${닉네임} 이런식으로 가서 커밋 했는지 확인하기.

1일차 cheerio 사용해서 날짜 + contribution 수 추출하는 건 성공했다.
근데 이거 AWS lambda 사용해서 return 값으로 받아오고 싶은데 CORS 에러 때문에 막혀있는 상태.. 로컬만 문제네.. 저번에 이런 문제 해결했었는데 좀 뒤져봐야겠다.

크롬 익스텐션으로 만들어보고 싶기도 하다. 새 탭 열면 '오늘은 아무런 개발을 안했어요~! 이런식으로 떠서 까먹지 않고 꾸준히 개발할 수 있게;;'


---
2번째,

REST API로 API gateway사용하는 걸 http api로 바꾸고 이것 저것 설정했더니 CORS 이슈가 사라졌다.
cheerio랑 got 모듈 이용해서 데이터 크롤링하는 거 성공했고, .zip 파일로 만들어서 lambda에 올렸다. 라이브러리 사용가능해졌다.

프론트엔드.

처음에는 익스텐션으로 만들고 싶었는데, 그 전에 제대로 돌아가는지 확인하기 위해서 프론트엔드도 만들기로 했다. 익숙한 리액트를 사용할까 했는데 바닐라JS를 안 쓴지 오래되어서 바닐라 JS로 만들어 보기로 했다. 다음에는 타입 스크립트도 연습해봐야 할텐데..ㅇㅅ;


---
3번째,

익스텐션으로 만들고 있다.  깃헙 유저 아이디를 로컬 스토리지에 저장하지 않고 구글 익스텐션 api 사용해서 저장하고 테스트 하는거 성공했다. 
렌더링은 리액트에서 state에 따라서 계속 렌더링을 했던 것 처럼 만들어보고 싶어서 contribution 수를 state에 {count}로 넣고 데이터를 입력하기 전 후 state 값이 달라지게 했다. state 값이 변하면  렌더링 함수 `render()`를 다시 사용해서 업데이트 하도록 만들어 뒀다. 코드가 아직은 지저분하다.

### 입력하기 전 이미지
![입력하기 전](https://user-images.githubusercontent.com/52706443/128021657-2f527194-ec5f-46b2-90c6-406d09e2463a.png) 

### 데이터 가져오는 동안 렌더링
![로딩 이미지](https://user-images.githubusercontent.com/52706443/128021740-1182fed3-1825-4a13-b0c3-93ece920b2e6.png)

### 데이터 가져왔을 때 보여주는 이미지 
![데이터 가져온 이미지](https://user-images.githubusercontent.com/52706443/128021779-b1836f8b-0cdb-430b-919e-f2622c002362.png)

- 현재는 cheerio랑 got 패키지 사용한 aws lambda 쓰고 있는데, 이걸 프론트에서 바로 쓸 수는 없을까? 라는 생각이 든다. 굳이 람다 써야하나 싶어서.. 찾아봐야 할듯
- 생각을 너무 조금만 하고 바로 코드를 짜다 보니 짜면서 계속 로직이 엉키는 문제가 생긴다... 오늘부터 코딩 전에 공책에 함수의 순서도를 가볍게 그려보고 코딩하는데 훨씬 속도도 빠르고 효과적인 것 같다.
- 

---
4번째,

괜찮게 보였으면 해서 배달의 민족 웹 폰트 추가하고 스켈레톤 css가 가벼워서 넣어뒀다. css 라이브러리는 뭐 써야할 지 생각안해봤다.. 폰트만 바꿔도 이쁘다..! 깃헙 컨트리뷰션 데이터 크롤링해서 출력하는 것까지 마무리 했고 이제 링크 모음을 넣고 있다. 추가하는 컨텐츠들은 모두 나의 귀차니즘에 달려있다. 기본적인 홈페이지들은 url을 직접 쳐서 들어가는데 귀찮아서 링크로 대체하려고 한다.

### 진행 상황 ( 폰트 및 스켈레톤 css 라이브러리 적용 + 링크 모음 추가)
![image](https://user-images.githubusercontent.com/52706443/128352869-19e13052-b186-4e36-9772-308631f8814a.png)

확실히 보기 좋아졌다. 링크 모음은 어떻게 코딩해야할 지 생각하고 적어보고 행동했다..!
지금 두 가지 방법을 생각하고 있는데 일단은 첫 번째 방법으로 만들고 있다. 첫번째는 다음과 같다.

1. 크롬 스토리지에 저장된 링크 데이터가 있는지 확인한다.
2. 없다면 제작자가 지정해 둔 기본 링크 모음을 출력한다.
3. 있다면 유저가 직접 저장한 링크 모음만 출력한다. 
- 링크 저장은 `chrome.storage.sync.set({link: []}, () => renderLinkBox())` 를 사용해서 하고 콜백으로 리렌더링을 실행한다.

두번째는 탭으로 메뉴를 구성하여 두 가지 모두를 보여주는 방식이다.

1번 탭에는 **기본 링크** 2번 탭에는 **커스텀 링크** 로 해서 두 개 모두 보여주는 방식이다.

일단은 첫 번째 방식으로 만들어서 사용해보고 불편함이 있으면 두 번째 방식으로 변경할 예정이다.


---
5번째

유저가 링크를 직접 추가하고 삭제할 수 있는 기능을 추가했다. 

### 추가 기능

```
document
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
            } 
```
추가 버튼을 누르면 버튼이 input 2개와 제출 버튼으로 변하고 링크 추가는 구조 분해 할당 문법을 활용했다.

### 삭제 기능

```
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

```

원래 생각한 링크 객체는 `{name: '이름', url: '주소', img: '이미지 url?'}` 이었는데, 삭제 기능을 구현하려고 하다보니 객체에 index를 추가 했다. index를 직접 추가하는 방법 말고 다른 방법도 있기는 할 것 같은데 일단 이렇게 했다. index 값을 삭제 버튼의 id로 주고 배열 메소드 filter 문법을 활용했다.

---
6번째

더이상 추가할 기능이 마땅히 생각나지 않았는데,투두 리스트를 넣으면 좋을 것 같았다. 요새 가장 많이 보는 화면이 새로운 탭 화면이니까 이 화면에 투두 체크 리스트를 넣으면 효과적으로 사용할 수 있다고 생각이 들었다.

`renderTodoBox.js` 파일에다 작성했다. `renderLinkBox.js`의 코드와 거의 비슷하게 짤 수 있어서 편했다. 나중에 리팩토링할 때 이런 부분을 중심으로 해봐도 좋을 것 같다. 재사용하는 코드에서 달라진 점이 있다면 이번에는 삭제기능을 넣지 않고 checkbox에 체크했을 때 삭제하도록 했다. 

- + 추가하기 버튼을 눌렀을 때 focus가 입력창으로 가도록 수정했다.
- 커밋하고 생각난 건데 추가하기를 누른 후 뒤로가기( 추가하기를 취소하는 버튼)이 없다. 그래서 입력창을 없애려면 새로고침을 해야한다. 다음 커밋에 이 문제를 해결해야겠다.

### 진행 상황

![깃허브 푸르게 푸르게 - Chrome 2021-08-07 20-59-20](https://user-images.githubusercontent.com/52706443/128599468-df7633a3-d224-49b5-af69-567933d2e792.gif)
