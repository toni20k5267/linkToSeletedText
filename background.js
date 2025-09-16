chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyTextFragment",
    title: "Copy link to selected text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!info.selectionText || !tab?.url || !tab?.id) return;

  const encoded = encodeTextFragment(info.selectionText.trim());
  const link = `${tab.url.split('#')[0]}#:~:text=${encoded}`;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (textToCopy) => {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    },
    args: [link]
  });
});

// shoulda used it in the beggining LOL cuz man previous method was dogshit
function encodeTextFragment(text) {
  return text
    .replace(/%/g, '%25')
    .replace(/-/g, '%2D')
    .replace(/\?/g, '%3F')
    .replace(/#/g, '%23')
    .replace(/&/g, '%26')
    .replace(/=/g, '%3D')
    .replace(/"/g, '%22')
    .replace(/\'/g, '%27')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/\[/g, '%5B')
    .replace(/]/g, '%5D')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/\|/g, '%7C')
    .replace(/\\/g, '%5C')
    .replace(/\^/g, '%5E')
    .replace(/`/g, '%60')
    .replace(/\n/g, '%0A')
    .replace(/\r/g, '%0D')
    .replace(/\t/g, '%09')
    .replace(/\s/g, '%20')
    .replace(/,/g, '%2C');
}



// yes i used ai to give me the characters themselves. judge me, judge me idc i aint gon be placing them all myself im too lazy lol

