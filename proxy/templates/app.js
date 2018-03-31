// module.exports = (overview, gallery, map, recommendations) => `
//   <div id="gallery-app">${gallery}</div>
//   <div id="midsection">
//     <div id="overview-app">${overview}</div>
//     <div id="sidebar-app">${map}</div>
//   </div>
//   <div id="recommendations-app">${recommendations}</div>
// `;

module.exports = (recommendations) => `
  <div id="gallery-app"></div>
  <div id="midsection">
    <div id="overview-app"></div>
    <div id="sidebar-app"></div>
  </div>
  <div id="recommendations">${recommendations}</div>
`;
