document.addEventListener('DOMContentLoaded', () => {
    const videosContainer = document.getElementById('videos-container');
    const channelId = 'UC8LnsrjE5iOpG_wMs8S2geQ'; // ID kanału YouTube
    const apiKey = 'AIzaSyC9o3qmPqi-oFZude8rXwZh2x1-f_D4ims'; // Twój API Key

    // Fetch the latest videos from the YouTube channel
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=6`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const videos = data.items;

            // Clear the container
            videosContainer.innerHTML = '';

            // Check if videos are available
            if (videos.length > 0) {
                // Loop through the videos and create HTML elements
                videos.forEach(video => {
                    const videoElement = document.createElement('div');
                    videoElement.className = 'video';

                    const videoTitle = document.createElement('div');
                    videoTitle.className = 'video-title';
                    videoTitle.textContent = video.snippet.title;

                    const videoIframe = document.createElement('iframe');
                    videoIframe.src = `https://www.youtube.com/embed/${video.id.videoId}`;
                    videoIframe.frameBorder = '0';
                    videoIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                    videoIframe.allowFullscreen = true;


                    videoElement.appendChild(videoIframe);
                    videoElement.appendChild(videoTitle);
                    videosContainer.appendChild(videoElement);
                });
            } else {
                videosContainer.textContent = 'No videos available.';
            }
        })
        .catch(error => {
            videosContainer.textContent = 'Error loading videos.';
            console.error('Error fetching the JSON data:', error);
        });
});
