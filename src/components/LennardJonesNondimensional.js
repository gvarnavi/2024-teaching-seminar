import React, {useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "@gvarnavi/lennard-jones-nondimensional";

function LennardJonesNondimensional() {
  const ref = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, Inspector.into(ref.current));
    return () => runtime.dispose();
  }, []);

  return (
    <>
      <div ref={ref} />
    </>
  );
}

export default LennardJonesNondimensional;
