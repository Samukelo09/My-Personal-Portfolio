document.addEventListener('DOMContentLoaded', () => {
    
    // --- Tabs Logic ---
    window.opentab = function (tabname, element) {
        const tablinks = document.getElementsByClassName("tab-link");
        const tabcontents = document.getElementsByClassName("tab-contents");
        
        for (const t of tablinks) t.classList.remove("active-link");
        for (const c of tabcontents) c.classList.remove("active-tab");
        
        element.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    };

    // --- Mobile Menu Logic ---
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

    // Close on Click Outside/Links
    if (sidemenu) {
        sidemenu.addEventListener("click", (e) => {
            if (e.target.tagName === "A" || e.target.classList.contains("fa-xmark")) {
                closemenu();
            }
        });
    }

    // --- Contact Form (Google Sheets) ---
    const scriptURL = "https://script.google.com/macros/s/AKfycbxLx_JUk767YICdG6XYkvzeAmo0_jErWxiwoCKR0TtkXAC9BrrVa0vbNaHisTbUi3_4/exec";
    const form = document.forms["submit-to-google-sheet"];
    const statusMsg = document.getElementById("statusMsg");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            }

            try {
                const res = await fetch(scriptURL, { method: "POST", body: new FormData(form) });
                if (!res.ok) throw new Error("Network response was not ok");
                
                if (statusMsg) {
                    statusMsg.style.color = "#64ffda";
                    statusMsg.textContent = "Message sent successfully!";
                }
                form.reset();
            } catch (err) {
                console.error("Error!", err);
                if (statusMsg) {
                    statusMsg.style.color = "#ff6b6b";
                    statusMsg.textContent = "Error sending message. Please try again.";
                }
            } finally {
                setTimeout(() => { if (statusMsg) statusMsg.textContent = ""; }, 5000);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Send Message";
                }
            }
        });
    }

    // --- Scroll Reveal Animation ---
    const toReveal = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    io.unobserve(e.target); // Only animate once
                }
            });
        }, observerOptions);
        
        toReveal.forEach(el => io.observe(el));
    } else {
        toReveal.forEach(el => el.classList.add('revealed'));
    }

    // --- Typewriter Effect ---
    const tw = document.querySelector('.typewriter');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (tw && !reduceMotion) {
        const text = tw.getAttribute('data-text');
        tw.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                tw.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        // Start typing after a slight delay
        setTimeout(type, 500);
    }
});
