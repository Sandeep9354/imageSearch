const search = document.querySelector('#search');
const search_btn = document.querySelector('#search-btn');
const img_container = document.querySelector('.img-container');

search_btn.addEventListener('click', async () => {
    const search_value = search.value.trim(); // Trim whitespace

    if (search_value === '') {
        alert('Please enter a search term');
        return;
    }

    const key = 'RuJTeKhXAyF9G-9VlCJJv1NlEMuCgGCDgIS-2Brjv3E';
    const url = `https://api.unsplash.com/search/photos?page=1&query=${search_value}&client_id=${key}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        displayImages(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

function displayImages(data) {
    img_container.innerHTML = '';

    data.results.forEach(element => {
        // Create image element
        const img = document.createElement('img');
        img.src = element.urls.regular;

        // Create download button
        const downloadBtn = document.createElement('button');
        downloadBtn.classList.add('download-btn');
        downloadBtn.style.backgroundImage = 'url("https://img.icons8.com/?size=100&id=14100&format=png&color=000000")'; // Replace with your icon URL

        downloadBtn.classList.add('download-btn');

        // Wrap image and button in a container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        // Append image and button to the container
        imageContainer.appendChild(img);
        imageContainer.appendChild(downloadBtn);

        // Append the container to the main image container
        img_container.appendChild(imageContainer);

        // Add click event listener to download button
        downloadBtn.addEventListener('click', () => {
            downloadImage(element.urls.regular);
            downloadBtn.style.backgroundColor="rgba(16,16,173,0.6)";
            downloadBtn.style.borderColor="rgba(16,16,173,0,6)";
            downloadBtn.style.color="#fff";
            downloadBtn.style.transition="all 0.3s";
        });
    });
}

async function downloadImage(url) {
    try {
        // Fetch image blob
        const response = await fetch(url);
        const blob = await response.blob();

        // Create an <a> element and trigger download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}
