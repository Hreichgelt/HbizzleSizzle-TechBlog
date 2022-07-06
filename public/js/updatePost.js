async function update(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = $('input[name="post-title"]').value;
    const post_text = $('textarea[name="post-text"]').value;

    const response = await fetch('/api/post/${id}', {
        method: 'PUT',
        body: JSON.stringify({
            title, 
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

$('.update-post-form').addEventListener('submit', update);