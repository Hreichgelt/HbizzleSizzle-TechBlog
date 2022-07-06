async function deleteF(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/post/${id}', {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        AudioListener(response.statusText)
    }
}

$('.delete-post-btn').addEventListener('click', deleteF);