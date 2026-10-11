/**
 * YUM & FIT - Main Interactive Controller
 * Handles menu rendering, category filtering, WhatsApp orders,
 * video showcase player, and mobile navigation.
 */

document.addEventListener("DOMContentLoaded", () => {
  const menuSource = window.YumMenu || {};
  const menuItems = menuSource.MENU_ITEMS || [];
  const categories = menuSource.CATEGORIES || [];
  const buildWhatsAppUrl = menuSource.buildWhatsAppOrderUrl || ((name, price) => `https://wa.me/593981840168?text=${encodeURIComponent(`Hola Yum & Fit, deseo pedir: ${name} ($${price})`)}`);

  initNavbarScroll();
  initMobileMenu();
  initCategoryTabs(categories);
  renderMenuGrid(menuItems, "all", buildWhatsAppUrl);
  initVideoPlayer();
});

/**
 * Navbar elevation effect on scroll
 */
function initNavbarScroll() {
  const navbar = document.getElementById("main-navbar");
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const backdrop = document.getElementById("mobile-drawer-backdrop");
  const closeBtn = document.getElementById("mobile-drawer-close");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.remove("translate-x-full");
    if (backdrop) {
      backdrop.classList.remove("opacity-0", "pointer-events-none");
      backdrop.classList.add("opacity-100");
    }
    document.body.classList.add("overflow-hidden");
  };

  const closeDrawer = () => {
    drawer.classList.add("translate-x-full");
    if (backdrop) {
      backdrop.classList.add("opacity-0", "pointer-events-none");
      backdrop.classList.remove("opacity-100");
    }
    document.body.classList.remove("overflow-hidden");
  };

  if (toggleBtn) toggleBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !drawer.classList.contains("translate-x-full")) {
      closeDrawer();
    }
  });
}

/**
 * Category Filter Tabs
 */
function initCategoryTabs(categories) {
  const tabsContainer = document.getElementById("category-tabs-container");
  if (!tabsContainer || !categories.length) return;

  tabsContainer.innerHTML = "";

  categories.forEach((cat, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `filter-tab px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 border border-emerald-900/10 ${
      index === 0 ? "active-tab bg-[#1E3B2B] text-white shadow-md" : "bg-white text-[#54655B] hover:bg-emerald-50 hover:text-[#1E3B2B]"
    }`;
    btn.setAttribute("data-category", cat.id);
    btn.innerHTML = `<span>${cat.label}</span>`;

    btn.addEventListener("click", () => {
      // Actualizar estilo activo
      document.querySelectorAll(".filter-tab").forEach(t => {
        t.classList.remove("active-tab", "bg-[#1E3B2B]", "text-white", "shadow-md");
        t.classList.add("bg-white", "text-[#54655B]");
      });
      btn.classList.add("active-tab", "bg-[#1E3B2B]", "text-white", "shadow-md");
      btn.classList.remove("bg-white", "text-[#54655B]");

      // Filtrar platillos
      const menuSource = window.YumMenu || {};
      renderMenuGrid(menuSource.MENU_ITEMS || [], cat.id, menuSource.buildWhatsAppOrderUrl);
    });

    tabsContainer.appendChild(btn);
  });
}

/**
 * Renderizado de Platillos en el Menú
 */
function renderMenuGrid(items, categoryId, buildWhatsAppUrl) {
  const grid = document.getElementById("menu-dishes-grid");
  if (!grid) return;

  const filtered = categoryId === "all" ? items : items.filter(item => item.category === categoryId);

  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center text-[#54655B]">
        <p class="text-lg">No hay platillos en esta categoría por el momento.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(dish => {
    const card = document.createElement("article");
    card.className = "dish-card bg-white rounded-3xl overflow-hidden border border-emerald-900/5 flex flex-col justify-between";

    // Badge styling
    let badgeClass = "bg-[#E9F2EC] text-[#1E3B2B]";
    if (dish.badgeColor === "gold") badgeClass = "bg-[#F4E7CE] text-[#8C6212] font-bold";
    if (dish.badgeColor === "amber") badgeClass = "bg-amber-100 text-amber-800 font-semibold";

    const waLink = buildWhatsAppUrl ? buildWhatsAppUrl(dish.name, dish.price) : `https://wa.me/593981840168?text=Pedido:${encodeURIComponent(dish.name)}`;

    card.innerHTML = `
      <div>
        <div class="relative h-56 w-full overflow-hidden bg-emerald-950/10">
          <img 
            src="${dish.image}" 
            alt="${dish.name}" 
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onerror="this.src='Assets/logo.jpg'; this.classList.add('p-8', 'object-contain');"
          />
          ${dish.badge ? `<span class="absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs ${badgeClass} shadow-sm backdrop-blur-sm">${dish.badge}</span>` : ""}
          <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#1E3B2B] shadow-sm">
            ${dish.calories} kcal
          </div>
        </div>

        <div class="p-6">
          <div class="flex items-center justify-between gap-2 mb-2">
            <h3 class="text-xl font-bold font-heading text-[#19241C] leading-snug">${dish.name}</h3>
          </div>
          <p class="text-sm text-[#54655B] leading-relaxed mb-4 line-clamp-3">${dish.description}</p>
          
          <div class="flex items-center gap-3 py-3 border-t border-b border-emerald-900/5 text-xs text-[#54655B]">
            <span class="flex items-center gap-1 font-semibold text-[#1E3B2B]">
              <svg class="w-4 h-4 text-[#C99738]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ${dish.protein} Proteína
            </span>
            <span>•</span>
            <span>${dish.carbs || "Low Carb"}</span>
          </div>
        </div>
      </div>

      <div class="px-6 pb-6 pt-2 flex items-center justify-between gap-4">
        <div>
          <span class="text-xs text-[#54655B] uppercase tracking-wider block font-medium">Precio</span>
          <span class="text-2xl font-extrabold font-heading text-[#1E3B2B]">$${dish.price.toFixed(2)}</span>
        </div>
        <a 
          href="${waLink}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1E3B2B] hover:bg-[#14271D] text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg shadow-emerald-950/10"
        >
          <span>Pedir</span>
          <svg class="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.451.744.969 1.205.666.594 1.228.778 1.402.865.173.086.275.072.376-.044.101-.116.433-.506.549-.679.116-.173.231-.144.39-.086.159.058 1.011.477 1.184.564.173.086.289.13.332.202.043.072.043.419-.101.824z"/></svg>
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
}

/**
 * Control del Reproductor de Video
 */
function initVideoPlayer() {
  const video = document.getElementById("promo-video");
  const playOverlay = document.getElementById("video-play-overlay");
  const overlayBtn = document.getElementById("video-overlay-btn");
  const togglePlayBtn = document.getElementById("video-toggle-play");
  const muteBtn = document.getElementById("video-toggle-mute");
  const fsBtn = document.getElementById("video-toggle-fullscreen");
  const playIcon = document.getElementById("video-play-icon");
  const pauseIcon = document.getElementById("video-pause-icon");
  const muteIcon = document.getElementById("video-mute-icon");
  const unmuteIcon = document.getElementById("video-unmute-icon");

  if (!video) return;

  const togglePlay = () => {
    if (video.paused || video.ended) {
      video.play().catch(e => console.log("Playback prevented:", e));
    } else {
      video.pause();
    }
  };

  if (overlayBtn) overlayBtn.addEventListener("click", togglePlay);
  if (playOverlay) {
    playOverlay.addEventListener("click", (e) => {
      if (e.target === playOverlay) togglePlay();
    });
  }
  if (togglePlayBtn) togglePlayBtn.addEventListener("click", togglePlay);

  video.addEventListener("play", () => {
    if (playOverlay) playOverlay.classList.add("hidden-overlay");
    if (playIcon) playIcon.classList.add("hidden");
    if (pauseIcon) pauseIcon.classList.remove("hidden");
  });

  video.addEventListener("pause", () => {
    if (playOverlay) playOverlay.classList.remove("hidden-overlay");
    if (playIcon) playIcon.classList.remove("hidden");
    if (pauseIcon) pauseIcon.classList.add("hidden");
  });

  video.addEventListener("ended", () => {
    if (playOverlay) playOverlay.classList.remove("hidden-overlay");
    if (playIcon) playIcon.classList.remove("hidden");
    if (pauseIcon) pauseIcon.classList.add("hidden");
  });

  // Control de Silencio / Audio
  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      if (video.muted) {
        if (muteIcon) muteIcon.classList.remove("hidden");
        if (unmuteIcon) unmuteIcon.classList.add("hidden");
      } else {
        if (muteIcon) muteIcon.classList.add("hidden");
        if (unmuteIcon) unmuteIcon.classList.remove("hidden");
      }
    });
  }

  // Pantalla Completa
  if (fsBtn) {
    fsBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }
}
