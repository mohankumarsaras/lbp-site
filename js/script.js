// script.js

// Function to fetch and display hero section content
async function loadHeroContent() {
    const response = await fetch('news/hero.json'); // Assume hero content is stored in hero.json
    const heroData = await response.json();
    
    document.getElementById('scrolling-title').innerText = heroData.title;
    document.getElementById('hero-description').innerText = heroData.description;
    document.getElementById('hero-link').href = heroData.link;
}

// Function to fetch and display latest news
async function loadLatestNews() {
    const latestNewsContainer = document.getElementById('latest-news-container');
    
    const newsFiles = ['article1.txt', 'article2.txt', 'article3.txt']; // List of latest news files
    for (const file of newsFiles) {
        const response = await fetch(`news/latest/${file}`);
        const content = await response.text();
        
        const newsCard = document.createElement('div');
        newsCard.className = 'bg-white shadow-lg rounded-lg overflow-hidden transition-all transform hover:-translate-y-2 hover:shadow-2xl';
        newsCard.innerHTML = `
            <img src="images/news_placeholder.jpg" alt="News Image" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-semibold">${content.split('\n')[0]}</h3> <!-- First line as title -->
                <p class="text-gray-600 mt-4">${content.split('\n').slice(1, 2).join('\n')}</p> <!-- Second line as description -->
                <a href="news/latest/${file}" class="mt-4 inline-block text-blue-500 font-bold">Read More</a>
            </div>
        `;
        latestNewsContainer.appendChild(newsCard);
    }
}

// Function to fetch and display old news
async function loadOldNews() {
    const oldNewsContainer = document.getElementById('old-news-container');
    
    const oldNewsFiles = ['old_article1.txt', 'old_article2.txt']; // List of old news files
    for (const file of oldNewsFiles) {
        const response = await fetch(`news/old/${file}`);
        const content = await response.text();
        
        const newsItem = document.createElement('div');
        newsItem.className = 'p-4 border-b';
        newsItem.innerHTML = `
            <h4 class="font-semibold">${content.split('\n')[0]}</h4> <!-- First line as title -->
            <p>${content.split('\n').slice(1).join('\n')}</p> <!-- Remaining lines as content -->
            <a href="news/old/${file}" class="text-blue-500">Read More</a>
        `;
        oldNewsContainer.appendChild(newsItem);
    }
}

// Load all content on page load
window.onload = async () => {
    await loadHeroContent();
    await loadLatestNews();
    await loadOldNews();
};
