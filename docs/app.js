(() => {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  const searchInput = $("#search");
  const resourceList = $("#resourceList");
  const workloadInput = $("#workload");
  const envSelect = $("#env");
  const regionSelect = $("#region");
  const instanceSelect = $("#instance");
  const orderSelect = $("#order");
  const resultDiv = $("#result");
  const toggleBulkBtn = $("#toggleBulk");
  const bulkTable = $("#bulkTable");

  let selectedId = null;

  // ── Populate selects ──
  for (const env of ENVIRONMENTS) {
    const opt = document.createElement("option");
    opt.value = env.id;
    opt.textContent = env.label;
    envSelect.appendChild(opt);
  }
  for (const region of REGIONS) {
    const opt = document.createElement("option");
    opt.value = region.id;
    opt.textContent = region.label;
    regionSelect.appendChild(opt);
  }

  // ── Resource list rendering ──
  function renderResourceList(filter = "") {
    const q = filter.trim().toLowerCase();
    resourceList.innerHTML = "";
    let lastCategory = null;
    let shown = 0;

    for (const rt of RESOURCE_TYPES) {
      const haystack = `${rt.name} ${rt.slug} ${rt.category}`.toLowerCase();
      if (q && !haystack.includes(q)) continue;

      if (rt.category !== lastCategory) {
        const header = document.createElement("div");
        header.className = "cat-header";
        header.textContent = rt.category;
        resourceList.appendChild(header);
        lastCategory = rt.category;
      }

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "resource-btn" + (rt.id === selectedId ? " selected" : "");
      btn.innerHTML = `<span>${rt.name}</span><span class="slug">${rt.slug}</span>`;
      btn.addEventListener("click", () => {
        selectedId = rt.id;
        renderResourceList(searchInput.value);
        renderResult();
      });
      resourceList.appendChild(btn);
      shown++;
    }

    if (!shown) {
      const empty = document.createElement("div");
      empty.className = "cat-header";
      empty.textContent = "No services found.";
      resourceList.appendChild(empty);
    }
  }

  // ── Name generation ──
  function sanitizeWorkload(value, rt) {
    let w = value.trim();
    if (rt.lowercase) w = w.toLowerCase();
    if (!rt.dashes) w = w.replace(/-/g, "");
    w = w.replace(/\s+/g, rt.dashes ? "-" : "");
    return w;
  }

  function buildName(rt) {
    const workload = sanitizeWorkload(workloadInput.value, rt);
    const env = envSelect.value;
    const region = regionSelect.value;
    const instance = instanceSelect.value;
    const sep = rt.dashes ? "-" : "";

    let parts;
    if (orderSelect.value === "workload-first") {
      parts = [workload, rt.slug, env, region, instance];
    } else {
      parts = [rt.slug, workload, env, region, instance];
    }
    let name = parts.filter(Boolean).join(sep);
    if (rt.lowercase) name = name.toLowerCase();
    return name;
  }

  function validate(rt, name) {
    const checks = [];
    const lenOk = name.length > 0 && name.length <= rt.maxLen;
    checks.push({
      ok: lenOk,
      label: `Length: ${name.length} / ${rt.maxLen} characters`,
    });

    const patternOk = rt.pattern.test(name);
    checks.push({
      ok: patternOk,
      label: patternOk
        ? "Allowed characters: OK"
        : "Contains characters that are not allowed for this resource type",
    });

    if (rt.lowercase) {
      const lcOk = name === name.toLowerCase();
      checks.push({ ok: lcOk, label: "Lowercase only: " + (lcOk ? "OK" : "name contains uppercase characters") });
    }

    return { valid: checks.every((c) => c.ok), checks };
  }

  // ── Result rendering ──
  function renderResult() {
    const rt = RESOURCE_TYPES.find((r) => r.id === selectedId);
    if (!rt) {
      resultDiv.className = "result-empty";
      resultDiv.textContent = "Select a service above first.";
      return;
    }

    const name = buildName(rt);
    const { valid, checks } = validate(rt, name);

    resultDiv.className = "";
    resultDiv.innerHTML = "";

    const meta = document.createElement("div");
    meta.className = "meta-row";
    meta.innerHTML = `
      <span>Service: <strong>${rt.name}</strong></span>
      <span>CAF prefix: <strong>${rt.slug}</strong></span>
      <span>Max length: <strong>${rt.maxLen}</strong></span>
      <span>Hyphens: <strong>${rt.dashes ? "allowed" : "not allowed"}</strong></span>
      <span>Lowercase only: <strong>${rt.lowercase ? "yes" : "no"}</strong></span>`;
    resultDiv.appendChild(meta);

    const nameRow = document.createElement("div");
    nameRow.className = "generated-name";
    const code = document.createElement("code");
    code.textContent = name || "(empty)";
    const copyBtn = document.createElement("button");
    copyBtn.className = "btn";
    copyBtn.textContent = "Copy";
    copyBtn.addEventListener("click", () => copyToClipboard(name));
    nameRow.append(code, copyBtn);
    resultDiv.appendChild(nameRow);

    const list = document.createElement("ul");
    list.className = "checks";
    for (const check of checks) {
      const li = document.createElement("li");
      li.innerHTML = `<span class="${check.ok ? "ok" : "err"}">${check.ok ? "✔" : "✖"}</span> ${check.label}`;
      list.appendChild(li);
    }
    if (!valid) {
      const li = document.createElement("li");
      li.innerHTML = `<span class="err">⚠ This name is not valid for ${rt.name}. Adjust the components.</span>`;
      list.appendChild(li);
    }
    resultDiv.appendChild(list);

    if (rt.note) {
      const note = document.createElement("div");
      note.className = "note";
      note.textContent = "ℹ️ " + rt.note;
      resultDiv.appendChild(note);
    }
  }

  // ── Bulk overview ──
  function renderBulkTable() {
    const rows = RESOURCE_TYPES.map((rt) => {
      const name = buildName(rt);
      const { valid } = validate(rt, name);
      return `<tr>
        <td>${rt.name}</td>
        <td><code class="${valid ? "" : "invalid"}">${name}</code></td>
        <td>${valid ? "✔" : "✖ invalid"}</td>
        <td class="copy-cell" data-name="${name}">copy</td>
      </tr>`;
    }).join("");

    bulkTable.innerHTML = `<table>
      <thead><tr><th>Service</th><th>Generated name</th><th>Valid</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;

    bulkTable.querySelectorAll(".copy-cell").forEach((cell) => {
      cell.addEventListener("click", () => copyToClipboard(cell.dataset.name));
    });
  }

  // ── Clipboard + toast ──
  let toastTimer;
  function copyToClipboard(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => showToast(`Copied: ${text}`));
  }
  function showToast(message) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
  }

  // ── Theme toggle ──
  const themeToggle = $("#themeToggle");
  function applyThemeIcon() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    themeToggle.textContent = dark ? "☀️" : "🌙";
  }
  themeToggle.addEventListener("click", () => {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    applyThemeIcon();
  });
  applyThemeIcon();

  // ── Events ──
  searchInput.addEventListener("input", () => renderResourceList(searchInput.value));
  for (const el of [workloadInput, envSelect, regionSelect, instanceSelect, orderSelect]) {
    el.addEventListener("input", () => {
      renderResult();
      if (!bulkTable.classList.contains("hidden")) renderBulkTable();
    });
  }
  toggleBulkBtn.addEventListener("click", () => {
    const hidden = bulkTable.classList.toggle("hidden");
    toggleBulkBtn.textContent = hidden ? "Show full overview" : "Hide overview";
    if (!hidden) renderBulkTable();
  });

  // ── Init ──
  renderResourceList();
  renderResult();
})();
