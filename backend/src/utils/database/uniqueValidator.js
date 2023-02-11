const uniqueValidator = async (Model, field, value) => {
  try {
    const response = await Model.findOne({
      [field]: value,
    }).exec();
    return !response;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = uniqueValidator;
