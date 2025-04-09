AOS.init({
    duration: 1000,     // animasyon süresi
    once: false,        // animasyonun tekrar oynaması için
    offset: 120,        // ekranın altından ne kadar önce başlayacağı
    delay: 0,           // animasyonun başlama gecikmesi
    easing: 'ease',     // animasyon geçiş tipi
    mirror: false       // scroll yukarı çıkınca tekrar oynaması
});

// Hero image için özel animasyon
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-img');
    if (heroImage) {
        heroImage.style.animation = 'float 3s ease-in-out infinite';
    }
});

const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
});




document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('./api/foods.json');
    if (!response.ok) throw new Error(`HTTP Hatası: ${response.status}`);
    const data = await response.json();

    const categories = data.menu.categories;

    renderMenuByCategory(categories, "Starters", "menu-starters");
    renderMenuByCategory(categories, "Breakfast", "menu-breakfast");
    renderMenuByCategory(categories, "Lunch", "menu-lunch");
    renderMenuByCategory(categories, "Dinner", "menu-dinner");

  } catch (error) {
    console.error("Veri çekme hatası:", error);
  }
});

function renderMenuByCategory(categories, categoryName, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  // İlgili kategori içindeki ürünleri bul
  const category = categories.find(cat => cat.name === categoryName);
  if (!category || !category.items) return;

  const items = category.items;

  // 3'erli row oluşturma
  for (let i = 0; i < items.length; i += 3) {
    const row = document.createElement("div");
    row.className = "row gy-4";

    for (let j = i; j < i + 3 && j < items.length; j++) {
      const item = items[j];

      const col = document.createElement("div");
      col.className = "col-lg-4 menu-item";

      col.innerHTML = `
        <img src="${item.image}" class="menu-img img-fluid" alt="${item.name}">
        <h4>${item.name}</h4>
        <p class="ingredients">${item.description}</p>
        <p class="price">$${item.price.toFixed(2)}</p>
      `;

      row.appendChild(col);
    }

    container.appendChild(row);
  }
}


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('./api/foodRewiew.json');
    if (!response.ok) throw new Error(`HTTP Hatası: ${response.status}`);
    const data = await response.json();

    console.log("Yorum verisi:", data);

    const reviews = data.reviews || data; // Direkt array olabilir
    renderTestimonials(reviews);

  } catch (error) {
    console.error("Yorumları çekerken hata oluştu:", error);
  }
});

function renderTestimonials(reviews) {
  const wrapper = document.getElementById("testimonial-wrapper");
  if (!wrapper || !Array.isArray(reviews)) return;

  wrapper.innerHTML = "";

  reviews.forEach(review => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
      <div class="testimonial-item text-center p-4">
        <img src="${review.photo}" alt="${review.name}" class="rounded-circle mb-3" width="80" height="80">
        <h5 class="mb-1">${review.name}</h5>
        <p class="text-muted fst-italic">"${review.comment}"</p>
        <small class="text-warning">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</small>
      </div>
    `;
    wrapper.appendChild(slide);
  });

  // Swiper burada başlasın
  new Swiper('.mySwiper', {
    loop: true,
    speed: 600,
    autoplay: {
      delay: 5000
    },
    slidesPerView: 1, // daha stabil, sonra istersen "auto" yaparsın
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    }
  });
}

var swiper = new Swiper(".gallery-swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  autoplay: {
    delay: 3000, // 3 saniyede bir
    disableOnInteraction: false, // kullanıcı dokunsa bile devam etsin
  },
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});