import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Routes from '../client/Routes'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import serialize from 'serialize-javascript'
import { Helmet } from 'react-helmet'


export default (req, store, context) => {
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    )

    const helmet = Helmet.renderStatic()

    return `
    <html>
    <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    </head>
    <body>
    <div id="root">${content}</div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css">
    <script>
     window.INITIAL_STATE = ${serialize(store.getState())}
    </script>
    <script src="bundle.js"></script>
    </body>
    `

}