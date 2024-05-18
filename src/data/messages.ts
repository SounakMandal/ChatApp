import chat from "@/data/chat_javascript.json";
import anotherChat from "@/data/chat_python.json";

const chats = [chat, anotherChat];

export function getMessages(activeChat: number, activeGroup: number) {
  return chats[activeChat]["groups"][activeGroup]["messages"] ?? [];
}

export function getTitle(activeChat: number) {
  return chats[activeChat]["title"];
}

export function getAllTitles() {
  return [chat["title"], anotherChat["title"]];
}

export function getGroups(activeChat: number) {
  return chats[activeChat]["groups"].map(chatGroup => chatGroup.title);
}
