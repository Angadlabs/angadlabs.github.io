// =========================================================
// 1. गारंटीड SVG आइकन और स्क्रीनशॉट जनरेटर
// =========================================================
function createIconSVG(shortText, bgColor) {
    const text = String(shortText || "AL").substring(0, 2).toUpperCase();
    const color = bgColor || "#01875f";
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">' +
        '<rect width="160" height="160" rx="34" fill="' + color + '"/>' +
        '<text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="48" font-weight="bold">' + text + '</text>' +
        '</svg>';
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function createScreenSVG(appName, screenTitle, bgColor) {
    const safeApp = String(appName || "App").replace(/[<>&"']/g, "");
    const safeTitle = String(screenTitle || "Preview").replace(/[<>&"']/g, "");
    const color = bgColor || "#01875f";
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="560">' +
        '<rect width="320" height="560" rx="22" fill="' + color + '"/>' +
        '<rect x="18" y="36" width="284" height="488" rx="14" fill="rgba(255,255,255,0.12)"/>' +
        '<text x="50%" y="44%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24" font-weight="bold">' + safeApp + '</text>' +
        '<text x="50%" y="53%" dominant-baseline="middle" text-anchor="middle" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="16">' + safeTitle + '</text>' +
        '<text x="50%" y="90%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="12">Powered by Angad Labs</text>' +
        '</svg>';
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// =========================================================
// 2. डमी डेटा (बैकअप के लिए)
// =========================================================
const fallbackAppsData = [
    {
        id: 1,
        name: "Exam Sathi",
        developer: "Angad",
        company: "Angad Labs",
        email: "contact.codewithangad@gmail.com",
        category: "Education",
        rating: "2 ★",
        reviews: "2 Rates",
        downloads: "5+",
        size: "12 MB",
        version: "2.0.0",
        short_desc: "यूपी बोर्ड और प्रतियोगी परीक्षाओं की तैयारी के लिए बेस्ट स्टडी और लाइव क्विज ऐप।",
        long_desc: "एग्जाम साथी (Exam Sathi) छात्रों के लिए बनाया गया एक संपूर्ण लर्निंग और क्विज एप्लीकेशन है।\n\nमुख्य फीचर्स:\n• सभी विषयों के चैप्टर-वाइज एमसीक्यू (MCQ) टेस्ट।\n• बिना इंटरनेट के ऑफलाइन पढ़ाई करने की सुविधा।\n• तुरंत रिजल्ट और स्कोरकार्ड एनालिसिस।\n• रोज नए प्रैक्टिस सेट और महत्वपूर्ण प्रश्न।",
        download_link: ""download_link": "angadlabs.github.io/ExamSathiR/",
        icon: createIconSVG("ES", "#01875f"),
        screenshots: [
            createScreenSVG("Exam Sathi", "Home & Category Screen", "#01875f"),
            createScreenSVG("Exam Sathi", "Live Quiz Mode", "#0f766e")
        ],
        install_steps: [
            "Open & Install App बटन पर क्लिक करें।",
            "ऐप का पेज खुलते ही नीचे आने वाले Install बटन पर टैप करें।",
            "ऐप सीधे आपके फोन की होम-स्क्रीन पर इंस्टॉल हो जाएगा।"
        ]
    }
];

let allApps = [];
let activeApp = null;
let storeDeferredPrompt = null;

// =========================================================
// 3. SMART LINK HANDLER (index.html वेब ऐप और APK दोनों के लिए)
// =========================================================
function isWebAppLink(rawUrl) {
    if (!rawUrl) return false;
    const u = String(rawUrl).trim().toLowerCase();
    if (u.endsWith(".apk") || u.includes("drive.google.com")) {
        return false;
    }
    return true;
}

function getDirectDownloadUrl(rawUrl) {
    if (!rawUrl) return "#";
    let url = String(rawUrl).trim();

    if (url.includes("cdn.jsdelivr.net/gh/") && url.toLowerCase().endsWith(".apk")) {
        const parts = url.split("cdn.jsdelivr.net/gh/")[1];
        if (parts) {
            const replaced = parts.replace("@main/", "/main/").replace("@master/", "/master/");
            return "https://raw.githubusercontent.com/" + replaced;
        }
    }

    if (url.includes("github.com") && url.includes("/blob/")) {
        return url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
    }

    if (url.includes("drive.google.com")) {
        const matchD = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (matchD && matchD[1]) {
            return "https://drive.google.com/uc?export=download&id=" + matchD[1];
        }
        const matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (matchId && matchId[1]) {
            return "https://drive.google.com/uc?export=download&id=" + matchId[1];
        }
    }

    return url;
}

// =========================================================
// 4. अलग-अलग SHARE APP और COPY LINK सिस्टम
// =========================================================
function getAppShareUrl(appId) {
    let baseUrl = "https://angadlabs.github.io/";
    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
        baseUrl = window.location.origin + window.location.pathname;
    }
    return baseUrl + "#app=" + appId;
}

function showModernToast(message) {
    let toast = document.getElementById('modern-share-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'modern-share-toast';
        toast.className = 'share-toast';
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2800);
}

// ---------------------------------------------------------
// बटन 1 का काम: सिर्फ Copy Link दबाने पर ही लिंक कॉपी होगा
// ---------------------------------------------------------
function copyAppLinkOnly(app) {
    if (!app) return;
    const shareUrl = getAppShareUrl(app.id);

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(shareUrl).then(() => {
            showModernToast("✅ लिंक कॉपी हो गया! (Link Copied)");
        }).catch(() => {
            fallbackCopyText(shareUrl);
        });
    } else {
        fallbackCopyText(shareUrl);
    }
}

function fallbackCopyText(text) {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    tempInput.style.position = "fixed";
    tempInput.style.left = "-9999px";
    document.body.appendChild(tempInput);
    tempInput.focus();
    tempInput.select();
    try {
        document.execCommand('copy');
        showModernToast("✅ लिंक कॉपी हो गया! (Link Copied)");
    } catch (err) {
        showModernToast("🔗 Link: " + text);
    }
    document.body.removeChild(tempInput);
}

// ---------------------------------------------------------
// बटन 2 का काम: Share App दबाने पर फोन के सभी ऐप्स खुलेंगे
// ---------------------------------------------------------
async function shareApp(app) {
    if (!app) return;
    const shareUrl = getAppShareUrl(app.id);
    const shareTitle = app.name + " - Angad App Store";
    const shareMessage = "📲 *" + app.name + "* (" + app.size + ")\n" +
                         "Developer: " + app.developer + " (" + app.company + ")\n\n" +
                         app.short_desc + "\n\n👇 यहाँ से ओपन और इंस्टॉल करें:";
    const fullTextWithUrl = shareMessage + "\n" + shareUrl;

    // 1. मोबाइल ब्राउज़र का Native Share Sheet (फोन के सारे इंस्टॉल्ड ऐप्स खोलेगा)
    if (navigator.share) {
        try {
            await navigator.share({
                title: shareTitle,
                text: shareMessage,
                url: shareUrl
            });
            return;
        } catch (err) {
            // अगर यूजर ने खुद शेयर लिस्ट बंद कर दी हो तो कुछ मत करो
            if (err && err.name === "AbortError") {
                return;
            }
            // अगर लोकल प्रीव्यू में URL की वजह से रुका हो, तो पूरे टेक्स्ट के साथ शेयर लिस्ट खोलो
            try {
                await navigator.share({
                    title: shareTitle,
                    text: fullTextWithUrl
                });
                return;
            } catch (err2) {
                if (err2 && err2.name === "AbortError") return;
            }
        }
    }

    // 2. अगर कोई लोकल कोड एडिटर (WebView) हो जहाँ navigator.share न हो,
    // तो सीधे Android Intent से फोन के सारे शेयरिंग ऐप्स खोलो (लिंक कॉपी नहीं करेगा)
    const intentUrl = "intent:#Intent;action=android.intent.action.SEND;type=text/plain;" +
                      "S.android.intent.extra.SUBJECT=" + encodeURIComponent(shareTitle) + ";" +
                      "S.android.intent.extra.TEXT=" + encodeURIComponent(fullTextWithUrl) + ";end";
    window.location.href = intentUrl;
}

// =========================================================
// 5. डेटा नॉर्मलाइज़र
// =========================================================
function normalizeAppData(item, index) {
    const palette = ["#01875f", "#2563eb", "#ea580c", "#7c3aed", "#16a34a"];
    const color = palette[index % palette.length];
    const name = String(item.name || ("App " + (index + 1)));

    const shortDesc = item.short_desc || item.description || "प्रीमियम एप्लीकेशन - Powered by Angad Labs.";
    const longDesc = item.long_desc || item.description || shortDesc;

    let iconUrl = item.icon;
    if (!iconUrl || String(iconUrl).includes("placeholder.com")) {
        iconUrl = createIconSVG(name.substring(0, 2), color);
    }

    let screens = [];
    if (Array.isArray(item.screenshots) && item.screenshots.length > 0 && !String(item.screenshots[0]).includes("placeholder.com")) {
        screens = item.screenshots;
    } else {
        screens = [
            createScreenSVG(name, "Screenshot 1", color),
            createScreenSVG(name, "Screenshot 2", "#1e293b")
        ];
    }

    const rawLink = item.app_link || item.download_link || "#";

    return {
        id: item.id !== undefined ? item.id : (index + 1),
        name: name,
        developer: String(item.developer || "Angad"),
        company: String(item.company || "Angad Labs"),
        email: String(item.email || "contact.codewithangad@gmail.com"),
        category: String(item.category || "Education"),
        rating: String(item.rating || "4.8 ★"),
        reviews: String(item.reviews || "2K Rates"),
        downloads: String(item.downloads || "10K+"),
        size: String(item.size || "12 MB"),
        version: String(item.version || "1.0.0"),
        short_desc: String(shortDesc),
        long_desc: String(longDesc),
        download_link: String(rawLink),
        icon: iconUrl,
        screenshots: screens,
        install_steps: Array.isArray(item.install_steps) && item.install_steps.length > 0
            ? item.install_steps
            : ["Open & Install App बटन पर क्लिक करें।", "नए पेज पर ऐप खुलते ही Install बटन दबाएं।"]
    };
}

// =========================================================
// 6. होमपेज पर ऐप्स दिखाना
// =========================================================
function renderAppsList(list) {
    const container = document.getElementById('apps-list-container');
    if (!container) return;
    container.innerHTML = '';

    if (!Array.isArray(list) || list.length === 0) {
        container.innerHTML = '<div class="empty-msg">इस नाम का कोई भी ऐप नहीं मिला।</div>';
        return;
    }

    list.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';

        card.innerHTML =
            '<div>' +
                '<div class="card-top">' +
                    '<img src="' + app.icon + '" alt="' + app.name + '" class="card-icon">' +
                    '<div class="card-meta">' +
                        '<div class="card-title">' + app.name + '</div>' +
                        '<div class="card-dev">Developer: ' + app.developer + '</div>' +
                        '<div class="card-company">Company: ' + app.company + '</div>' +
                    '</div>' +
                '</div>' +
                '<p class="card-short-desc">' + app.short_desc + '</p>' +
            '</div>' +
            '<div class="card-actions">' +
                '<button type="button" class="view-details-btn">View Details</button>' +
                '<button type="button" class="card-share-btn" title="Share App">📤 Share</button>' +
                '<button type="button" class="card-copy-btn" title="Copy Link">🔗 Copy</button>' +
            '</div>';

        card.querySelector('.view-details-btn').addEventListener('click', () => openDetailsPage(app.id));
        card.querySelector('.card-share-btn').addEventListener('click', () => shareApp(app));
        card.querySelector('.card-copy-btn').addEventListener('click', () => copyAppLinkOnly(app));

        container.appendChild(card);
    });
}

// =========================================================
// 7. ऐप डिटेल पेज खोलना
// =========================================================
function openDetailsPage(appId) {
    const app = allApps.find(a => String(a.id) === String(appId));
    if (!app) return;
    activeApp = app;

    const targetHash = '#app=' + app.id;
    if (window.location.hash !== targetHash) {
        window.history.pushState({ view: 'details', appId: app.id }, '', targetHash);
    }

    document.getElementById('home-view').style.display = 'none';
    document.getElementById('details-view').style.display = 'block';
    window.scrollTo(0, 0);

    document.getElementById('d-icon').src = app.icon;
    document.getElementById('d-name').innerText = app.name;
    document.getElementById('d-developer').innerText = app.developer;
    document.getElementById('d-company').innerText = app.company;

    document.getElementById('d-rating').innerText = app.rating;
    document.getElementById('d-reviews').innerText = app.reviews;
    document.getElementById('d-downloads').innerText = app.downloads;
    document.getElementById('d-size').innerText = app.size;
    document.getElementById('d-version').innerText = "v" + app.version;

    document.getElementById('d-long-desc').innerText = app.long_desc;
    document.getElementById('d-info-dev').innerText = app.developer;
    document.getElementById('d-info-comp').innerText = app.company;

    const emailEl = document.getElementById('d-info-email');
    emailEl.innerText = app.email;
    emailEl.href = "mailto:" + app.email;

    document.getElementById('d-info-cat').innerText = app.category;

    const mainBtn = document.getElementById('download-apk-btn');
    if (isWebAppLink(app.download_link)) {
        mainBtn.innerText = "📲 Open & Install App (" + app.size + ")";
    } else {
        mainBtn.innerText = "⬇ Download APK (" + app.size + ")";
    }

    const statusBox = document.getElementById('download-status-box');
    statusBox.style.display = 'none';

    const ssContainer = document.getElementById('d-screenshots-list');
    ssContainer.innerHTML = '';
    app.screenshots.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = app.name + " Screenshot";
        img.addEventListener('click', () => openFullscreenImage(imgSrc));
        ssContainer.appendChild(img);
    });
}

// =========================================================
// 8. OPEN index.html WEB APP OR DOWNLOAD APK
// =========================================================
function triggerApkDownload(app) {
    if (!app) return;
    const statusBox = document.getElementById('download-status-box');
    const dlBtn = document.getElementById('download-apk-btn');
    const finalUrl = getDirectDownloadUrl(app.download_link);

    if (isWebAppLink(finalUrl)) {
        statusBox.style.display = 'block';
        statusBox.innerText = "🚀 " + app.name + " खुल रहा है... वहाँ आप इसे सीधे Install कर सकते हैं!";
        window.open(finalUrl, '_blank');
        return;
    }

    dlBtn.innerText = "⏳ Starting APK Download...";
    statusBox.style.display = 'block';
    statusBox.innerText = app.name + " (" + app.size + ") डाउनलोड शुरू हो रहा है...";

    setTimeout(() => {
        window.location.assign(finalUrl);
        dlBtn.innerText = "⬇ Download APK (" + app.size + ")";
        statusBox.innerText = "✅ डाउनलोड शुरू हो गया है! ऊपर Notification या Downloads फोल्डर चेक करें।";
    }, 400);
}

function openInstallModal(app) {
    if (!app) return;
    const modal = document.getElementById('install-modal');
    const title = document.getElementById('modal-app-title');
    const stepsList = document.getElementById('modal-steps-list');

    title.innerText = app.name + " - Install Guide";
    stepsList.innerHTML = '';

    app.install_steps.forEach(step => {
        const li = document.createElement('li');
        li.innerText = step;
        stepsList.appendChild(li);
    });

    if (window.location.hash !== '#modal') {
        window.history.pushState({ view: 'modal' }, '', '#modal');
    }
    modal.style.display = 'flex';
}

function openFullscreenImage(src) {
    const lightbox = document.getElementById('lightbox-modal');
    const lightImg = document.getElementById('lightbox-img');
    lightImg.src = src;

    if (window.location.hash !== '#modal') {
        window.history.pushState({ view: 'modal' }, '', '#modal');
    }
    lightbox.style.display = 'flex';
}

// =========================================================
// 9. BACK NAVIGATION CONTROLLER
// =========================================================
function showHomeScreen() {
    document.getElementById('lightbox-modal').style.display = 'none';
    document.getElementById('install-modal').style.display = 'none';
    document.getElementById('details-view').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
}

function closeModalsOnly() {
    document.getElementById('lightbox-modal').style.display = 'none';
    document.getElementById('install-modal').style.display = 'none';
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('details-view').style.display = 'block';
}

window.addEventListener('popstate', () => {
    const currentHash = window.location.hash;
    if (currentHash === '#modal') {
        return;
    } else if (currentHash.startsWith('#app=')) {
        closeModalsOnly();
    } else {
        showHomeScreen();
    }
});

function checkDirectShareLink() {
    const hash = window.location.hash;
    if (hash.startsWith('#app=')) {
        const targetId = hash.replace('#app=', '').trim();
        openDetailsPage(targetId);
    }
}

// =========================================================
// 10. PLAY STORE PWA INSTALL SETUP (manifest.json + sw.js)
// =========================================================
function setupStorePWA() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("https://cdn.jsdelivr.net/gh/Angadlabs/Angadlabs.github.io@main/sw.js").catch(() => {});
        });
    }

    const banner = document.getElementById("store-pwa-banner");
    const installBtn = document.getElementById("store-pwa-btn");

    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        storeDeferredPrompt = e;
        if (banner) banner.style.display = "flex";
    });

    if (installBtn) {
        installBtn.addEventListener("click", async () => {
            if (storeDeferredPrompt) {
                storeDeferredPrompt.prompt();
                const { outcome } = await storeDeferredPrompt.userChoice;
                if (outcome === "accepted" && banner) {
                    banner.style.display = "none";
                }
                storeDeferredPrompt = null;
            }
        });
    }

    window.addEventListener("appinstalled", () => {
        if (banner) banner.style.display = "none";
    });
}

// =========================================================
// 11. INITIALIZE STORE
// =========================================================
function initStore() {
    setupStorePWA();

    if (window.location.hash === '#modal' || window.location.hash === '#details') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    allApps = fallbackAppsData.map((item, idx) => normalizeAppData(item, idx));
    renderAppsList(allApps);
    checkDirectShareLink();

    fetch('https://cdn.jsdelivr.net/gh/Angadlabs/Angadlabs.github.io@main/package.json?t=' + new Date().getTime())
        .then(res => {
            if (!res.ok) throw new Error("package.json not found");
            return res.json();
        })
        .then(jsonData => {
            if (Array.isArray(jsonData) && jsonData.length > 0) {
                allApps = jsonData.map((item, idx) => normalizeAppData(item, idx));
                renderAppsList(allApps);
                checkDirectShareLink();
            }
        })
        .catch(() => {});

    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search-btn');

    searchInput.addEventListener('input', (e) => {
        const query = String(e.target.value || "").toLowerCase().trim();
        clearBtn.style.display = query.length > 0 ? 'flex' : 'none';
        if (!query) {
            renderAppsList(allApps);
            return;
        }
        const matched = allApps.filter(app => app.name.toLowerCase().includes(query));
        renderAppsList(matched);
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        renderAppsList(allApps);
        searchInput.focus();
    });

    document.getElementById('back-to-home-btn').addEventListener('click', () => {
        showHomeScreen();
        if (window.location.hash.startsWith('#app=') || window.location.hash === '#modal') {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    });

    const topLeftBrand = document.querySelector('.dev-left');
    if (topLeftBrand) {
        topLeftBrand.style.cursor = 'pointer';
        topLeftBrand.addEventListener('click', () => {
            showHomeScreen();
            if (window.location.hash) {
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }
        });
    }

    document.getElementById('download-apk-btn').addEventListener('click', () => {
        triggerApkDownload(activeApp);
    });

    document.getElementById('install-app-btn').addEventListener('click', () => {
        openInstallModal(activeApp);
    });

    const detailShareBtn = document.getElementById('share-app-btn');
    if (detailShareBtn) {
        detailShareBtn.addEventListener('click', () => shareApp(activeApp));
    }

    const detailCopyBtn = document.getElementById('copy-link-btn');
    if (detailCopyBtn) {
        detailCopyBtn.addEventListener('click', () => copyAppLinkOnly(activeApp));
    }

    document.getElementById('modal-direct-dl-btn').addEventListener('click', () => {
        document.getElementById('install-modal').style.display = 'none';
        if (window.location.hash === '#modal') window.history.back();
        triggerApkDownload(activeApp);
    });

    document.getElementById('close-install-modal').addEventListener('click', () => {
        document.getElementById('install-modal').style.display = 'none';
        if (window.location.hash === '#modal') window.history.back();
    });

    document.getElementById('close-lightbox-btn').addEventListener('click', () => {
        document.getElementById('lightbox-modal').style.display = 'none';
        if (window.location.hash === '#modal') window.history.back();
    });

    document.getElementById('lightbox-modal').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox-modal') {
            document.getElementById('lightbox-modal').style.display = 'none';
            if (window.location.hash === '#modal') window.history.back();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStore);
} else {
    initStore();
}
