import React from 'react';
import ReactDOMServer from 'react-dom/server';

import config from './config';
import Html from './Html';
import getAuthState from './authentication';

function render(req, res) {
  const html = '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
    <Html
      appCssSrc={config.assetsSources.appCss}
      appScriptSrc={config.assetsSources.appJs}
      initialState={getAuthState(req)}
      isProduction={config.isProduction}
    />
  );

  // Send the rendered page back to the client
  res.send(html);
}

export default render;
