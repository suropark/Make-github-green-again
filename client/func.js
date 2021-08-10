function delEventToElement(className, event, storageKey, renderFunction) {
  let elementList = document.querySelectorAll(className);
  for (let index = 0; index < elementList.length; index++) {
    const element = elementList[index];
    element.addEventListener(event, (e) => {
      chrome.storage.sync.get(storageKey, (list) => {
        chrome.storage.sync.set(
          {
            [storageKey]: list[storageKey].filter(
              (item) => item.index !== +e.target.id,
            ),
          },
          () => renderFunction(),
        );
      });
    });
  }
}
function renderList(className, array, returnNodeFunc, btnRenderFunc) {
  document.querySelector(className).innerHTML = `
      ${array
        .map((item) => {
          return returnNodeFunc(item);
        })
        .join('')}
     ${btnRenderFunc()}
        `;
}
