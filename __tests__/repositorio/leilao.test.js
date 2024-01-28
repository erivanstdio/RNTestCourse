import axios from "axios";
import { obtemLeilao, obtemLeiloes } from "../../src/repositorio/leilao";
import apiLeiloes from '../../src/servicos/apiLeiloes'

jest.mock('../../src/servicos/apiLeiloes');

const mockAuctions = [
  {
    id: 1,
    nome: 'Leilão1',
    descricao: '1111111'
  },
  {
    id: 2,
    nome: 'Leilão2',
    descricao: '2222222'
  },
  {
    id: 3,
    nome: 'Leilão3',
    descricao: '3333333'
  }
];

const mockAuction = { 
  cor: "#ffba05", 
  descricao: "TV de LED 50\"", 
  icone: "tv", 
  id: 1, 
  nome: "TV", 
  valorInicial: 1000 
};

const mockRequestAuction = (retorno) => {

  return new Promise((resolve) => {
    setTimeout(() => {

      resolve({

        data: retorno
      });
    }, 200);
  });
};

const mockErrorRequest = () => {

  return new Promise((_, reject) => {
    setTimeout(() => {

      reject();
    }, 200)
  });
};

describe('repositorio/leilao', () => {

  beforeEach(() => {

    apiLeiloes.get.mockClear();
  });

  describe('getAuction', () => {

    
    it('should return a auction list', async () => {

      apiLeiloes.get.mockImplementation(() => mockRequestAuction(mockAuctions));
      const auctions = await obtemLeiloes();

      expect(auctions).toEqual(mockAuctions)
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

    it('should return a empty list when request fails', async () => {

      apiLeiloes.get.mockImplementation(() => mockErrorRequest());
      const auctions = await obtemLeiloes();

      expect(auctions).toEqual([]);
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

    it('should return the exact mocked auction', async () => {
      
      const { data: singleAuction } = await axios.get(`http://192.168.0.5:3000/leiloes/${mockAuction.id}`);

      expect(singleAuction).toEqual(mockAuction);
    });
  });
});