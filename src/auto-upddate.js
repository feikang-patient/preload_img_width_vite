let lastHtmlContent;
async function extractNewHtml() {
    const html = await fetch('/?timnestamp=' + Date.now()).then((res) => {
        res.text();
    });
    return html;
}

async function needUpdate() {
    const newContent = await extractNewHtml();
    if (!lastHtmlContent) {
        lastHtmlContent = newContent;
        return false;
    }
    let result = false;
    alert(newContent);
    if (lastHtmlContent !== newContent) {
        result = true;
    }
    lastHtmlContent = newContent;
    return result;
}

const duration = 2000;
function autoRefresh() {
    setTimeout(async () => {
        const willUpdate = await needUpdate();
        if (willUpdate) {
            //更新页面的提示或者其他操作
            location.reload();
        }
        autoRefresh();
    }, duration);
}
autoRefresh();
