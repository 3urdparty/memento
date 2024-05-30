import { Faker } from "@faker-js/faker"
import { Avatar } from "../user.entity"

export const AvatarFactory = (faker: Faker): Avatar =>
({
  isCircle: true,
  circleColor: '#6ae68a',
  accessoriesType: faker.helpers.arrayElement(['Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers']),
  clothes: faker.helpers.arrayElement(['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie', 'Overall', 'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck']),
  clothesColor: faker.string.hexadecimal({ length: 6, casing: 'upper', prefix: '#' }),
  eyebrows: faker.helpers.arrayElement(['Angry', 'AngryNatural', 'Default', 'DefaultNatural', 'FlatNatural', 'RaisedExcited', 'RaisedExcitedNatural', 'SadConcerned', 'SadConcernedNatural', 'UnibrowNatural', 'UpDown', 'UpDownNatural']),
  eye: faker.helpers.arrayElement(['Close', 'Cry', 'Default', 'Dizzy', 'EyeRoll', 'Happy', 'Hearts', 'Side', 'Squint', 'Surprised', 'Wink', 'WinkWacky']),
  facialHairColor: faker.string.hexadecimal({ length: 6, casing: 'upper', prefix: '#' }),
  facialHair: faker.helpers.arrayElement(['Blank', 'BeardMedium', 'BeardLight', 'BeardMagestic', 'MoustacheFancy', 'MoustacheMagnum']),
  graphicShirt: faker.helpers.arrayElement(['Bat', 'Cumbia', 'Deer', 'Diamond', 'Hola', 'Pizza', 'Resist', 'Selena', 'Bear', 'SkullOutline', 'Skull']),
  hairColor: faker.string.hexadecimal({ length: 6, casing: 'upper', prefix: '#' }),
  mouth: faker.helpers.arrayElement(['Concerned', 'Default', 'Disbelief', 'Eating', 'Grimace', 'Sad', 'ScreamOpen', 'Serious', 'Smile', 'Tongue', 'Twinkle', 'Vomit']),
  skinColor: faker.string.hexadecimal({ length: 6, casing: 'upper', prefix: '#' }),
  topType: faker.helpers.arrayElement(['NoHair', 'Eyepatch', 'Hat', 'Hijab', 'Turban', 'WinterHat1', 'WinterHat2', 'WinterHat3', 'WinterHat4', 'LongHairBigHair', 'LongHairBob', 'LongHairBun', 'LongHairCurly', 'LongHairCurvy', 'LongHairDreads', 'LongHairFrida', 'LongHairFro', 'LongHairFroBand', 'LongHairNotTooLong', 'LongHairShavedSides', 'LongHairMiaWallace', 'LongHairStraight', 'LongHairStraight2', 'LongHairStraightStrand', 'ShortHairDreads01', 'ShortHairDreads02', 'ShortHairFrizzle', 'ShortHairShaggyMullet', 'ShortHairShortCurly', 'ShortHairShortFlat', 'ShortHairShortRound', 'ShortHairShortWaved', 'ShortHairSides', 'ShortHairTheCaesar', 'ShortHairTheCaesarSidePart']),
  topColor: faker.string.hexadecimal({ length: 6, casing: 'upper', prefix: '#' }),
})


// {
//   isCircle: boolean, // Place avatar in a background-circle
//
//   circleColor?: Hex,
//   hairColor: Hex,
//   skinColor: Hex,
//   clothesColor: Hex,
//   topColor: Hex,
//   facialHairColor: Hex,
//
//   clothes: keyof typeof Clothes,
//   graphicShirt: keyof typeof GraphicShirt,
//   top: keyof typeof Tops,
//   accessories: keyof typeof Accessories,
//   facialHair: keyof typeof FacialHair,
//   eyes: keyof typeof Eyes,
//   eyebrows: keyof typeof Eyebrows,
//   mouth: keyof typeof Mouths,
// }
