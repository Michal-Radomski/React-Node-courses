import React from "react";

type State =
  | {
      status: "fetching" | "fetched";
    }
  | {
      status: "error";
      error: Error;
    };

export const useUser = (src: string): State => {
  const [state, setState] = React.useState<State>({ status: "fetching" });

  React.useEffect(() => {
    setState({ status: "fetching" });

    let aborted = false;

    fetch(src)
      .then((data) => {
        console.log("data:", data);
        if (aborted) {
          return;
        }

        // Do something with the data
        setState({ status: "fetched" });
      })
      .catch((error) => {
        if (aborted) {
          return;
        }
        setState({ status: "error", error });
      });

    return () => {
      aborted = true;
    };
  }, [src]);

  // setState({ status: "error" });
  // setState({ status: "loading", error: new Error("error") });
  // setState({ status: "loaded", error: new Error("error") });

  if (state.status === "error") {
    console.error(state.error);
  }

  return state;
};
