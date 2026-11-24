document.addEventListener("DOMContentLoaded", () => {
  // ===== 1. DOM ELEMENTS =====
  const nameInput =
    document.getElementById("reviewerName") ||
    document.querySelector('input[type="text"]');
  const ratingSelect =
    document.getElementById("ratingSelect") ||
    document.querySelector("select");
  const experienceInput =
    document.getElementById("experienceText") ||
    document.querySelector("textarea");
  const submitBtn = Array.from(document.querySelectorAll("button")).find((b) =>
    b.textContent.toLowerCase().includes("submit review")
  );

  // Target ONLY the right-side reviews list container (never the parent 2-column grid)
  const reviewsListContainer =
    document.getElementById("reviewsList") ||
    document.getElementById("reviewsContainer") ||
    Array.from(document.querySelectorAll("div, section")).find(
      (el) =>
        el.textContent.includes("Nikhil") &&
        el.textContent.includes("Manas") &&
        !el.querySelector("input, textarea")
    );

  // ===== 2. DEFAULT REVIEWS DATA (ARRAY OF OBJECTS) =====
  const defaultReviews = [
    {
      name: "Nikhil",
      rating: 5,
      comment:
        "Goa trip was amazing! Everything managed by TourVista was seamless and hassle-free."
    },
    {
      name: "Manas",
      rating: 4,
      comment:
        "Great Trip planning for Manali. Hotel stays were very comfortable."
    }
  ];

  let reviewsData =
    JSON.parse(localStorage.getItem("tourvista_reviews")) || defaultReviews;

  // ===== 3. HELPER: GENERATE STAR STRING (e.g. ★★★★☆) =====
  function getStarsHTML(rating) {
    const count = Math.min(5, Math.max(1, Number(rating) || 5));
    return "★".repeat(count) + "☆".repeat(5 - count);
  }

  // ===== 4. RENDER ALL REVIEWS IN RIGHT PANEL =====
  function renderReviews() {
    if (!reviewsListContainer) return;

    reviewsListContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        ${reviewsData
          .map(
            (rev) => `
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 22px; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <strong style="font-size: 1.05rem; color: #0f172a;">${rev.name}</strong>
              <span style="color: #f59e0b; font-size: 1rem; letter-spacing: 1px;">${getStarsHTML(rev.rating)}</span>
            </div>
            <p style="margin: 0; font-size: 0.9rem; color: #475569; line-height: 1.5;">
              ${rev.comment || "Rated " + rev.rating + "/5 stars for a wonderful experience with TourVista!"}
            </p>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  // ===== 5. SUBMIT REVIEW HANDLER =====
  if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const reviewerName = nameInput?.value.trim();
      const rawRating = ratingSelect ? ratingSelect.value : "5";
      // Extract numeric rating whether option value is "5" or "(5/5)"
      const ratingMatch = String(rawRating).match(/[1-5]/);
      const rating = ratingMatch ? Number(ratingMatch[0]) : 5;
      const comment = experienceInput?.value.trim() || "";

      if (!reviewerName) {
        alert("Please enter Your Name before submitting a review!");
        nameInput?.focus();
        return;
      }

      const newReview = {
        name: reviewerName,
        rating,
        comment:
          comment ||
          `Had a great ${rating}-star travel experience with TourVista!`
      };

      // Add new review at the top of the right list
      reviewsData.unshift(newReview);
      localStorage.setItem("tourvista_reviews", JSON.stringify(reviewsData));

      renderReviews();

      // Clear form inputs after submission
      if (nameInput) nameInput.value = "";
      if (experienceInput) experienceInput.value = "";
      if (ratingSelect) ratingSelect.selectedIndex = 0;
    });
  }

  // Initial render on page load
  renderReviews();
});