const state = {
    horizontal: {
        isChanged: false,
        isStretch: false,
        initValues: {}
    },
    vertical: {
        isChanged: false,
        isStretch: false,
        initValues: {}
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "fetchContentData") {
            const container = document.querySelectorAll('[data-comp="mobile.core.components.Container"]')[0]
            const containerSize = {width: container.offsetWidth, height: container.offsetHeight}
            sendResponse({
                state,
                containerSize
            });
        }
    }
);

chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.type == "setContainerSize") {
            const {width, height} = request.value;

            const container = document.querySelectorAll('[data-comp="mobile.core.components.Container"]')[0]
            const containerInlineContent = document.getElementById(`${container.id}inlineContent`)
            const containerGridContainer = document.getElementById(`${container.id}inlineContent-gridContainer`)

            containerInlineContent.style.width = `${width}px`
            containerGridContainer.style.minHeight = `unset`
            containerGridContainer.style.height = `${height}px`
        }
    }
);

chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.type == "setIsCompHStretch") {
            const container = document.querySelectorAll('[data-comp="mobile.core.components.Container"]')[0]
            const comp = container.querySelector('[data-comp]')

            const isStretch = request.value
            const compComputedStyle = getComputedStyle(comp)

            if (!state.horizontal.isChanged) {
                state.horizontal = {
                    isChanged: true,
                    isStretch,
                    initValues: {
                        width: compComputedStyle.width,
                        left: compComputedStyle.left
                    }
                }
            }

            if (isStretch) {
                comp.style.width = '100%';
                comp.style.left = '0'
            } else {
                comp.style.width = state.horizontal.initValues.width;
                comp.style.left = state.horizontal.initValues.left
            }
        }
    }
);

chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.type == "setIsCompVStretch") {
            const container = document.querySelectorAll('[data-comp="mobile.core.components.Container"]')[0]
            const comp = container.querySelector('[data-comp]')
            const isStretch = request.value
            const compComputedStyle = getComputedStyle(comp)

            if (!state.vertical.isChanged) {
                state.vertical = {
                    isChanged: true,
                    isStretch,
                    initValues: {
                        height: compComputedStyle.height,
                        top: compComputedStyle.top,
                        margin: compComputedStyle.margin
                    }
                }
            }

            if (isStretch) {
                comp.style.height = '100%';
                comp.style.top = '0'
                comp.style.margin = '0'
            } else {
                comp.style.height = state.vertical.initValues.height;
                comp.style.top = state.vertical.initValues.top
                comp.style.margin = state.vertical.initValues.margin
            }
        }
    }
);
