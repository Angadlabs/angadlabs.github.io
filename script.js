// =========================================================
// 1. गारंटीड SVG आइकन और स्क्रीनशॉट जनरेटर (कभी ब्रेक नहीं होगा)
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
// 2. डमी डेटा (अगर package.json लोड न हो तब भी ये 100% चलेगा)
// =========================================================
const fallbackAppsData = [
    {
        id: 1,
        name: "Exam Sathi",
        developer: "Angad",
        company: "Angad Labs",
        email: "angadlabs.help@gmail.com",
        category: "Education",
        rating: "4.9 ★",
        reviews: "4.5K Reviews",
        downloads: "50K+",
        size: "14 MB",
        version: "2.1.0",
        short_desc: "यूपी बोर्ड और प्रतियोगी परीक्षाओं की तैयारी के लिए बेस्ट स्टडी और लाइव क्विज ऐप।",
        long_desc: "एग्जाम साथी (Exam Sathi) छात्रों के लिए बनाया गया एक संपूर्ण लर्निंग और क्विज एप्लीकेशन है।\n\nमुख्य फीचर्स:\n• सभी विषयों के चैप्टर-वाइज एमसीक्यू (MCQ) टेस्ट।\n• बिना इंटरनेट के ऑफलाइन पढ़ाई करने की सुविधा।\n• तुरंत रिजल्ट और स्कोरकार्ड एनालिसिस।\n• रोज नए प्रैक्टिस सेट और महत्वपूर्ण प्रश्न।",
        download_link: "https://drive.google.com/file/d/1ABCDEFG1234567890/view?usp=sharing",
        icon: createIconSVG("ES", "#01875f"),
        screenshots: [
            createScreenSVG("Exam Sathi", "Home & Category Screen", "#01875f"),
            createScreenSVG("Exam Sathi", "Live Quiz Mode", "#0f766e"),
            createScreenSVG("Exam Sathi", "Instant Result Card", "#047857")
        ],
        install_steps: [
            "Download APK बटन पर क्लिक करके फाइल डाउनलोड करें।",
            "फोन के Downloads फोल्डर में जाकर Exam Sathi APK पर टैप करें।",
            "Unknown Sources की परमिशन ऑन करें और Install पर क्लिक करें।"
        ]
    },
    {
        id: 2,
        name: "Sonma Typing Pro",
        developer: "Angad",
        company: "Angad Labs",
        email: "angadlabs.help@gmail.com",
        category: "Productivity",
        rating: "4.8 ★",
        reviews: "2.1K Reviews",
        downloads: "30K+",
        size: "10 MB",
        version: "1.5.0",
        short_desc: "हिंदी (Devlys 010) और इंग्लिश टाइपिंग स्पीड व एक्यूरेसी बढ़ाने वाला प्रोफेशनल टूल।",
        long_desc: "Sonma Typing Pro की मदद से आप अपने मोबाइल या कंप्यूटर पर हिंदी और अंग्रेजी टाइपिंग की प्रैक्टिस कर सकते हैं।\n\nमुख्य फीचर्स:\n• कस्टम पैराग्राफ जोड़ने की सुविधा।\n• लाइव WPM (Words Per Minute) और एक्यूरेसी ट्रैकर।\n• सरकारी टाइपिंग परीक्षाओं के लिए विशेष टाइमर मोड।",
        download_link: "https://drive.google.com/file/d/2HIJKLMN0987654321/view?usp=sharing",
        icon: createIconSVG("TP", "#2563eb"),
        screenshots: [
            createScreenSVG("Typing Pro", "Live WPM Speed Test", "#2563eb"),
            createScreenSVG("Typing Pro", "Accuracy & Error Report", "#1d4ed8")
        ],
        install_steps: [
            "सबसे पहले Download APK बटन दबाएं।",
            "डाउनलोड पूरा होने पर नोटिफिकेशन बार से फाइल खोलें और Install करें।"
        ]
    },
    {
        id: 3,
        name: "Beat Maker Studio",
        developer: "Angad",
        company: "Angad Labs",
        email: "angadlabs.help@gmail.com",
        category: "Music & Audio",
        rating: "4.7 ★",
        reviews: "3.4K Reviews",
        downloads: "40K+",
        size: "22 MB",
        version: "3.0.0",
        short_desc: "मल्टी-टच ड्रम पैड्स और पियानो कीबोर्ड के साथ खुद का म्यूजिक और बीट्स बनाएं।",
        long_desc: "Beat Maker Studio संगीत प्रेमियों के लिए एक शानदार मोबाइल म्यूजिक प्रोडक्शन ऐप है।\n\nमुख्य फीचर्स:\n• 24 हाई-क्वालिटी मल्टी-टच ड्रम पैड्स।\n• सिंथ पियानो कीबोर्ड और कस्टम सैंपलर।\n• लो-लेटेंसी वेब ऑडियो इंजन।",
        download_link: "https://drive.google.com/file/d/3OPQRSTU1122334455/view?usp=sharing",
        icon: createIconSVG("BM", "#ea580c"),
        screenshots: [
            createScreenSVG("Beat Maker", "Multi-Touch Drum Pads", "#ea580c"),
            createScreenSVG("Beat Maker", "Studio Piano Roll", "#c2410c")
        ],
        install_steps: [
            "APK फाइल डाउनलोड करें।",
            "Install बटन दबाकर ऐप खोलें और म्यूजिक बनाना शुरू करें।"
        ]
    },
    {
        id: 4,
        name: "Chroma Animator 2D",
        developer: "Angad",
        company: "Angad Labs",
        email: "angadlabs.help@gmail.com",
        category: "Animation",
        rating: "4.6 ★",
        reviews: "1.2K Reviews",
        downloads: "15K+",
        size: "18 MB",
        version: "1.2.0",
        short_desc: "कार्टून एनिमेशन के लिए कस्टम 2D करैक्टर और स्प्राइट शीट बनाने का आसान ऐप।",
        long_desc: "Chroma Animator 2D की मदद से आप अपने यूट्यूब वीडियो और कहानियों के लिए 2D करैक्टर स्प्राइट शीट तैयार कर सकते हैं और उन्हें आसानी से एनिमेट कर सकते हैं।",
        download_link: "https://drive.google.com/file/d/4VWXYZAB6677889900/view?usp=sharing",
        icon: createIconSVG("2D", "#7c3aed"),
        screenshots: [
            createScreenSVG("Chroma 2D", "Character Sprite Editor", "#7c3aed"),
            createScreenSVG("Chroma 2D", "Animation Timeline", "#6d28d9")
        ],
        install_steps: [
            "Download APK पर क्लिक करें।",
            "फाइल डाउनलोड होने के बाद उसे इंस्टॉल करें।"
        ]
    },
    {
        id: 5,
        name: "Paper Trading India",
        developer: "Angad",
        company: "Angad Labs",
        email: "angadlabs.help@gmail.com",
        category: "Finance",
        rating: "4.9 ★",
        reviews: "6.0K Reviews",
        downloads: "100K+",
        size: "12 MB",
        version: "2.4.0",
        short_desc: "बिना असली पैसे के वर्चुअल मनी से शेयर मार्केट और पेपर ट्रेडिंग सीखने का ऐप।",
        long_desc: "Paper Trading India उन लोगों के लिए बनाया गया है जो बिना किसी आर्थिक जोखिम के शेयर बाजार और ट्रेडिंग की प्रैक्टिस करना चाहते हैं। इसमें आपको प्रैक्टिस के लिए वर्चुअल पोर्टफोलियो मिलता है।",
        download_link: "https://drive.google.com/file/d/5CDEFGHI5544332211/view?usp=sharing",
        icon: createIconSVG("PT", "#16a34a"),
        screenshots: [
            createScreenSVG("Paper Trader", "Live Virtual Portfolio", "#16a34a"),
            createScreenSVG("Paper Trader", "Practice Order Book", "#15803d")
        ],
        install_steps: [
            "Download APK बटन से फाइल अपने फोन में सेव करें।",
            "APK पर क्लिक करके इंस्टॉल करें।"
        ]
    }
];

let allApps = [];
let activeApp = null;

// =========================================================
// 3. GOOGLE DRIVE SHARE LINK CONVERTER
// =========================================================
function getDirectDriveUrl(rawUrl) {
    if (!rawUrl) return "#";
    const url = String(rawUrl).trim();
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
// 4. डेटा नॉर्मलाइज़र
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
            createScreenSVG(name, "Screenshot 2", "#1e293b"),
            createScreenSVG(name, "Screenshot 3", "#0f766e")
        ];
    }

    return {
        id: item.id !== undefined ? item.id : (index + 1),
        name: name,
        developer: String(item.developer || "Angad"),
        company: String(item.company || "Angad Labs"),
        email: String(item.email || "angadlabs.help@gmail.com"),
        category: String(item.category || "Application"),
        rating: String(item.rating || "4.8 ★"),
        reviews: String(item.reviews || "2K Reviews"),
        downloads: String(item.downloads || "10K+"),
        size: String(item.size || "12 MB"),
        version: String(item.version || "1.0.0"),
        short_desc: String(shortDesc),
        long_desc: String(longDesc),
        download_link: String(item.download_link || "#"),
        icon: iconUrl,
        screenshots: screens,
        install_steps: Array.isArray(item.install_steps) && item.install_steps.length > 0
            ? item.install_steps
            : ["Download APK बटन पर क्लिक करें।", "Downloads में जाकर APK फाइल पर टैप करें और Install करें।"]
    };
}

// =========================================================
// 5. होमपेज पर ऐप्स दिखाना (Render Home List)
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
            '<button type="button" class="view-details-btn">View Details</button>';

        const btn = card.querySelector('.view-details-btn');
        btn.addEventListener('click', () => openDetailsPage(app.id));

        container.appendChild(card);
    });
}

// =========================================================
// 6. ऐप डिटेल पेज खोलना + PHONE BACK BUTTON HISTORY
// =========================================================
function openDetailsPage(appId) {
    const app = allApps.find(a => String(a.id) === String(appId));
    if (!app) return;
    activeApp = app;

    // फोन के बैक बटन के लिए ब्राउज़र हिस्ट्री में #details जोड़ना
    if (window.location.hash !== '#details') {
        window.history.pushState({ view: 'details', appId: app.id }, '', '#details');
    }

    document.getElementById('home-view').style.display = 'none';
    document.getElementById('details-view').style.display = 'block';
    window.scrollTo(0, 0);

    // हेडर और स्टैट्स भरना
    document.getElementById('d-icon').src = app.icon;
    document.getElementById('d-name').innerText = app.name;
    document.getElementById('d-developer').innerText = app.developer;
    document.getElementById('d-company').innerText = app.company;

    document.getElementById('d-rating').innerText = app.rating;
    document.getElementById('d-reviews').innerText = app.reviews;
    document.getElementById('d-downloads').innerText = app.downloads;
    document.getElementById('d-size').innerText = app.size;
    document.getElementById('d-version').innerText = "v" + app.version;

    // लॉन्ग डिस्क्रिप्शन और कॉन्टैक्ट जीमेल भरना
    document.getElementById('d-long-desc').innerText = app.long_desc;
    document.getElementById('d-info-dev').innerText = app.developer;
    document.getElementById('d-info-comp').innerText = app.company;

    const emailEl = document.getElementById('d-info-email');
    emailEl.innerText = app.email;
    emailEl.href = "mailto:" + app.email;

    document.getElementById('d-info-cat').innerText = app.category;

    // स्टेटस पिल रीसेट करना
    const statusBox = document.getElementById('download-status-box');
    statusBox.style.display = 'none';

    // स्क्रीनशॉट्स लगाना (क्लिक करने पर फुल साइज खुलेगा)
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
// 7. DOWNLOAD & INSTALL LOGIC
// =========================================================
function triggerApkDownload(app) {
    if (!app) return;
    const statusBox = document.getElementById('download-status-box');
    const dlBtn = document.getElementById('download-apk-btn');

    const finalUrl = getDirectDriveUrl(app.download_link);

    dlBtn.innerText = "⏳ Preparing APK Download...";
    statusBox.style.display = 'block';
    statusBox.innerText = app.name + " (" + app.size + ") आपके फोन में डाउनलोड हो रहा है...";

    setTimeout(() => {
        const a = document.createElement('a');
        a.href = finalUrl;
        a.setAttribute('download', app.name.replace(/\s+/g, '_') + '.apk');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        dlBtn.innerText = "⬇ Download APK (" + app.size + ")";
        statusBox.innerText = "✅ डाउनलोड शुरू हो गया है! ऊपर Notification या Downloads फोल्डर चेक करें।";
    }, 600);
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

    // फोन के बैक बटन से पॉपअप बंद करने के लिए हिस्ट्री स्टेट जोड़ना
    if (window.location.hash !== '#modal') {
        window.history.pushState({ view: 'modal' }, '', '#modal');
    }
    modal.style.display = 'flex';
}

// =========================================================
// 8. FULLSCREEN SCREENSHOT LIGHTBOX
// =========================================================
function openFullscreenImage(src) {
    const lightbox = document.getElementById('lightbox-modal');
    const lightImg = document.getElementById('lightbox-img');
    lightImg.src = src;

    // फोन के बैक बटन से फोटो बंद करने के लिए हिस्ट्री स्टेट जोड़ना
    if (window.location.hash !== '#modal') {
        window.history.pushState({ view: 'modal' }, '', '#modal');
    }
    lightbox.style.display = 'flex';
}

// =========================================================
// 9. BACK NAVIGATION CONTROLLER (फोन और स्क्रीन दोनों बैक बटन के लिए)
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

// जब यूजर फोन का हार्डवेयर Back बटन दबाएगा, तब यह अपने आप चलेगा
window.addEventListener('popstate', () => {
    const currentHash = window.location.hash;

    if (currentHash === '#modal') {
        // मोडल खुला है
        return;
    } else if (currentHash === '#details') {
        // यूजर ने फोटो या पॉपअप से बैक किया है, तो सिर्फ पॉपअप बंद करो और डिटेल पेज दिखाओ
        closeModalsOnly();
    } else {
        // यूजर ने डिटेल पेज से बैक किया है, तो सीधे होमपेज (ऐप्स लिस्ट) दिखाओ
        showHomeScreen();
    }
});

// =========================================================
// 10. INITIALIZE STORE & EVENTS
// =========================================================
function initStore() {
    // अगर पेज रीफ्रेश हुआ हो और URL में पुराना #details या #modal हो तो उसे साफ करें
    if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // 1. पहले डिफ़ॉल्ट डमी डेटा तुरंत दिखाएं
    allApps = fallbackAppsData.map((item, idx) => normalizeAppData(item, idx));
    renderAppsList(allApps);

    // 2. package.json से डेटा मंगाना (अगर उपलब्ध हो)
    fetch('package.json')
        .then(res => {
            if (!res.ok) throw new Error("package.json not found");
            return res.json();
        })
        .then(jsonData => {
            if (Array.isArray(jsonData) && jsonData.length > 0) {
                allApps = jsonData.map((item, idx) => normalizeAppData(item, idx));
                renderAppsList(allApps);
            }
        })
        .catch(() => {});

   // सर्च बार लॉजिक
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search-btn');

    searchInput.addEventListener('input', (e) => {
        const query = String(e.target.value || "").toLowerCase().trim();
        clearBtn.style.display = query.length > 0 ? 'flex' : 'none';

        if (!query) {
            renderAppsList(allApps);
            return;
        }

        const matched = allApps.filter(app =>
            app.name.toLowerCase().includes(query)
        );
        renderAppsList(matched);
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        renderAppsList(allApps);
        searchInput.focus();
    });

    // स्क्रीन वाला "Back to Apps" बटन
    document.getElementById('back-to-home-btn').addEventListener('click', () => {
        showHomeScreen();
        if (window.location.hash === '#details' || window.location.hash === '#modal') {
            window.history.back();
        }
    });

    // टॉप बार में बाईं तरफ "Angad" पर क्लिक करने पर भी होमपेज खुलेगा
    const topLeftBrand = document.querySelector('.dev-left');
    if (topLeftBrand) {
        topLeftBrand.style.cursor = 'pointer';
        topLeftBrand.addEventListener('click', () => {
            showHomeScreen();
            if (window.location.hash) {
                window.history.back();
            }
        });
    }

    // Download और Install बटन
    document.getElementById('download-apk-btn').addEventListener('click', () => {
        triggerApkDownload(activeApp);
    });

    document.getElementById('install-app-btn').addEventListener('click', () => {
        openInstallModal(activeApp);
    });

    document.getElementById('modal-direct-dl-btn').addEventListener('click', () => {
        document.getElementById('install-modal').style.display = 'none';
        if (window.location.hash === '#modal') {
            window.history.back();
        }
        triggerApkDownload(activeApp);
    });

    // मोडल और लाइटबॉक्स बंद करने के बटन
    document.getElementById('close-install-modal').addEventListener('click', () => {
        document.getElementById('install-modal').style.display = 'none';
        if (window.location.hash === '#modal') {
            window.history.back();
        }
    });

    document.getElementById('close-lightbox-btn').addEventListener('click', () => {
        document.getElementById('lightbox-modal').style.display = 'none';
        if (window.location.hash === '#modal') {
            window.history.back();
        }
    });

    document.getElementById('lightbox-modal').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox-modal') {
            document.getElementById('lightbox-modal').style.display = 'none';
            if (window.location.hash === '#modal') {
                window.history.back();
            }
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStore);
} else {
    initStore();
}