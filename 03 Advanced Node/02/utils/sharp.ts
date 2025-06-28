import { WithImplicitCoercion } from "buffer";
import sharp from "sharp";

const compressImage = async (input: WithImplicitCoercion<string | ArrayLike<number>>, fileName: string): Promise<void> => {
  const outputPath = `${__dirname}/../uploads/${fileName}`;
  sharp(Buffer.from(input)).resize(600).webp({ quality: 80 }).toFile(outputPath);
};

module.exports = { compressImage };
