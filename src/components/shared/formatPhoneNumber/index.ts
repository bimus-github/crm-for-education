export const FormatPhoneNumber = (phone: number) => {
  const code = Math.floor(phone / 10000000);
  const oneThree = Math.floor((phone - code * 10000000) / 10000);
  const fourFive = Math.floor(
    (phone - code * 10000000 - oneThree * 10000) / 100
  );
  const sixSeven = Math.floor(
    phone - code * 10000000 - oneThree * 10000 - fourFive * 100
  );

  return { code, oneThree, fourFive, sixSeven };
};
