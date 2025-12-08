// Fetch GitHub star counts for elements with `data-github-repo="owner/repo"` and render
// a badge that matches the semantic-scholar badge style used elsewhere.
// No caching is performed — this queries the public GitHub API directly.

const githubStarElements = document.querySelectorAll('[data-github-repo]');
if (githubStarElements && githubStarElements.length) {
    const repos = new Set(Array.from(githubStarElements).map(el => el.getAttribute('data-github-repo')).filter(Boolean));

    repos.forEach(repo => {
        // Normalise repo string (trim)
        const repoId = repo.trim();
        const apiUrl = `https://api.github.com/repos/${repoId}`;

        fetch(apiUrl, { method: 'GET' })
            .then(response => {
                if (!response.ok) throw new Error(`GitHub API responded ${response.status}`);
                return response.json();
            })
            .then(data => {
                const stars = data && data.stargazers_count ? data.stargazers_count : 0;
                const nodes = document.querySelectorAll(`[data-github-repo="${repoId}"]`);
                nodes.forEach(node => {
                    node.innerHTML = `<a class="badge badge-pill badge-publication badge-info" href="https://github.com/${repoId}" target="_blank" rel="noopener"><i class="fab fa-github"></i> ${parseInt(stars).toLocaleString()} stars</a>`;
                });
            })
            .catch(err => {
                console.error('Error fetching GitHub repo data for', repoId, err);
                // Fallback: show link without count
                const nodes = document.querySelectorAll(`[data-github-repo="${repoId}"]`);
                nodes.forEach(node => {
                    node.innerHTML = `<a class="badge badge-pill badge-publication badge-info" href="https://github.com/${repoId}" target="_blank" rel="noopener"><i class="fab fa-github"></i> View on GitHub</a>`;
                });
            });
    });
}
