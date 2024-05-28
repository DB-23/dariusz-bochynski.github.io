document.addEventListener('DOMContentLoaded', () => {
    const articleContainer = document.getElementById('article-container');

    // Fetch the JSON file
    fetch('articles.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const articles = data.articles;

            // Clear the container
            articleContainer.innerHTML = '';

            // Check if articles are available
            if (articles.length > 0) {
                // Loop through the articles and create HTML elements
                articles.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.className = 'article';

                    const articleTitle = document.createElement('div');
                    articleTitle.className = 'article-title';
                    articleTitle.textContent = article.title;

                    const articleContent = document.createElement('div');
                    articleContent.className = 'article-content';
                    articleContent.textContent = article.content;

                    const articleLink = document.createElement('a');
                    articleLink.href = article.url;
                    articleLink.className = 'article-link';
                    articleLink.textContent = 'Read more';
                    articleLink.target = '_blank';

                    articleElement.appendChild(articleTitle);
                    articleElement.appendChild(articleContent);
                    articleElement.appendChild(articleLink);
                    articleContainer.appendChild(articleElement);
                });
            } else {
                articleContainer.textContent = 'No articles available.';
            }
        })
        .catch(error => {
            articleContainer.textContent = 'Error loading articles.';
            console.error('Error fetching the JSON file:', error);
        });
});
