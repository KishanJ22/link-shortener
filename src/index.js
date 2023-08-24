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


        const linkModal = document.getElementById("linkModal");
        linkModal.innerHTML = `
        <button id="viewLinkButton" class="btn btn-success mt-5" onclick="my_modal.showModal()">View Links</button>
        <dialog id="my_modal" class="modal modal-bottom sm:modal-middle">
            <form method="dialog" class="modal-box">
                <h3 class="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">Here are your links!</h3>
                <h3 class="font-bold text-transparent text-xl bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 pt-3">Short code: ${code}</h3>
                <ul>
                <li class="mt-5"><a href="${original_link}" target="_blank">Short code 1: ${shortLink1}</a></li>
                <li class="mt-5"><a href="${original_link}" target="_blank">Short code 2: ${shortLink2}</a></li>
                <li class="mt-5"><a href="${original_link}" target="_blank">Short code 3: ${shortLink3}</a></li>
                <li class="mt-5"><a href="${original_link}" target="_blank">Original link: ${original_link}</a></li>
                </ul>
                <div class="modal-action">
                    <button class="btn">Close</button>
                </div>
            </form>
        </dialog>
        `;
        // Creates a modal with link information from the API response

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
            // If the request was unsuccessful, log the error to console based on the error code
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

/*

    Good response:

    ok: true

    result: Object {

        code: "AipMTC"

        full_share_link: "https://shrtco.de/share/AipMTC"

        full_short_link: "https://shrtco.de/AipMTC"

        full_short_link2: "https://9qr.de/AipMTC"

        full_short_link3: "https://shiny.link/AipMTC"

        original_link: "https://www.w3schools.com/js/js_switch.asp"

        share_link: "shrtco.de/share/AipMTC"

        short_link: "shrtco.de/AipMTC"

        short_link2: "9qr.de/AipMTC"

        short_link3: "shiny.link/AipMTC"

    }
*/