import { formataBrasileiroParaDecimal } from "../../../src/negocio/formatadores/moeda";
import { formataDecimalParaReal } from "../../../src/negocio/formatadores/moeda";

describe('negocio/formatadores/moeda', () => {

  describe('formataMoedaParaDecimal', () => { 
  
    it('should return 8.59 when input is \'8,59\'', () => {

      const result = formataBrasileiroParaDecimal('8,59');

      expect(result).toBe(8.59)
      console.log(result);
    });
  });

  describe('formataDecimalParaMoeda', () => {

    it('should return \'8,59\' when input is 8.59', () => {

      const result = formataDecimalParaReal(8.59)

      expect(result).toMatch(/R\$\s8,59/)
      console.log(result)
    })
  });
});