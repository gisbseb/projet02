import Categorie from "../models/Categorie.js";
import Company from "../models/Company.js";
import Furniture from "../models/Furniture.js";
import FurnitureMaterial from "../models/FurnitureMaterial.js";
import User from "../models/User.js";
import Material from "../models/material.js";

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
  { socialReason: "pPlastique", materials: [{ name: "Plastique" }] },
];

const categoriesData = [{ name: "Armoire" }, { name: "Etagère" }];

const furnituresData = [
  { categorieId: 1, name: "Armoire Bella", creationCount: 3 },
  { categorieId: 2, name: "Étagère Cascade", creationCount: 5 },
  { categorieId: 1, name: "Armoire Luna", creationCount: 6 },
  { categorieId: 2, name: "Étagère Éclipse", creationCount: 2 },
  { categorieId: 1, name: "Armoire Royale", creationCount: 1 },
  { categorieId: 2, name: "Étagère Horizon", creationCount: 8 },
  { categorieId: 1, name: "Armoire Solstice", creationCount: 9 },
  { categorieId: 2, name: "Étagère Enchantée", creationCount: 11 },
  { categorieId: 1, name: "Armoire Élégance", creationCount: 5 },
  { categorieId: 2, name: "Étagère Prismatique", creationCount: 7 },
];

const populateDb = async () => {
  const newUser = await User.create(userData);

  companyData.forEach(async (company) => {
    const newCompany = await Company.create({
      socialReason: company.socialReason,
    });

    company.materials.forEach(async (material) => {
      const stock = Math.floor(Math.random() * 20) + 1;

      const newMaterial = await Material.create({
        name: material.name,
        companyId: newCompany.id,
        stock: stock,
      });
    });
  });

  categoriesData.forEach(async (cat) => {
    const newCategorie = await Categorie.create(cat);
  });

  furnituresData.forEach(async (furniture) => {
    const newFurniture = await Furniture.create(furniture);

    const allMaterials = await Material.findAll();

    const associatedMaterials = allMaterials.slice(
      0,
      Math.floor(Math.random() * allMaterials.length) + 1
    );

    await Promise.all(
      associatedMaterials.map(async (material) => {
        await FurnitureMaterial.create({
          furnitureId: newFurniture.id,
          materialId: material.id,
        });
      })
    );
  });
};

export default populateDb;
