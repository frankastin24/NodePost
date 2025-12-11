const do_stylesheets = require("./do_stylesheets");

module.exports = (context) => {
   
    let html = '';

    html += `<title>${context.page_title}</title>`;
    
    html += do_stylesheets();

    

    return html;

}