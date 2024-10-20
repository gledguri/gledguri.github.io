// Example Lunr.js search setup
var idx = lunr(function () {
  this.field('title');
  this.field('content');
  this.ref('id');

  {% for page in site.pages %}
    this.add({
      title: {{ page.title | jsonify }},
      content: {{ page.content | strip_html | jsonify }},
      id: {{ forloop.index }}
    });
  {% endfor %}
});

function search(query) {
  return idx.search(query);
}