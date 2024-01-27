export function formatBiggestAuctionBid(lances, valorInicial) {
  const maiorLance = lances.reduce(
    (maior, atual) => atual.valor > maior ? atual.valor : maior,
    valorInicial
  );
  return maiorLance;
}