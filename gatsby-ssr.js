const React = require('react');

exports.onPreRenderHTML = ({ replacePostBodyComponents }) => {
  replacePostBodyComponents([
    <script
      async
      defer
      src="https://oogjeinhetzeil.gersom.nl/app.js"
      key="1"
    ></script>,
    <noscript>
      <img src="https://oogjeinhetzeil.gersom.nl/image.gif" alt="" key="2" />
    </noscript>,
  ]);
};
