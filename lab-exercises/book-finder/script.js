// ==============================================================
// Pondicherry University - MCA Lab Exercise 10
// jQuery $.ajax Book Data Fetcher
// ==============================================================

$(document).ready(function() {
    // Reference books dataset (used as fallback and offline demo)
    const SAMPLE_BOOKS = [
        {
            id: 1,
            title: "Clean Code: A Handbook of Agile Software Craftsmanship",
            author: "Robert C. Martin",
            first_publish_year: 2008,
            subject: "Software Engineering",
            cover_id: null
        },
        {
            id: 2,
            title: "JavaScript: The Definitive Guide (Master the World's Most-Used Language)",
            author: "David Flanagan",
            first_publish_year: 2020,
            subject: "Web Technologies",
            cover_id: null
        },
        {
            id: 3,
            title: "Introduction to Algorithms (CLRS)",
            author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
            first_publish_year: 2009,
            subject: "Data Structures & Algorithms",
            cover_id: null
        },
        {
            id: 4,
            title: "Designing Data-Intensive Applications",
            author: "Martin Kleppmann",
            first_publish_year: 2017,
            subject: "Distributed Systems & Databases",
            cover_id: null
        },
        {
            id: 5,
            title: "You Don't Know JS Yet: Get Started",
            author: "Kyle Simpson",
            first_publish_year: 2020,
            subject: "JavaScript Programming",
            cover_id: null
        },
        {
            id: 6,
            title: "Artificial Intelligence: A Modern Approach",
            author: "Stuart Russell and Peter Norvig",
            first_publish_year: 2021,
            subject: "Artificial Intelligence",
            cover_id: null
        }
    ];

    // Topic quick pills
    $(".genre-btn").on("click", function() {
        $(".genre-btn").removeClass("active");
        $(this).addClass("active");
        const query = $(this).attr("data-query");
        $("#bookSearchInput").val(query);
        loadBooks();
    });

    // Form submit on Enter
    $("#bookSearchForm").on("submit", function(e) {
        e.preventDefault();
        loadBooks();
    });

    // Primary action: "Load Books" button click
    $("#loadBooksBtn").on("click", function() {
        loadBooks();
    });

    function loadBooks() {
        const query = $("#bookSearchInput").val().trim() || "computer science";
        const endpoint = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

        // UI Loading State
        $("#emptyBox").addClass("hidden");
        $("#booksGrid").addClass("hidden").empty();
        $("#loaderBox").removeClass("hidden");
        $("#bookCountBadge").text("Loading books...");

        // Live jQuery AJAX GET Request using $.ajax
        $.ajax({
            url: endpoint,
            type: "GET",
            dataType: "json",
            timeout: 10000,
            success: function(response) {
                $("#loaderBox").addClass("hidden");

                // Parse Open Library JSON response
                if (response && response.docs && response.docs.length > 0) {
                    const books = response.docs.slice(0, 15).map(function(item) {
                        return {
                            id: item.key,
                            title: item.title || "Untitled",
                            author: item.author_name ? item.author_name.join(", ") : "Unknown Author",
                            first_publish_year: item.first_publish_year || "N/A",
                            cover_id: item.cover_i || null,
                            subject: item.subject ? item.subject[0] : query
                        };
                    });

                    renderBooks(books, query);
                } else {
                    // Fallback to sample books matching query
                    renderFallback(query);
                }
            },
            error: function(xhr, status, error) {
                console.warn("Live API request failed or timed out. Falling back to sample books.", status, error);
                renderFallback(query);
            }
        });
    }

    function renderFallback(query) {
        $("#loaderBox").addClass("hidden");
        const filtered = SAMPLE_BOOKS.filter(b => 
            b.title.toLowerCase().includes(query.toLowerCase()) ||
            b.author.toLowerCase().includes(query.toLowerCase()) ||
            b.subject.toLowerCase().includes(query.toLowerCase())
        );

        const listToRender = filtered.length > 0 ? filtered : SAMPLE_BOOKS;
        renderBooks(listToRender, query);
    }

    // Function to dynamically render books parsed from JSON
    function renderBooks(booksList, searchQuery) {
        $("#loaderBox").addClass("hidden");
        $("#booksGrid").removeClass("hidden").empty();

        $("#bookCountBadge").text(`${booksList.length} Books for "${searchQuery}"`);

        booksList.forEach(function(book) {
            const coverHtml = book.cover_id
                ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg" alt="${escapeHtml(book.title)} Cover" onerror="this.onerror=null;this.parentElement.innerHTML='<i class=\\'fas fa-book\\'></i>'"/>`
                : `<i class="fas fa-book"></i>`;

            const cardHtml = `
                <div class="book-card">
                    <div>
                        <div class="book-top">
                            <div class="book-cover">
                                ${coverHtml}
                            </div>
                            <div class="book-meta">
                                <h4 class="book-title" title="${escapeHtml(book.title)}">${escapeHtml(book.title)}</h4>
                                <div class="book-author"><i class="fas fa-user-edit"></i> ${escapeHtml(book.author)}</div>
                                <div class="book-year"><i class="far fa-calendar-alt"></i> Published: ${escapeHtml(String(book.first_publish_year))}</div>
                            </div>
                        </div>
                    </div>
                    <div class="book-footer">
                        <span class="badge-pill">${escapeHtml(book.subject || 'Reference')}</span>
                        <span><i class="fas fa-check-circle" style="color: #34d399;"></i> Parsed</span>
                    </div>
                </div>
            `;

            $("#booksGrid").append(cardHtml);
        });
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Modal Handlers
    $("#viewCodeModalBtn").on("click", function() {
        $("#codeModal").removeClass("hidden");
    });

    $("#closeCodeModalBtn").on("click", function() {
        $("#codeModal").addClass("hidden");
    });

    $("#codeModal").on("click", function(e) {
        if ($(e.target).is("#codeModal")) {
            $("#codeModal").addClass("hidden");
        }
    });

    // Initial load on page start
    loadBooks();
});
