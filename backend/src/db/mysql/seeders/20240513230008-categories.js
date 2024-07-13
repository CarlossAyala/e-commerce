const { generateRandomCategory, generateCoverImage } = require("../utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const INITIAL_DATA_MAIN = [
      {
        name: "Vehicles",
        images: [
          {
            publicId: "as1ctlzzjxdzr9j3essj",
            order: 1,
            url: "https://res.cloudinary.com/legger/image/upload/v1720763008/as1ctlzzjxdzr9j3essj.webp",
          },
          {
            publicId: "azab0fjabkgm6x8ewbggh",
            order: 2,
            url: "https://res.cloudinary.com/legger/image/upload/v1720763008/zab0fjabkgm6x8ewbggh.webp",
          },
          {
            publicId: "bbuiu8qhoojdsfyesk2h",
            order: 3,
            url: "https://res.cloudinary.com/legger/image/upload/v1720763009/bbuiu8qhoojdsfyesk2h.webp",
          },
        ],
      },
      {
        name: "Tools",
        images: [
          {
            publicId: "bkh4wxfgwdpzak9nbv2h",
            order: 1,
            url: "https://res.cloudinary.com/legger/image/upload/v1720763547/bkh4wxfgwdpzak9nbv2h.webp",
          },
        ],
      },
      {
        name: "Computers",
        images: [
          {
            publicId: "kkzjkkzkb4zq6qcpyy9a",
            order: 1,
            url: "https://res.cloudinary.com/legger/image/upload/v1720763694/kkzjkkzkb4zq6qcpyy9a.webp",
          },
        ],
      },
      {
        name: "Consoles and Video Games",
        images: [
          {
            publicId: "zaslc7g3xuioiz4ren1q",
            order: 1,
            url: "https://res.cloudinary.com/legger/image/upload/v1720763803/zaslc7g3xuioiz4ren1q.webp",
          },
        ],
      },
      {
        name: "Home Appliances",
        images: [
          {
            publicId: "mehwkcec5ez14gf8iadp",
            order: 1,
            url: "https://res.cloudinary.com/legger/image/upload/v1720763898/mehwkcec5ez14gf8iadp.webp",
          },
        ],
      },
    ];
    const main = INITIAL_DATA_MAIN.map(({ name }) =>
      generateRandomCategory({ name }),
    );
    const sub = main.map((category) =>
      generateRandomCategory({
        parentId: category.id,
      }),
    );

    const galleries = main.flatMap((category, index) => {
      return INITIAL_DATA_MAIN[index].images.map((image) =>
        generateCoverImage({ ...image, categoryId: category.id }),
      );
    });

    await queryInterface.bulkInsert("Categories", [...main, ...sub]);
    await queryInterface.bulkInsert("CategoryGallery", galleries);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("CategoryGallery", null, {});
  },
};
