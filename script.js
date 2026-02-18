/*
  ⚠️ IMPORTANT:
  1. Get FREE API key from: https://www.omdbapi.com/apikey.aspx
  2. Activate key from email
  3. Replace below value with your key
*/

const API_KEY = "REPLACE_WITH_YOUR_REAL_KEY";

async function searchMovies() {
  const query = document.getElementById('search').value.trim();
  const moviesContainer = document.getElementById('movies');
  const error = document.getElementById('error');
  const loading = document.getElementById('loading');

  if (!query) return;

  moviesContainer.innerHTML = "";
  error.style.display = 'none';
  loading.style.display = 'block';

  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    const data = await res.json();

    loading.style.display = 'none';

    if (data.Response === "False") {
      error.style.display = 'block';
      return;
    }

    data.Search.forEach(movie => {
      const div = document.createElement('div');
      div.className = 'movie';

      const poster = movie.Poster !== 'N/A'
        ? movie.Poster
        : 'https://via.placeholder.com/300x450?text=No+Image';

      div.innerHTML = `
        <img src="${poster}" alt="${movie.Title}" />
        <div class="movie-info">
          <h3>${movie.Title}</h3>
          <p>Year: ${movie.Year}</p>
        </div>
      `;

      moviesContainer.appendChild(div);
    });
  } catch (e) {
    loading.style.display = 'none';
    error.style.display = 'block';
  }
}

document.getElementById('search').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') searchMovies();
});
