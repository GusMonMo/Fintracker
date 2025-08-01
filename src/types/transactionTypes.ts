
export type Transaction = {
    origin: string;
    value: string;
    type: "entry" | "exit";
}