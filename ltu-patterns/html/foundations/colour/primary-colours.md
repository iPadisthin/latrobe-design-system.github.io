---
title: Primary
layout: "clean"
colors:
    - name: La Trobe Red
      hex: "#ff0000"
      rgb: rgba(255,0,0)
    - name: Black
      hex: "#000000"
      rgb: rgba(0,0,0)
---

<style>
    .set {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -1rem;
        padding: 0;
        list-style: none;
    }

    li {
        flex: 1 0 20%;
        margin: 1rem;
    }

    .color {
        width: 100%;
        height: 200px;
        color: white;
        border: 1px solid whitesmoke;
        margin-bottom: 1rem;
    }

    p {
        margin: 0;
    }
</style>


<ul class="set">
    {% for item in page.colors %} 
        <li>
            <div class="color" style="background:{{ item.hex }}" data-sketch-color="{{ item.hex }}"></div> 
            
            <p><strong>{{ item.name }}</strong></p>
            
            {% if item.hex %}<p>{{ item.hex }}</p>{% endif %}
            
            {% if item.rgb %}<p>{{ item.rgb }}</p>{% endif %}
        </li>
    {% endfor %}
</ul>
