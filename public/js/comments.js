const commentHandler = async (event) => {
    event.preventDefault();

    const comment_description = document.querySelector('#comment-description').value.trim();
    const blog_id = document.querySelector('.new-comment-form').dataset.blogid;

    if (comment_description) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ blog_id, comment_description }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.reload();
        }
        else if (response.status === 403) {
            document.location = '/login'
        }
        else {
            alert(response.statusText);
        }
    }
};

const deleteCommentHandler = async (event) => {
    event.preventDefault();
    if (event.target.classList.contains('delete-comment')) {
        const commentId = event.target.getAttribute('data-id');

        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        }
        else if (response.status === 403) {
            document.location = '/login'
        }
        else {
            alert(response.statusText);
        }
    }
};


document.querySelector('.new-comment-form').addEventListener('submit', commentHandler);
document.querySelector('.comments').addEventListener('click', deleteCommentHandler);