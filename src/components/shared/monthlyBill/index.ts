import { Group, User } from "src/models";

export const monthlyBill = (s: User, groups: any[] | undefined) => {
  const paid = Number(s?.paid);

  const discount = Number(s?.sale);

  const price =
    Math.floor(groups?.filter((g) => g.id === s.group)[0]?.price) *
    (1 - Number(s?.sale) / 100);

  const debt = Math.floor(paid - price);

  return { price, debt, discount, paid };
};

export const AllMonthlyBill = (students: any[], groups: any[]) => {
  let allPaids = 0;
  let allPrices = 0;
  let allDebts = 0;

  for (let i = 0; i < students?.length; i++) {
    allPaids += Number(students[i]?.paid);
  }

  for (let i = 0; i < students?.length; i++) {
    allPrices +=
      Math.floor(
        groups?.filter((g) => g?.id === students[i]?.group)[0]?.price
      ) *
      (1 - Number(students[i]?.sale) / 100);
  }

  allDebts = allPaids - allPrices;

  return { allPaids, allPrices, allDebts };
};
