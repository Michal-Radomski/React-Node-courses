// ts-node myFile.ts

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// @ts-ignore -> New timers, tasks, operations are recorded from myFile.ts running
myFile.runContents();

function shouldContinue(): boolean {
  // Check one: Any pending setTimeout, setInterval, setImmediate?
  // Check two: Any pending OS tasks? (Like server listening to port, networking)
  // Check three: Any pending long running operations? (Like fs module and ThreadPool)
  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length ? true : false;
}

// Entire body executes in one "tick"
while (shouldContinue()) {
  // 1) Node looks at pendingTimers and sees if any functions are ready to be executed
  // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks
  // 3) Pause execution . Continue when task/ timer is done/ completed.
  // 4) Looks at pendingTimers. Call any setImmediate.
  // 5) Handle any 'close' events.
}

// exit back to terminal
