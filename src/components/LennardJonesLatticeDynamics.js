import React, {useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "@gvarnavi/lennard-jones-lattice-dynamics";

function LennardJonesLatticeDynamics() {
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

export default LennardJonesLatticeDynamics;
