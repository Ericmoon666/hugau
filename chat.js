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

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
