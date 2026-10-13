---
layout: default
title: "GitHub repos"
page_class: repos
description: "Explore Gledis Guri's open research code for eDNA quantification, sampling design and fisheries."
---
<section class="page-intro"><p class="eyebrow"><span class="status-dot"></span> Open research / GitHub repos</p><h1>The questions.<br>The code. <em>The possibilities.</em></h1><div class="intro-bottom"><p>A collection of code, models and data exploring what environmental DNA can tell us about the world around us.</p><span class="collection-note">05 repositories<br> One shared curiosity</span></div></section>
<div class="repo-toolbar"><div class="filters" role="group" aria-label="Filter repositories" hidden><button type="button" data-filter="all" aria-pressed="true">All projects <span>05</span></button><button type="button" data-filter="quantification" aria-pressed="false">Quantification</button><button type="button" data-filter="spatial" aria-pressed="false">Spatial & sampling</button><button type="button" data-filter="fisheries" aria-pressed="false">Fisheries</button></div><button class="play-toggle" type="button" aria-pressed="false" hidden><span aria-hidden="true">▷</span> <span data-play-label>Animate figures</span></button></div>
<p class="sr-only" id="filter-status" role="status" aria-live="polite"></p>
<section class="repo-grid" aria-label="Research repositories">{% for repo in site.data.repos %}{% include repo-card.html %}{% endfor %}</section>
<p class="illustration-note">Interactive illustrations inspired by the research themes. Explore each repository for the study data and figures.</p>
<section class="contact-strip"><div><p class="eyebrow">Ideas are better shared</p><h2>Let’s explore a question together.</h2></div><a class="button" href="{{ '/contact' | relative_url }}">Get in touch</a></section>
