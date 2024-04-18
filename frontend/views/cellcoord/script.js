document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const message = await response.text();
            document.getElementById('message').textContent = 'Upload successful: ' + message;
        } else {
            throw new Error('Failed to upload file');
        }
    } catch (error) {
        console.error(error);
        document.getElementById('message').textContent = 'Error: ' + error.message;
    }
});
