export function formatCurrency(priceCents){
  return (Math.round(priceCents)/100).toFixed(2);
}
//the below makes it imported into the file in default when we export it
export default formatCurrency;