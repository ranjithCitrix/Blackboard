export * from "../../script-sdk/types/script-api";

export interface IClient {
  fetch(url: string, requestInit?: RequestInit): Promise<Response>;
  fetchSync(url: string, requestInit?: RequestInit): Response;
}

export type Dictionary = { [key: string]: any };

export type Parameters = Dictionary & {};

export type FunctionArgs = { client: IClient; parameters: Parameters };
