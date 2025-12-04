---
layout: default
title: Blog
---

## Blog

{% for post in site.posts %}
  <article style="margin-bottom: 2rem;">
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <p class="mono" style="color: var(--color-gray-dark);">{{ post.date | date: "%B %d, %Y" }}</p>
    {% if post.excerpt %}
      <p>{{ post.excerpt }}</p>
    {% endif %}
  </article>
{% endfor %}