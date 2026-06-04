const CustomPostType = require('../models/CustomPostType');

class CustomPostTypes {

    static async getAll() {
        return await CustomPostType.findAll();
    }

    static async register(data) {

        const FoundCPTs = await CustomPostType.findAll({
            where: {
                slug: cpt.slug
            }
        })

        if (FoundCPTs.length > 0) {

            return FoundCPTs[0].id

        } else {

            const newCPT = await CustomPostType.build(cpt)

            await newCPT.save()
            return newCPT.id;

        }
    }
    static async delete(id) {
        if (id === undefined || id === null) {
            throw new TypeError('id is required');
        }

        try {
            // destroy returns the number of rows deleted
            const deletedCount = await CustomPostType.destroy({ where: { id } });
            return deletedCount > 0;
        } catch (err) {
            // Re-throw after optionally adding context; caller should handle logging
            err.message = `Failed to delete CustomPostType with id=${id}: ${err.message}`;
            throw err;
        }
    }

    static async update(cpt) {
        const foundCPTs = await CustomPostType.findAll({
            where: {
                id: cpt.id
            }
        });

        if (foundCPTs.length > 0) {
            foundCPTs[0].title = cpt.title;
            foundCPTs[0].slug = cpt.slug;
            foundCPTs[0].singular = cpt.singular;
            foundCPTs[0].plural = cpt.plural;
            foundCPTs[0].top_level = cpt.top_level;
            foundCPTs[0].use_rest = cpt.use_rest;
            foundCPTs[0].content_editor = cpt.content_editor;
            foundCPTs[0].page_builder = cpt.page_builder;
            await foundCPTs[0].save();
            return true;
        } else {
            return false;
        }
    }
}

module.exports = CustomPostTypes;