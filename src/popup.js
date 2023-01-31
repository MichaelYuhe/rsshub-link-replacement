import './popup.css';

(function () {
  const saveButton = document.getElementById('save');

  saveButton.addEventListener('click', () => {
    setPersonalLink(document.getElementById('personal-link-input').value);
  })

  const personalLinkStorage = {
    get: (cb) => {
      chrome.storage.sync.get(['link'], (result) => {
        cb(result.link);
      });
    },
    set: (value, cb) => {
      chrome.storage.sync.set(
        {
          link: value,
        },
        () => {
          cb();
        }
      );
    },
  }

  const restorePersonalLink = () => {
    personalLinkStorage.get((link) => {
      if (!link) {
        personalLinkStorage.set(0, () => {
          setPersonalLink('');
        });
      } else {
        setPersonalLink(link);
      }
    });
  }

  const setPersonalLink = (value = '') => {
    document.getElementById('personal-link-input').value = value;
    updatePersonalLink(value);
  }

  const updatePersonalLink = (newLink) => {
    personalLinkStorage.set(newLink, () => {
      document.getElementById('personal-link-input').value = newLink;
    });
  }

  document.addEventListener('DOMContentLoaded', restorePersonalLink);
})();
