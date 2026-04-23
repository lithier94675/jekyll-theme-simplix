(function() {
	"use strict";

	// Initialize polyfill for IE
	const iedoc = document.documentMode;
	NodeList.prototype.filter = Array.prototype.filter;
	if(iedoc) NodeList.prototype.forEach = Array.prototype.forEach, Element.prototype.closest = function(s) {
		let e = this;
		while(e) {
			e = e.parentElement;
			if(!e || e.msMatchesSelector(s)) return e;
		}
	};

	// Initialize page theme
	let th = document.querySelector(".btn__theme-toggle"), th_dark = window.matchMedia("(prefers-color-scheme: dark)"), th_match = th_dark && th_dark.matches, th_val = sessionStorage.getItem("theme"), th_ev = function(v) {
		const t = (th_match = v) ? "dark" : "light";
		document.body.id = "main__theme-" + t;
		sessionStorage.setItem("theme", t);
	};
	if(th_dark) th_dark.onchange = function() {th_ev(th_dark.matches)};
	th.onclick = function() {th_ev(!th_match)};
	document.body.id = "main__theme-" + (th_val == "dark" || th_val == "light" ? th_val : th_match ? "dark" : "light");

	// Initialize navigation menu
	const nav = document.querySelector("nav"), nav_btn = nav.querySelector("button"), nav_links = nav.querySelector(".nav__links"), nav_ev = function() {if(nav.classList.contains("nav__multi")) nav_btn.innerHTML = nav.classList.toggle("nav__open") ? "\ue4f6 Close" : "\ue2f0 Menu"};
	nav.style.display = "flex";
	nav_btn.onclick = function() {
		nav_ev();
		navigator.userAgentData.mobile && history.pushState(null, null, window.location.pathname);
	};
	nav_links.onclick = function(e) {e.target.tagName != "a" && nav_ev()};
	navigator.userAgentData && navigator.userAgentData.mobile ? window.onpopstate = nav_ev : nav_links.addEventListener("wheel", function(e) {
		if(window.innerWidth >= 768) {
			e.preventDefault();
			nav_links.scrollLeft += e.deltaY;
		}
	});

	// Initialize \"Scroll to top\" button
	function scroll_ev() {
		const e = document.querySelector("header"), r = e.getBoundingClientRect(), h = window.innerHeight;
		if(document.body.clientHeight > h && (r.bottom <= h * .2) != document.body.classList.contains("main__scroll-down")) document.body.classList.toggle("main__scroll-down");
	}
	window.onscroll = scroll_ev;
	window.onresize = scroll_ev;
	if(window.screen.orientation) window.screen.orientation.onchange = scroll_ev;

	// Add miscellaneous things to HTML elements
	const link = function(a) {
		const e = new RegExp("^((https?|mailto|tel):)?\\/*(.+@)?(www\\.)?([a-z\\d.-]+)?.*$", "gi").exec(a.href);
		if(e && e[5] != location.hostname) a.target = "_blank";
	}, ic = {
		note: "info",
		tip: "lightbulb",
		important: "chat",
		warning: "warning",
		caution: "siren"
	};
	document.querySelectorAll("a").forEach(link);
	document.querySelectorAll("a.footnote").forEach(function(f) {f.innerText = "[" + f.innerText + "]"});
	document.querySelectorAll("a.reversefootnote").forEach(function(r) {r.innerHTML = "<i class=\"ph ph-arrow-u-up-left\"></i>"});
	document.querySelectorAll("blockquote").forEach(function(b) {
		const e = b.firstElementChild;
		if(e) {
			const r = new RegExp("^\\[!(note|tip|important|warning|caution)\\]($| )", "i").exec(e.innerText.trim());
			if(r) {
				b.classList.add("quote__alert-" + r[1].toLowerCase());
				b.insertAdjacentHTML("afterbegin", "<p class=\"quote__alert-title\">" + r[1].charAt(0).toUpperCase() + r[1].slice(1).toLowerCase() + "</p>");
				e.innerHTML = e.innerHTML.replace(new RegExp("^\\[!(note|tip|important|warning|caution)\\]", "i"), "").trim();
			}
		}
	});
	document.querySelectorAll("details").forEach(function(d) {
		let s = d.querySelector("summary");
		if(!s) {
			s = document.createElement("summary");
			d.insertBefore(s, d.firstChild);
		}
		s.insertAdjacentHTML("afterbegin", "<i class=\"ph ph-caret-right\"></i>");
		if(iedoc) s.onclick = function() {d.open = !d.hasAttribute("open")};
	});

	document.querySelectorAll("pre").filter(function(e) {for(let i = 0, ch = e.children[i]; i < e.children.length; i++, ch = e.children[i]) if(ch.tagName == "CODE") return true; return false}).forEach(function(pre) {
		const code = (pre.closest("figure.highlight") ? pre.querySelector("table.rouge-table td.code > pre") : pre.querySelector("code")).textContent, code_par = pre.closest("div.highlighter-rouge") || pre.querySelector("code"), code_lang_regex = code_par.classList.length > 0 ? new RegExp("^language-(.+)$").exec(code_par.classList[0]) : null, code_lang = code_lang_regex && code_lang_regex.length > 1 ? code_lang_regex[1] : "plaintext";

		const code_top = document.createElement("div");
		code_top.className = "code__top";
		code_top.insertAdjacentHTML("afterbegin", "<span>" + code_lang + "</span>");

		const code_copy = document.createElement("button"), code_copy_reset = function() {
			code_copy.className = "";
			code_copy.innerText = "\ue1ca";
			code_copy.title = "Copy";
		}, code_copy_ev = function(b) {
			const c = b ? "code__copy-ok" : "code__copy-bad";
			code_copy.classList.toggle(c);
			code_copy.classList.toggle("code__copy-na");
			code_copy.innerText = b ? "\ue182" : "\ue4f6";
			code_copy.title = b ? "Copied!" : "Error!";
			setTimeout(code_copy_reset, 1500);
		};
		code_copy_reset();
		code_copy.onclick = function() {if(!this.classList.contains("code__copy-na")) iedoc ? window.clipboardData.setData("Text", code) : navigator.clipboard.writeText(code).then(function() {code_copy_ev(true)}, function() {code_copy_ev(false)})};

		if(!iedoc) {
			// Initialize HTML/Markdown/ABCJS/Mermaid code preview
			let abc = 0, preview_init = function(e) {
				const code_preview = document.createElement("button");
				code_preview.innerText = "\ue220";
				code_preview.title = "Show source code/ preview";
				code_preview.onclick = function() {this.innerText = pre.classList.toggle("code__preview") ? "\ue1bc" : "\ue220"};
				code_top.appendChild(code_preview);

				if(!e) e = document.createElement("div");
				e.classList.add("code__preview-container");
				pre.appendChild(e);
				return e;
			}, str64_encoder = new TextEncoder(), str64 = function(s) {return btoa(String.fromCharCode.apply(null, pako.deflate(str64_encoder.encode(s), {level: 9}))).replace(new RegExp("\\+", "g"), "-").replace(new RegExp("\\/", "g"), "_")}, min_opts = {
				minifyCSS: true,
				minifyJS: true,
				removeComments: true,
				collapseWhitespace: true,
				conservativeCollapse: false,
				preserveLineBreaks: false
			};
			switch(code_lang) {
			case "html":
				const f = document.createElement("iframe");
				HTMLMinifier.minify(code, min_opts).then(function(t) {f.srcdoc = t});
				preview_init(f).onload = function() {this.contentDocument.querySelectorAll("a").forEach(function(a) {a.target = "_blank", a.rel = "noopener noreferrer"})};
				break;

			case "md":
			case "markdown":
				const d = document.createElement("div");
				HTMLMinifier.minify(DOMPurify.sanitize(marked.parse(code)), min_opts).then(function(t) {d.innerHTML = t});
				d.querySelectorAll("a").forEach(link);
				preview_init(d);
				break;

			case "abc":
			case "abcjs":
				const id = (++abc).toString();
				preview_init(null).innerHTML = "<div id=\"paper" + id + "\"></div><div id=\"audio" + id + "\" class=\"synth\"></div>";
				const p = ABCJS.renderAbc("paper" + id, code, {responsive: "resize"})[0];

				if(ABCJS.synth.supportsAudio()) {
					const c = new ABCJS.synth.SynthController();
					c.load("#audio" + id, null, {
						displayPlay: true,
						displayProgress: true,
						displayClock: true
					});
					c.disable(true);
	
					const a = new ABCJS.synth.CreateSynth();
					a.init({visualObj: p}).then(function() {c.setTune(p, true)});
				}
				break;

			case "mermaid":
			case "mmd":
				const img_mmd = document.createElement("img");
				img_mmd.src = "https://kroki.io/mermaid/svg/" + str64(code);
				preview_init(img_mmd);
				break;

			case "plantuml":
			case "puml":
			case "uml":
				const img_uml = document.createElement("img");
				img_uml.src = "https://kroki.io/plantuml/svg/" + str64(code);
				preview_init(img_uml);

			}
		}

		code_top.appendChild(code_copy);
		pre.insertBefore(code_top, pre.firstChild);
	});

	if(!iedoc) {
		// Render KaTeX expressions and Mermaid graphs
		document.querySelectorAll(".abcjs-inline-audio .abcjs-btn").forEach(function(i) {i.innerHTML = ""});
		renderMathInElement(document.querySelector('[role="main"]'), {
			delimiters: [
				{left: "$$", right: "$$", display: true},
				{left: "$", right: "$", display: false},
				{left: "\\(", right: "\\)", display: false},
				{left: "\\[", right: "\\]", display: true},
				{left: "\\begin{equation}", right: "\\end{equation}", display: true},
				{left: "\\begin{align}", right: "\\end{align}", display: true},
				{left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
				{left: "\\begin{gather}", right: "\\end{gather}", display: true},
				{left: "\\begin{CD}", right: "\\end{CD}", display: true}
			],
			throwOnError: true
		});
	}
})();
