/**
 * Created by ddavison on 1/11/16.
 */

(function () {
    window.complete = function (item) {
        if (!isCompleted(item))
            item.style.setProperty("text-decoration", "line-through", null);
        else
            item.style.setProperty("text-decoration", "", null);
    };

    var isCompleted = function (item) {
        return (item.style.getPropertyValue("text-decoration") == "line-through");
    };

    //simple XHR request in pure JavaScript
    var load = function (url, callback) {
        var xhr;

        if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
        else {
            var versions = ["MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"];

            for(var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch(e){}
            } // end for
        }

        xhr.onreadystatechange = ensureReadiness;

        function ensureReadiness() {
            if(xhr.readyState < 4) {
                return;
            }

            if(xhr.status !== 200) {
                return;
            }

            // all is well
            if(xhr.readyState === 4) {
                callback(xhr);
            }
        }

        xhr.open('GET', url, true);
        xhr.send('');
    };

    window.loadAllPoints = function() {
        load('points.json', function(xhr) {
            var result = JSON.parse(xhr.responseText);

            var parent = document.getElementById("points");

            for (var i = 0; i <= result.length -1; i++) {
                var newPoint = document.createElement("li");
                newPoint.textContent = result[i];
                newPoint.setAttribute("onclick", "window.complete(this)");
                parent.appendChild(newPoint);
            }

        });
    };
})();