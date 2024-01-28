import { renderHook, act } from "@testing-library/react-hooks";
import useListaLeiloes from "../../src/hooks/useListaLeiloes";
import { obtemLeiloes } from "../../src/repositorio/leilao";

jest.mock('../../src/repositorio/leilao');

const mockAuctions = [
  {
    id: 1,
    nome: 'Leilão1',
    descricao: '1111111'
  }
];

const mockAuctionsUpdated = [
  {
    id: 1,
    nome: 'Leilão1',
    descricao: '1111111'
  },
  {
    id: 2,
    nome: 'Leilão2',
    descricao: '2222222'
  }
];

describe('hooks/useListaLeiloes', () => {

    it('should return a auctions list and a refresh function', async () => {

      obtemLeiloes.mockImplementation(() => mockAuctions)

      const { result, waitForNextUpdate } = renderHook(() => useListaLeiloes());

      expect(result.current[0]).toEqual([]);



      console.log('antes: ', result.current[0])
      await waitForNextUpdate();
      console.log('depois: ', result.current[0])
      expect(result.current[0]).toEqual(mockAuctions);
      

      obtemLeiloes.mockImplementation(() => mockAuctionsUpdated)

      await act(() => result.current[1]())
      
      console.log('pós hook: ', result.current[0])

      expect(result.current[0]).toEqual(mockAuctionsUpdated);


    });
});