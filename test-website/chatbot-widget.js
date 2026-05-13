(function () {

    // Create floating button
    const button = document.createElement("div");

    button.innerHTML = "💬";

    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.width = "60px";
    button.style.height = "60px";
    button.style.background = "#007bff";
    button.style.color = "white";
    button.style.borderRadius = "50%";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.fontSize = "30px";
    button.style.cursor = "pointer";
    button.style.zIndex = "9999";

    document.body.appendChild(button);


    // Create iframe container
    const iframeContainer = document.createElement("div");

    iframeContainer.style.position = "fixed";
    iframeContainer.style.bottom = "90px";
    iframeContainer.style.right = "20px";
    iframeContainer.style.width = "350px";
    iframeContainer.style.height = "500px";
    iframeContainer.style.display = "none";
    iframeContainer.style.zIndex = "9999";


    // Create iframe
    const iframe = document.createElement("iframe");

    iframe.src = "http://127.0.0.1:5000/";

    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.borderRadius = "10px";
    iframe.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";

    iframeContainer.appendChild(iframe);

    document.body.appendChild(iframeContainer);


    // Toggle open/close
    button.onclick = function () {

        if (iframeContainer.style.display === "none") {

            iframeContainer.style.display = "block";

        } else {

            iframeContainer.style.display = "none";
        }
    };

})();