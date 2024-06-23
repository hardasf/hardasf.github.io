// oten.js

var condition = true;

if (condition) {
    document.getElementById('facebook-container').innerHTML = `
        <div class="fb-page-container">
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fleechshares&amp;tabs=timeline&amp;width=300&amp;height=300&amp;small_header=false&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=true&amp;appId" width="300" height="300" style="border:none;overflow:hidden;border-radius: 8px;" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>
    `;
} else {
    document.getElementById('facebook-container').innerHTML = `
        <p>Alternative content goes here.</p>
    `;
}