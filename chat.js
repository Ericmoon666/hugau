function showSection(sectionId) {
    document.querySelectorAll('.content').forEach(function(section) {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

function loadArticle(articleUrl) {
    fetch(articleUrl)
        .then(response => response.text())
        .then(data => {
            document.getElementById('article').innerHTML = data;
            showSection('article');
        })
        .catch(error => console.error('Error loading article:', error));
}

const siteContent = {
    home: '歡迎來到我的個人網站！',
    about: '這裡是洪寅智的隨筆紀錄網站。想到什麼就會更新什麼。',
    blog: '部落格文章列表：5月15拍片去、我的第二篇文章、Reaper模板。',
    contact: '聯絡方式：請使用下方表單聯絡我。'
};

function getSiteContent(section) {
    return siteContent[section] || '未知內容';
}

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    const userMessage = document.createElement('div');
    userMessage.textContent = '你: ' + userInput;
    chatBox.appendChild(userMessage);

    const sectionContent = getSiteContent('home'); // 根據需要動態調用不同部分的內容

    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sk-proj-dreYAMSyu8PE9bw5u04gT3BlbkFJKn8ViuSXdb6pXM2Pu40v`
        },
        body: JSON.stringify({
            prompt: `網站內容：${sectionContent}。 使用者問題：${userInput}。 AI助手的回答：`,
            max_tokens: 150
        })
    });

    const data = await response.json();
    const aiMessage = document.createElement('div');
    aiMessage.textContent = '阿智助手: ' + data.choices[0].text.trim();
    chatBox.appendChild(aiMessage);

    document.getElementById('user-input').value = '';
}
