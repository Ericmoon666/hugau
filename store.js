document.addEventListener('DOMContentLoaded', loadComments);

function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
        addCommentToList(comment.name, comment.text);
    });
}

function addComment() {
    const name = document.getElementById('comment-name').value;
    const text = document.getElementById('comment-text').value;

    if (name && text) {
        const comment = { name, text };
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));

        addCommentToList(name, text);

        // 清空輸入框
        document.getElementById('comment-name').value = '';
        document.getElementById('comment-text').value = '';
    } else {
        alert('請填寫所有欄位');
    }
}

function addCommentToList(name, text) {
    const commentList = document.getElementById('comment-list');
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.innerHTML = `<p><strong>${name}</strong></p><p>${text}</p>`;
    commentList.appendChild(newComment);
}
