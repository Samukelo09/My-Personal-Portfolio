document.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tablinks = document.getElementsByClassName("tab-link");
    const tabcontents = document.getElementsByClassName("tab-contents");
    window.opentab = function (tabname, element) {
        for (const t of tablinks) t.classList.remove("active-link");
        for (const c of tabcontents) c.classList.remove("active-tab");
        element.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    };

    // Mobile menu
    const sidemenu = document.getElementById("sidemenu");
    const burger = document.querySelector(".fa-bars");
    window.openmenu = function () {
        if (!sidemenu) return;
        sidemenu.style.right = "0";
        if (burger) burger.setAttribute("aria-expanded", "true");
    };
    window.closemenu = function () {
        if (!sidemenu) return;
        sidemenu.style.right = "-200px";
        if (burger) burger.setAttribute("aria-expanded", "false");
    };
    // Close on Esc
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closemenu();
    });
    // Close menu when clicking a nav link (small screens)
    if (sidemenu) {
        sidemenu.addEventListener("click", (e) => {
            if (e.target.tagName === "A") closemenu();
        });
    }

// Form → Google Apps Script
const scriptURL = "https://script.google.com/macros/s/AKfycbxLx_JUk767YICdG6XYkvzeAmo0_jErWxiwoCKR0TtkXAC9BrrVa0vbNaHisTbUi3_4/exec";
const form = document.forms["submit-to-google-sheet"];
const statusMsg = document.getElementById("statusMsg");
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        try {
            const res = await fetch(scriptURL, { method: "POST", body: new FormData(form) });
            if (!res.ok) throw new Error("Network response was not ok");
            if (statusMsg) statusMsg.textContent = "Message sent successfully";
            form.reset();
        } catch (err) {
            console.error("Error!", err);
            if (statusMsg) statusMsg.textContent = "Something went wrong. Please try again.";
        } finally {
            setTimeout(() => { if (statusMsg) statusMsg.textContent = ""; }, 5000);
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

// ================================
// Scroll Reveal (IntersectionObserver)
// ================================
const toReveal = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    toReveal.forEach(el => io.observe(el));
} else {
    toReveal.forEach(el => el.classList.add('revealed'));
}

// ================================
// Typewriter Effect (respects reduced motion)
// ================================
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const tw = document.querySelector('.typewriter');
if (tw) {
    const full = tw.getAttribute('data-text') || tw.textContent;
    if (reduceMotion) {
        tw.textContent = full;
    } else {
        tw.textContent = '';
        let i = 0;
        const speed = 80; // ms per char
        (function type() {
            if (i <= full.length) {
                tw.textContent = full.slice(0, i);
                i++;
                setTimeout(type, speed);
            }
        })();
    }
}
});


