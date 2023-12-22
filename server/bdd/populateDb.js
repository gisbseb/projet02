import Categorie from "../models/Categorie.js";
import Company from "../models/Company.js";
import Furniture from "../models/Furniture.js";
import FurnitureMaterial from "../models/FurnitureMaterial.js";
import User from "../models/User.js";
import Material from "../models/material.js";
import { LoremIpsum } from "lorem-ipsum";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const { SALT_ROUND } = process.env;
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const userData = {
  username: "admin",
  password: "admin",
  email: "admin@gmail.com",
};

const companyData = [
  {
    socialReason: "Bbois",
    materials: [{ name: "frêne" }, { name: "chêne" }, { name: "noyer" }],
  },
  {
    socialReason: "MetaLo",
    materials: [{ name: "acier" }, { name: "inox" }, { name: "aluminium" }],
  },
  { socialReason: "pPlastique", materials: [{ name: "plastique" }] },
];

const categoriesData = [{ name: "Armoire" }, { name: "Etagère" }];

const furnituresData = [
  { categorieId: 1, name: "Bella", creationCount: 3, filename: "armoire4.jpg" },
  {
    categorieId: 1,
    name: "Cascade",
    creationCount: 5,
    filename: "armoire.jpg",
  },
  { categorieId: 1, name: "Luna", creationCount: 6, filename: "armoire3.jpg" },
  {
    categorieId: 2,
    name: "Éclipse",
    creationCount: 2,
    filename: "etagere.jpg",
  },
  {
    categorieId: 1,
    name: "Royale",
    creationCount: 1,
    filename: "armoire2.jpg",
  },
  {
    categorieId: 2,
    name: "Horizon",
    creationCount: 8,
    filename: "etagere3.jpg",
  },
  {
    categorieId: 1,
    name: "Solstice",
    creationCount: 9,
    filename: "armoire6.jpg",
  },
  {
    categorieId: 1,
    name: "Enchantée",
    creationCount: 11,
    filename: "armoire5.jpg",
  },
  {
    categorieId: 1,
    name: "Élégance",
    creationCount: 5,
    filename: "armoire3.jpg",
  },
  {
    categorieId: 2,
    name: "Prismatique",
    creationCount: 7,
    filename: "etagere2.jpg",
  },
];

const populateDb = async () => {
  userData.password = await bcrypt.hash(
    userData.password,
    parseInt(SALT_ROUND)
  );

  await User.create(userData);

  companyData.forEach(async (company) => {
    const newCompany = await Company.create({
      socialReason: company.socialReason,
    });

    company.materials.forEach(async (material) => {
      const stock = Math.floor(Math.random() * 10) + 1;

      await Material.create({
        name: material.name,
        companyId: newCompany.id,
        stock: stock,
        description: lorem.generateParagraphs(1),
      });
    });
  });

  categoriesData.forEach(async (cat) => {
    await Categorie.create(cat);
  });

  furnituresData.forEach(async (furniture) => {
    const newFurniture = await Furniture.create(furniture);

    const allMaterials = await Material.findAll();

    const materialCount = Math.floor(Math.random() * (4 + 1)) + 1;

    const shuffledMaterials = shuffleArray(allMaterials).slice(
      0,
      materialCount
    );

    await Promise.all(
      shuffledMaterials.map(async (material) => {
        const randomCount = Math.floor(Math.random() * 4) + 1;
        await FurnitureMaterial.create({
          furnitureId: newFurniture.id,
          materialId: material.id,
          materialCount: randomCount,
        });
      })
    );
  });
};
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export default populateDb;
