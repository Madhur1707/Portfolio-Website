const CHAT_API_URL = '/api/chat';
const MAX_RETRY_ATTEMPTS = 1;
const DEFAULT_RETRY_DELAY_MS = 40000;
const MAX_RETRY_DELAY_MS = 60000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getRetryDelayMs(message) {
    const retryMatch = message?.match(/retry\s+in\s+(\d+)\s*s/i);
    const retrySeconds = retryMatch ? Number(retryMatch[1]) : null;

    if (!retrySeconds) {
        return DEFAULT_RETRY_DELAY_MS;
    }

    return Math.min(retrySeconds * 1000, MAX_RETRY_DELAY_MS);
}

function getFriendlyError(status, message) {
    if (status === 429) {
        return 'Rate-limited. Please wait a moment and try again.';
    }

    if (status === 503) {
        return 'Gemini is unavailable right now. Please try again shortly.';
    }

    if (status >= 500) {
        return message || 'The chat service is having trouble right now. Please try again.';
    }

    return message || 'Unable to send your message. Please try again.';
}

export async function sendChatMessage(messages) {
    for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt += 1) {
        let response;

        try {
            response = await fetch(CHAT_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages }),
            });
        } catch {
            throw new Error('Network error. Please check your connection and try again.');
        }

        let data;

        try {
            data = await response.json();
        } catch {
            throw new Error('Invalid response from the chat service.');
        }

        // If the server reports a retryable Gemini 429, wait for the suggested
        // retry window when available, then retry the same limited message payload.
        if (!response.ok && response.status === 429 && data?.retryable && attempt < MAX_RETRY_ATTEMPTS) {
            await sleep(getRetryDelayMs(data.error));
            continue;
        }

        if (!response.ok) {
            throw new Error(getFriendlyError(response.status, data?.error));
        }

        if (!data?.reply || typeof data.reply !== 'string') {
            throw new Error('Invalid response from the chat service.');
        }

        return data.reply;
    }

    throw new Error('Rate-limited. Please wait a moment and try again.');
}
