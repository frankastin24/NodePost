module.exports = () => {
    let html = '';
    let dependancyTree = {};

    // Example input: global.admin_stylesheets = [...]
    // Build a map for quick lookup
    const stylesheetMap = {};
    if (!Array.isArray(global.__stylesheets)) return html;

    global.__stylesheets.forEach(stylesheet => {
        stylesheetMap[stylesheet.name] = stylesheet;
    });

    // Helper to resolve dependencies recursively
    const visited = new Set();

    function renderStylesheet(name) {
        if (visited.has(name)) return;
        visited.add(name);

        const sheet = stylesheetMap[name];
        if (!sheet) return;

        // Resolve dependencies first
        if (Array.isArray(sheet.dependacies)) {
            sheet.dependacies.forEach(dep => renderStylesheet(dep));
        }

        // Now include this stylesheet
        html += `<link href="${sheet.url}" rel="stylesheet" />\n`;
    }

    // Render all stylesheets, resolving dependencies
    global.__stylesheets.forEach(stylesheet => {
        renderStylesheet(stylesheet.name);
    });

    return html;
}