const newBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('#blog-body').value.trim();

    if (title && description) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/profile');
        }
        else if (response.status === 403) {
            document.location = '/login';
        }
        else {
            alert('Failed to create blog');
        }
    }
};

const deleteButtonHandler = async (event) => {

    if (event.target.classList.contains('delete-btn')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/profile');
        }
        else if (response.status === 403) {
            document.location = '/login';
        }
        else {
            alert('Failed to delete blog');
        }
    }
};

const editButtonHandler = async (event) => {

    if (event.target.classList.contains('edit-btn')) {
        const id = event.target.getAttribute('data-id');

        const blogTitleElement = document.querySelector(`[data-id="${id}"].blog-title`);
        const blogBodyElement = document.querySelector(`[data-id="${id}"].blog-body`);

        if (blogTitleElement && blogBodyElement) {
            const blogTitle = blogTitleElement.textContent;
            const blogBody = blogBodyElement.textContent;

            console.log(blogBody, blogTitle);

            // Replace the blog entry with a form for editing
            const blogEntry = document.querySelector(`[data-id="${id}"].editBlog`);
            blogEntry.innerHTML = `
              <form class="form edit-blog-form">
                <div class="form-group py-2">
                  <label for="edit-blog-title" class="col-sm-2 col-form-label">Title:</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="text" id="edit-blog-title" name="edit-blog-title" value="${blogTitle}" />
                  </div>
                </div>
                <div class="form-group py-2">
                  <label for="edit-blog-body" class="col-sm-2 col-form-label">Body:</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" id="edit-blog-body" name="edit-blog-body">${blogBody}</textarea>
                  </div>
                </div>
                <div class="form-group d-flex">
                  <button type="submit" class="btn btn-primary my-3">Update Blog</button>
                </div>
              </form>
            `;

            const editBlogForm = blogEntry.querySelector('.edit-blog-form');
            editBlogForm.addEventListener('submit', async (event) => {
                event.preventDefault();

                const updatedTitle = document.querySelector('#edit-blog-title').value.trim();
                const updatedBody = document.querySelector('#edit-blog-body').value.trim();

                if (updatedTitle && updatedBody) {
                    const response = await fetch(`/api/blogs/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ title: updatedTitle, description: updatedBody }),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (response.ok) {
                        document.location.replace('/profile');
                    }
                    else if (response.status === 403) {
                        document.location = '/login';
                    }
                    else {
                        alert('Failed to update blog');
                    }
                }
            });
        }
        else {
            console.error(`Could not find blog title or body element for blog with ID ${id}`);
        }
    }
};


document.querySelector('.new-blog-form').addEventListener('submit', newBlogHandler);
document.querySelector('.blog-list').addEventListener('click', deleteButtonHandler);
document.querySelector('.blog-list').addEventListener('click', editButtonHandler);