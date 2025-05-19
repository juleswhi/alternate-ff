let previousTabId = null;
let currentTabId = null;

browser.commands.onCommand.addListener((command) => {
    browser.tabs.get(previousTabId)
        .then(() => {
            return browser.tabs.update(previousTabId, { active: true });
        })
        .catch(error => {
            console.error(error);
        });
});

browser.tabs.query({ active: true, currentWindow: true })
    .then(tabs => {
        if (tabs[0]) {
            currentTabId = tabs[0].id;
        }
    })
    .catch(error => console.error("Error getting initial tab:", error));

browser.tabs.onActivated.addListener(activeInfo => {
    previousTabId = currentTabId;
    currentTabId = activeInfo.tabId;
});
