import { formatBiggestAuctionBid } from "../../../src/negocio/formatadores/lance";

describe('negocio/formatadores/lance', () => {

  describe('formatBiggestAuctionBid', () => {

    it('should return the biggest bid from the auction', () => {

      const initialAuctionValue = 50;
      const bids = [{valor: 200}, {valor: 65}, {valor: 600}];

      const result = formatBiggestAuctionBid(bids,initialAuctionValue)

      expect(result).toBeGreaterThanOrEqual(initialAuctionValue)
    });

    it('should return the initial value when there is no bids', () => {

      const initialAuctionValue = 50;
      const bids = [];

      const result = formatBiggestAuctionBid(bids,initialAuctionValue)

      expect(result).toBe(initialAuctionValue)
    });
  });
});