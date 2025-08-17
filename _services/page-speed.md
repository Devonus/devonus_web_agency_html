---
layout: services
title: Devonus Web Agency | SEO Services
permalink: /page-speed/
meta_description: Boost your online visibility and attract more customers with our expert SEO services. We help your business rank higher on search engines and dominate the competition.
page_title: Search Engine Optimization (SEO) Services
page_description: We offer professional SEO services designed to significantly increase your website's visibility and drive targeted organic traffic. Through proven strategies and ongoing optimization, we help your business achieve top rankings on Google and other search engines, ensuring potential customers easily find you.
services_entry: we provide
services: seo services
dictionary: SEO /ɛs i oʊ/
---


<div class="container">
  <h1>{{ page.page_title }}</h1>
  <p>{{ page.page_description }}</p>

  <!-- URL input -->
  <input type="url" id="websiteUrl" placeholder="https://example.com" required>

  <!-- Optional email capture -->
  <input type="email" id="email" placeholder="Enter your email (optional)">

  <!-- Run audit button -->

<button id="auditBtn">Run Audit</button>

  <!-- Results will appear here -->
  <div id="results"></div>
</div>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
}

.container {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 600px;
}

h1, h2 {
  text-align: center;
  margin-bottom: 1rem;
}

input[type="url"], input[type="email"] {
  width: calc(100% - 1rem);
  padding: 0.5rem;
  margin-bottom: 0.8rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 0.6rem;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

button:hover {
  background: #0056b3;
}

#results {
  margin-top: 1rem;
}

.metric {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

label {
  font-weight: bold;
}
</style>

<script>
document.getElementById('auditBtn').addEventListener('click', async () => {
  const targetUrl = document.getElementById('websiteUrl').value.trim();
  const email = document.getElementById('email').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (!targetUrl) {
    alert('Please enter a website URL.');
    return;
  }

  // Optional: capture email here for leads
  if (email) {
    console.log(`Lead captured: ${email}, site: ${targetUrl}`);
    // You can integrate with Netlify Forms, Airtable, or Google Sheets here
  }

  resultsDiv.innerHTML = '<p>Loading audit results...</p>';

  try {
    const response = await fetch(`/.netlify/functions/pageAudit?url=${encodeURIComponent(targetUrl)}`);
    const json = await response.json();

    resultsDiv.innerHTML = '';

    const pageTitle = document.createElement('h2');
    pageTitle.textContent = `Audit Results for ${targetUrl}`;
    resultsDiv.appendChild(pageTitle);

    // CrUX Metrics
    const cruxHeader = document.createElement('h3');
    cruxHeader.textContent = 'Chrome User Experience Report (CrUX)';
    resultsDiv.appendChild(cruxHeader);

    const cruxMetrics = json.loadingExperience?.metrics || {};
    for (const metric in cruxMetrics) {
      const div = document.createElement('div');
      div.className = 'metric';
      div.textContent = `${metric}: ${cruxMetrics[metric].category || 'N/A'}`;
      resultsDiv.appendChild(div);
    }

    // Lighthouse Metrics
    const lhHeader = document.createElement('h3');
    lhHeader.textContent = 'Lighthouse Results';
    resultsDiv.appendChild(lhHeader);

    const lhMetrics = json.lighthouseResult?.audits || {};
    const metricsToShow = [
      'first-contentful-paint',
      'speed-index',
      'largest-contentful-paint',
      'total-blocking-time',
      'interactive'
    ];

    metricsToShow.forEach(key => {
      const div = document.createElement('div');
      div.className = 'metric';
      div.textContent = `${lhMetrics[key]?.title || key}: ${lhMetrics[key]?.displayValue || 'N/A'}`;
      resultsDiv.appendChild(div);
    });

  } catch (error) {
    resultsDiv.innerHTML = `<p style="color:red;">Failed to fetch PageSpeed data: ${error.message}</p>`;
    console.error(error);
  }
});
</script>
