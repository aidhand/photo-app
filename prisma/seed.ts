import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash, hashSync } from "bcrypt";
import hasha from "hasha";

const prisma = new PrismaClient();

class User {
  constructor() {
    this.firstName = faker.name.firstName();
    this.email = faker.internet.email(this.firstName);
    this.password = hashSync(faker.internet.password(), 10);
  }

  firstName: string;
  email: string;
  password: string;
}

class Photo {
  constructor(userId?: User) {
    const image = faker.internet.password(24);
    this.store = faker.helpers.arrayElement(["b2", "r2", "s3", "cfimg"]);
    this.fileName = faker.system.commonFileName("jpg");
    this.md5 = hasha(image, { algorithm: "md5" });
    this.sha1 = hasha(image, { algorithm: "sha1" });
    this.name = this.fileName.split(".")[0];
    this.userId = userId;
  }

  store: string;
  fileName: string;
  md5: string;
  sha1: string;
  name: string;
  userId?: User;
}

async function seedUsers(n: number): Promise<any[]> {
  let output = [];

  for (let i = 0; i < n; i++) {
    const seeded = await prisma.user.create({
      data: await new User(),
    });
    output.push(seeded);
  }
  return output;
}

async function seedPhotos(n: number): Promise<any[]> {
  let output = [];

  for (let i = 0; i < n; i++) {
    const seeded = await prisma.photo.create({
      data: await new Photo(),
    });
    output.push(seeded);
  }
  return output;
}

async function seedUsersAndPhotos(
  userCount: number,
  photosPerUser: number = 0
): Promise<object> {
  let usersData = [];
  let photosData = [];

  for (let i = 0; i < userCount; i++) {
    const seededUser = await prisma.user.create({
      data: await new User(),
    });
    usersData.push(seededUser);

    let numPhotos = Math.floor(Math.random() * 10) + 1;
    if (photosPerUser > 0) {
      numPhotos = photosPerUser;
    }

    for (let j = 0; j < numPhotos; j++) {
      const newPhoto = await new Photo(seededUser.id);

      const seededPhoto = await prisma.photo.create({
        data: newPhoto,
      });

      photosData.push(seededPhoto);
    }
  }

  return { users: usersData, photos: photosData };
}

async function main() {
  console.log(await seedUsersAndPhotos(3));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
