module.exports = (post,text) => {

   const prevPost = getPrevEntry(post.id);


}

const getPrevEntry = async (currentId) => {
  const prevEntry = await Post.findOne({
    where: {
      id: {
        [Sequelize.Op.ls]: currentId, // id less than the currentId
      },
    },
    order: [['id', 'ASC']], // Sort by id in ascending order to get the next one
  });

  return nextEntry;
};