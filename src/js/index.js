var list = document.querySelector('#list');
var xml = new XMLHttpRequest();
xml.open('get', '/api/list', true);
xml.onreadystatechange = function() {
    if (xml.readyState === 4) {
        if (xml.status === 200) {
            var data = JSON.parse(xml.responseText);
            if (data.code === 0) {
                var html = "";
                data.msg.forEach(function(item) {
                    html += `<li>
                                <input type="text" placeholder="NO file selected...">
                                <p style="background: ${item.color}">Browser...</p>
                            </li>`;
                });
                list.innerHTML = html;
            }
        }
    }
}
xml.send();