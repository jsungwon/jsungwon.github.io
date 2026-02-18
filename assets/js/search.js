(function () {
  'use strict';

  var overlay = document.getElementById('searchOverlay');
  var input = document.getElementById('searchInput');
  var resultsContainer = document.getElementById('searchResults');
  var toggleBtn = document.querySelector('.search-toggle');
  var posts = null;

  var categoryLabels = {
    research: 'Research',
    tech: 'Tech',
    trip: 'Trip',
    food: 'Food'
  };

  function loadSearchData() {
    if (posts !== null) return Promise.resolve(posts);
    return fetch('/search.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        posts = data;
        return posts;
      });
  }

  function openSearch() {
    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    input.value = '';
    renderEmpty();
    setTimeout(function () { input.focus(); }, 100);
    loadSearchData();
  }

  function closeSearch() {
    overlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function renderEmpty() {
    resultsContainer.innerHTML =
      '<div class="search-empty">' +
      '<p class="search-empty__text">제목 또는 태그로 검색하세요</p>' +
      '</div>';
  }

  function renderNoResults(query) {
    resultsContainer.innerHTML =
      '<div class="search-empty">' +
      '<p class="search-empty__text">"' + escapeHtml(query) + '"에 대한 검색 결과가 없습니다</p>' +
      '</div>';
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var regex = new RegExp('(' + escaped + ')', 'gi');
    return escapeHtml(text).replace(regex, '<mark>$1</mark>');
  }

  function searchPosts(query) {
    if (!posts) return [];
    var q = query.toLowerCase().trim();
    if (!q) return [];

    var results = [];
    for (var i = 0; i < posts.length; i++) {
      var post = posts[i];
      var titleMatch = post.title.toLowerCase().indexOf(q) !== -1;
      var tagMatch = false;
      var matchedTags = [];

      if (post.tags) {
        for (var j = 0; j < post.tags.length; j++) {
          if (post.tags[j].toLowerCase().indexOf(q) !== -1) {
            tagMatch = true;
            matchedTags.push(post.tags[j]);
          }
        }
      }

      if (titleMatch || tagMatch) {
        results.push({
          post: post,
          titleMatch: titleMatch,
          tagMatch: tagMatch,
          matchedTags: matchedTags
        });
      }
    }

    // Title matches first, then tag-only matches
    results.sort(function (a, b) {
      if (a.titleMatch && !b.titleMatch) return -1;
      if (!a.titleMatch && b.titleMatch) return 1;
      return 0;
    });

    return results;
  }

  function renderResults(results, query) {
    var html = '<ul class="search-results">';
    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      var post = r.post;
      var categoryClass = post.category || '';
      var categoryLabel = categoryLabels[categoryClass] || categoryClass;

      html += '<li class="search-result">';
      html += '<a href="' + escapeHtml(post.url) + '" class="search-result__link">';
      html += '<div class="search-result__meta">';
      html += '<span class="search-result__category search-result__category--' + escapeHtml(categoryClass) + '">' + escapeHtml(categoryLabel) + '</span>';
      html += '<span class="search-result__date">' + escapeHtml(post.date) + '</span>';
      html += '</div>';
      html += '<h3 class="search-result__title">' + highlightMatch(post.title, query) + '</h3>';
      if (post.subtitle) {
        html += '<p class="search-result__subtitle">' + escapeHtml(post.subtitle) + '</p>';
      }
      if (post.tags && post.tags.length > 0) {
        html += '<div class="search-result__tags">';
        for (var j = 0; j < post.tags.length; j++) {
          var isMatched = r.matchedTags.indexOf(post.tags[j]) !== -1;
          html += '<span class="tag tag--sm' + (isMatched ? ' tag--highlight' : '') + '">' + highlightMatch(post.tags[j], isMatched ? query : '') + '</span>';
        }
        html += '</div>';
      }
      html += '</a>';
      html += '</li>';
    }
    html += '</ul>';
    resultsContainer.innerHTML = html;
  }

  function handleInput() {
    var query = input.value.trim();
    if (!query) {
      renderEmpty();
      return;
    }
    if (!posts) {
      loadSearchData().then(function () { handleInput(); });
      return;
    }
    var results = searchPosts(query);
    if (results.length === 0) {
      renderNoResults(query);
    } else {
      renderResults(results, query);
    }
  }

  // Event listeners
  toggleBtn.addEventListener('click', openSearch);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', function (e) {
    // Cmd/Ctrl + K to open search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('is-active')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    // ESC to close
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeSearch();
    }
  });

  var debounceTimer;
  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(handleInput, 150);
  });
})();
