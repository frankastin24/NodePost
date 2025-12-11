module.exports = (context) => {

    const post = context.post;
    const elements = JSON.parse(post.content);

    let html = '';

    elements.forEach((element) => {
        html += parseElement(element);
    })

    return html;
}

const parseElement = (element) => {

    switch (element.type) {
        case 'heading':

            const headingStyles = parseHeadingStyles(element);

            return `<${element.level} id="${element.id}" class="${element.extraClasses}" style="${headingStyles}">` + element.content + `</${element.level}>`;
            break;

        case 'paragraph':

            const paragraphStyles = `text-align:${element.align};`;

            return `<p id="${element.id}" class="${element.extraClasses}" style="${paragraphStyles}">` + element.content + `</p>`;

            break;

        case 'button':

            return `<a id="${element.id}" class="${element.extraClasses}" href="${element.url}">${element.content}</a>`;
            break;

        case 'image':

            const imageStyles = imageStyles(element);

            return `<div id="${element.id}" class="${element.extraClasses}" style="${imageStyles}"></div>`;

            break;

        case 'video':

            return `<video id="${element.id}" class="${element.extraClasses}" src="${element.src}"></video>`;

            break;

        case 'gallery':

            let gallery = `<div class="np-gallery flex space-between">`;

            element.images.forEach((image) => {
                const width = 'calc(33.33% - 10px)';
                gallery += `<div class="np-gallery-item" data-src="${image}" style="background-size:cover;height:200px;background-image:url(${image});max-width:${width};width:${width}"></div>`
            })
            gallery += '</div>';
            return gallery;
            break;

        case 'columns':
            let columns = `<div class="flex np-columns space-between">`;

            element.columns.forEach((column) => {
                
                columns += `<div style="width:${column.width}" class="np-column">`;
                
                const elements = column.elements;
                
                elements.forEach((element) => {
                    columns += parseElement(element);
                })

                columns += `</div>`;

            })
            columns += `</div>`;
    }

}

const parseHeadingStyles = (element) => {

    let styles = '';

    styles += 'text-align:' + element.align + ';';

    if (element.bold) {
        styles += 'font-weight:bold;';
    } else {
        styles += 'font-weight:normal;';
    }

    styles += 'color:' + element.color + ';';
    return styles;
}

const imageStyles = (element) => {
    let styles = `width:${element.width};height:${element.height};`;

    let backgroundSize = `${element.width} ${element.height}`;

    if (element.cover) {
        backgroundSize = 'cover';
    }

    if (element.contain) {
        backgroundSize = 'contain';
    }

    styles += `background-size:${backgroundSize};`;
    styles += `background-image:url(${element.src});`;

}