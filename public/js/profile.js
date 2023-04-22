const newBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('#blog-body').value.trim();

    if (title && description) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, description}),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/profile');
        }
        else {
            alert('Failed to create blog');
        }
    }
};

const deleteButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/profile');
        }
        else {
            alert('Failed to delete blog');
        }
    }
}

document.querySelector('.new-blog-form').addEventListener('submit', newBlogHandler);
document.querySelector('.blog-list').addEventListener('click', deleteButtonHandler);