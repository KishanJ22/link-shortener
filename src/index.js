let shortButton = document.getElementById("shorten");
// Gets the short button from index.html

shortButton.addEventListener("click", short);
// Adds an event listener to the short button so that it runs the short function when clicked

const toasts = document.getElementById("toasts");
// Gets the toasts div from index.html so that it can be used to display notifications

function removeToast() {
    toasts.innerHTML = "";
    // Removes the toast from the DOM
}

function copyLink(link) {
    let string = "";
    string += link;
    navigator.clipboard.writeText(string);
    // Writes the link to the clipboard
    toasts.innerHTML = `
    <div class="toast toast-end toast-end mt-9 mr-5 transition ease-out">
        <div class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Link copied!</span>
        </div>
    </div>
    `;
    // Creates a toast to notify the user that the link was copied successfully
    setTimeout(removeToast, 5000);
    // Removes the toast after 5 seconds
}

function copyCode(code) {
    let string = "";
    string += code;
    navigator.clipboard.writeText(string);
    // Writes the code to the clipboard
    toasts.innerHTML = `
    <div class="toast toast-end toast-end mt-9 mr-5 transition ease-out">
        <div class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Code copied!</span>
        </div>
    </div>
    `;
    // Creates a toast to notify the user that the code was copied successfully
    setTimeout(removeToast, 5000);
    // Removes the toast after 5 seconds
}

async function short() {
    let url = document.getElementById("long_url").value;
    // Gets the value of the long_url input

    const result = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    // Sends a request to the shrtcode API with the url variable passed in as a parameter

    const data = await result.json();
    // Gets the result of the request and converts it to JSON object

    try {
        const shortLink1 = data.result.short_link;
        const shortLink2 = data.result.short_link2;
        const shortLink3 = data.result.short_link3;
        const code = data.result.code;
        const original_link = data.result.original_link;
        // Gets the short links, code, and original link from the API response JSON object

        const linkModal = document.getElementById("linkModal");
        linkModal.innerHTML = `
        <button id="viewLinkButton" class="btn btn-success mt-5" onclick="my_modal.showModal()">View Links</button>
        <dialog id="my_modal" class="modal modal-bottom sm:modal-middle">
            <form method="dialog" class="modal-box">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 class="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">Here are your links!</h3>
                <h3 id="linkCode" class="font-bold text-transparent text-xl bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 pt-3">Short code: ${code}</h3>
                <div class="pt-3">
                    <button class="btn btn-circle btn-outline" onclick=copyCode('${code}')>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                    </button>
                </div>
                <ul>
                <li class="mt-5 flex-center space-x-5">
                    <a id="shortLink1" href="${original_link}" target="_blank">Short code 1: ${shortLink1}</a>
                    <button class="btn btn-circle btn-outline" onclick=copyLink('${shortLink1}')>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                    </button>
                </li>
                <li class="mt-5 flex-center space-x-5">
                    <a href="${original_link}" target="_blank">Short code 2: ${shortLink2}</a>
                    <button class="btn btn-circle btn-outline" onclick=copyLink('${shortLink2}')>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                    </button>
                </li>
                <li class="mt-5 flex-center space-x-5">
                    <a href="${original_link}" target="_blank">Short code 3: ${shortLink3}</a>
                    <button class="btn btn-circle btn-outline" onclick=copyLink('${shortLink3}')>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                    </button>
                </li>
                <li class="mt-5">
                    <a href="${original_link}" target="_blank">Original link: ${original_link}</a>
                </li>
                </ul>
            </form>
        </dialog>
        `;
        // Creates a modal with links from the API response and a button for each link to copy it to the clipboard

        toasts.innerHTML = `
        <div class="toast toast-end toast-end mt-9 mr-5 transition ease-out">
            <div class="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Link shortened successfully!</span>
            </div>
        </div>
        `;
        // Creates a toast to notify the user that the link was shortened successfully

        setTimeout(removeToast, 5000);
    }
    catch(error) {
        if(document.getElementById("viewLinkButton")) {
            document.getElementById("viewLinkButton").remove();
            // Removes the view link button if it exists so that it doesn't show up when there is an error
        }
        switch (data.error_code) {
            // Switch statement to handle different error codes
            // A toast is created for each error code to inform the user of the error
            // Each toast is removed after 5 seconds
            case 1:
                toasts.innerHTML = `
            <div class="toast toast-end toast-end mt-9 mr-5">
                <div class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>No URL specified.</span>
                </div>
            </div>
            `;
            setTimeout(removeToast, 5000);
                break;
            case 2:
                toasts.innerHTML = `
            <div class="toast toast-end toast-end mt-9 mr-5">
                <div class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Invalid URL submitted.</span>
                </div>
            </div>
            `;
            setTimeout(removeToast, 5000);
                break;
            case 3:
                toasts.innerHTML = `
            <div class="toast toast-end toast-end mt-9 mr-5">
                <div class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Rate limit reached.</span>
                </div>
            </div>
            `;
                break;
            case 4:
                toasts.innerHTML = `
            <div class="toast toast-end toast-end mt-9 mr-5">
                <div class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>IP blocked.</span>
                </div>
            </div>
            `;
            setTimeout(removeToast, 5000);
                break;
            case 5:
                toasts.innerHTML = `
            <div class="toast toast-end toast-end mt-9 mr-5">
                <div class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Shortcode already in use. Please try again.</span>
                </div>
            </div>
            `;
            setTimeout(removeToast, 5000);
                break;
            case 6:
                toasts.innerHTML = `
            <div class="toast toast-end toast-end mt-9 mr-5">
                <div class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Unknown error. Please try again.</span>
                </div>
            </div>
            `;
            setTimeout(removeToast, 5000);
                break;
            case 10:
                toasts.innerHTML = `
            <div class="toast toast-end toast-end mt-9 mr-5">
                <div class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>You tried to shorten a disallowed link. Please shorten a different link.</span>
                </div>
            </div>
            `;
            setTimeout(removeToast, 5000);
                break;
        }
    }
}
