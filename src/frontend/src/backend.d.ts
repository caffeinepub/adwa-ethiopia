import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ChatMessage {
    question: string;
    user: Principal;
    response: string;
    timestamp: bigint;
}
export interface Score {
    user: Principal;
    score: bigint;
    timestamp: bigint;
}
export interface backendInterface {
    addChatMessage(question: string, response: string): Promise<void>;
    getAllChatMessages(): Promise<Array<ChatMessage>>;
    getAllScores(): Promise<Array<Score>>;
    getUserChatHistory(user: Principal): Promise<Array<ChatMessage>>;
    getUserScores(user: Principal): Promise<Score>;
    submitScore(score: bigint): Promise<void>;
}
