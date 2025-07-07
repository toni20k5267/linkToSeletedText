chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyTextFragment",
    title: "Copy link to selected text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!info.selectionText || !tab?.url || !tab?.id) return;

  const encoded = encodeURIComponent(info.selectionText.trim());
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
