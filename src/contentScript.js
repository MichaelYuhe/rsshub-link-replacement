const personalLinkStorage = {
  get: (cb) => {
    chrome.storage.sync.get(['link'], (result) => {
      cb(result.link);
    });
  },
}

const examples = document.getElementsByClassName('example');

personalLinkStorage.get((link) => {
  if (link) {
    for (const example of examples) {
      const children = example.children;
      for (let i = 1; i <= children.length; i++) {
        const child = children[i];
        if (child) {
          child.innerHTML = child.innerHTML.replace('rsshub.app', link);
        }
      }
    }
  }
});
