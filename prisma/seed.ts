import prisma from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";
import hasha from "hasha";
import slugify from "slugify";
import axios from "axios";
import sharp from "sharp";

async function getImage(url: string) {
  if (!url) {
    throw new Error("No URL provided");
  }

  let request = {
    headers: {
      "Cache-Control": "no-cache, no-store",
    },
  };

  let response;
  let imgData;

  try {
    response = await axios.get(url, request);
    imgData = response.data;
  } catch (error) {
    console.error(error);
  }

  const image = sharp(imgData);
  const metadata = await image.metadata();
  const imgBuffer = await image.toBuffer();
  const md5 = await hasha.async(imgBuffer, {
    algorithm: "md5",
  });
  const sha1 = await hasha.async(imgBuffer, {
    algorithm: "sha1",
  });

  return {
    metadata,
    md5,
    sha1,
    buffer: imgBuffer,
  };
}

async function main() {
  const bucket = await prisma.bucket.create({
    data: {
      apiType: "S3",
      provider: faker.helpers.arrayElement(["Cloudflare", "Backblaze"]),
      accountId: faker.datatype.uuid(),
      endpoint: faker.internet.url(),
      publicUrl: faker.internet.url(),
      apiKey: faker.internet.password(),
      apiSecret: faker.internet.password(),
    },
  });

  // Create users
  for (let i = 0; i < 3; i++) {
    const sex = faker.name.sexType();
    const firstName = faker.name.firstName(sex);
    const lastName = faker.name.lastName(sex);
    const slug = faker.internet.userName(firstName, lastName);
    const email = faker.internet.email(firstName, lastName);
    const password = await hash(faker.internet.password(), 10);
    const city = faker.address.city();
    const state = faker.address.state();
    const locality = `${city}, ${state}`;

    const user = await prisma.user.create({
      data: {
        slug: slug,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: faker.phone.number(),
        birthday: faker.date.past(18),
        gender: sex,
        profilePic: faker.image.avatar(),
        biography: faker.lorem.sentences(),
        website: faker.internet.url(),
        locality: locality,
        streetAddress1: faker.address.streetAddress(),
        streetAddress2: faker.address.secondaryAddress(),
        city: city,
        state: state,
        postalCode: faker.address.zipCode(),
        country: faker.address.country(),
        timezone: faker.address.timeZone(),
      },
    });

    // Create photos for each user
    for (let j = 0; j < 5; j++) {
      const imageUrl = faker.image.imageUrl(900, 600, undefined, true);
      const image = await getImage(imageUrl);

      const id = faker.datatype.uuid();

      let newName = slugify(image.sha1, {
        trim: true,
        strict: true,
        remove: /[^a-zA-Z0-9]+/g,
      }).substring(0, 20);

      const photo = await prisma.photo.create({
        data: {
          id: id,
          fileSize: image.buffer.byteLength,
          fileName: faker.system.commonFileName("jpeg"),
          newName: newName + ".jpeg",
          md5: image.md5,
          sha1: image.sha1,
          slug: newName.substring(0, 12),
          name: faker.lorem.words(),
          description: faker.lorem.sentences(),
          aperture: faker.helpers.arrayElement([
            "f/1.2",
            "f/1.4",
            "f/1.8",
            "f/2.0",
            "f/2.2",
            "f/2.5",
            "f/2.8",
            "f/3.2",
            "f/3.5",
            "f/4.0",
            "f/4.5",
            "f/5.0",
            "f/5.6",
            "f/6.3",
            "f/7.1",
            "f/8.0",
          ]),
          shutter: faker.helpers.arrayElement([
            "1/10",
            "1/15",
            "1/20",
            "1/60",
            "1/100",
            "1/160",
            "1/200",
            "1/250",
            "1/320",
            "1/640",
            "1/1000",
            "1/1600",
            "1/2000",
            "1/3200",
            "1/4000",
            "1/6400",
            "1/8000",
          ]),
          focalLength: faker.helpers.arrayElement([
            "16mm",
            "24mm",
            "28mm",
            "35mm",
            "50mm",
            "70mm",
            "85mm",
            "100mm",
            "105mm",
            "135mm",
            "200mm",
            "300mm",
            "400mm",
            "500mm",
            "600mm",
          ]),
          iso: faker.helpers.arrayElement([
            "50",
            "100",
            "200",
            "400",
            "800",
            "1600",
            "3200",
            "6400",
            "12800",
            "25600",
          ]),
          userId: user.id,
          bucketId: bucket.id,
        },
      });
    }
  }
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
