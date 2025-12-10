const CustomPostType = require('../models/CustomPostType');
module.exports = async (id) => {
    
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