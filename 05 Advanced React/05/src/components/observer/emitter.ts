import mitt, { Emitter, EventType } from "mitt";

export const emitter: Emitter<Record<EventType, unknown>> = mitt();
// console.log("emitter:", emitter);
