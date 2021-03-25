import { actions } from "./constants";

export const nestDebugger = (action = actions.get, endPoint, body) => {
  console.log(`called method: ${action}, endpoint: ${endPoint}, ${body ? `body: ${JSON.stringify(body)}`: ''}`);
};