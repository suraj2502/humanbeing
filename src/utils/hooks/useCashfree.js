import { load } from "@cashfreepayments/cashfree-js";

async function useCashfree() {
  const cashfree = await load({
    mode: "sandbox", //or production
  });

  console.log("cashfree..", cashfree)

  return cashfree
}

export default useCashfree;
