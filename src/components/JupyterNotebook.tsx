/*
 * Copyright (c) 2021-2023 Datalayer, Inc.
 *
 * MIT License
 */

import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
        
const JupyterNotebook = (props: any) => {
  const { token, serverHttpUrl, serverWsUrl, path} = props;
  return (
    <BrowserOnly
      fallback={<div>Jupyter Notebook fallback content for prerendering.</div>}>
      {() => {
        // Keep the import via require in the BrowserOnly code block.
        const { Jupyter } = require('@datalayer/jupyter-react/lib/jupyter/Jupyter');
        const { Notebook } = require('@datalayer/jupyter-react/lib/components/notebook/Notebook');
        return (
          <>
            <Jupyter
              jupyterToken={token}
              jupyterServerHttpUrl={serverHttpUrl}
              jupyterServerWsUrl={serverWsUrl}
              disableCssLoading={true}
              useRunningKernelIndex={-1}
              startDefaultKernel={true}
              terminals={false}
              lite={false}
            >
              <Notebook path={path}/>
            </Jupyter>
          </>
        )
      }}
    </BrowserOnly>
  )
}

export default JupyterNotebook;
