/**
 * Return iframe window object 
 */
function getIframeWindow(iframeEl) {
    let doc;
    if (iframeEl.contentWindow) {
        return iframeEl.contentWindow;
    }
    if (iframeEl.window) {
        return iframeEl.window;
    }
    if (!doc && iframeEl.contentDocument) {
        doc = iframeEl.contentDocument;
    }
    if (!doc && iframeEl.document) {
        doc = iframeEl.document;
    }
    if (doc && doc.defaultView) {
        return doc.defaultView;
    }
    if (doc && doc.parentWindow) {
        return doc.parentWindow;
    }
    return undefined;
}

/**
 * Handle iframe events.
 * Each event has `callbackType` and `data` attributes. You can find the details in the documentation.
 * @param event - event object when an action is completed on iframe or an error happens or a data is being passed from iframe.
 */
function handleMessage(event) {
    const data = JSON.stringify(event.data);
    console.log(data);

    if (event.data.callbackType === 'Production') {
        /**
         * event.data.data = {
         *  yearlyProduction,
         *  monthlyProduction,
         *  numTotalPanels,
         *  numSelectedPanels,
         *  systemSize,
         * }
         */
        $('#production').val(event.data.data.yearlyProduction);
    }

    if (event.data.callbackType === 'NewLead') {
        $('#lead-id').val(event.data.data);
    }

    if (event.data.callbackType === 'NewProposal') {
        $('#proposal-id').val(event.data.data);
    }

    if (event.data.callbackType === 'Error') {
        $('#message-box').text(data);
    }
}

/**
 * This function is used to send messages from client to the iframe window.
 * The details of acceptable messages are available in documentation.
 * @param msg - message
 */
function sendMessage(msg) {
    const el = document.getElementById('aerialytic-iframe');
    const iframeWindow = getIframeWindow(el);
    iframeWindow.postMessage(msg, '*');
}

/**
 * function to load lead in designer
 */

function loadLead() {
    const uid = $('#lead-id').val();

    try {
        sendMessage({
            cmd: 'designer.LoadLead',
            params: { uid }
        });
    } catch (err) {
        console.log(err);
    }
}

/**
 * function to create a new proposal
 */

function createProposal() {
    try {
        sendMessage({
            cmd: 'designer.CreateProposal',
            params: { }
        });
    } catch (err) {
        console.log(err);
    }
}
