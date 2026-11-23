export const OPEN_CHAT_EVENT = 'lv-open-chat';

/** Open the assistant dialog from anywhere (e.g. a skip link or a page call-to-action). */
export function openChat() {
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
}
