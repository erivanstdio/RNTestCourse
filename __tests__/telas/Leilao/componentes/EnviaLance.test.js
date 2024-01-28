import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EnviaLance from "../../../../src/telas/Leilao/componentes/EnviaLance";
import { ENVIADO, NAO_ENVIADO } from '../../../../src/negocio/constantes/estadosLance';

describe('telas/Leilao/componentes/EnviaLances', () => {

  it('should send a bid when button is pressed', async () => {

    const enviaLance = jest.fn(() => new Promise(resolve => resolve(ENVIADO)))
    // if needed, it is possible to analyse component structure through toJSON method log.
    const { 
      getByPlaceholderText, 
      getByA11yHint, 
      getByText 
    } = render(
      <EnviaLance
        enviaLance={enviaLance}
        cor="blue"
      />
    );
    // getting input reference using its' placeholder text as a search param
    const input = getByPlaceholderText("R$")
    // getting button reference using its' acessibilityHint prop as a search param
    const button = getByA11yHint("send_bid")

    fireEvent.changeText(input, "500");
    fireEvent.press(button);
    
    expect(enviaLance).toHaveBeenCalledWith("500")

    await waitFor(() => {
      // it is expected that the success message will be displayed
      expect(getByText(ENVIADO)).toBeTruthy();
    });
    // it is expected that no error message will be displayed
    expect(() => getByText(NAO_ENVIADO)).toThrow();
  });

  it('should not send a bid when pressing button', async () => {

    const enviaLance = jest.fn(() => new Promise(resolve => resolve(NAO_ENVIADO)))

    const { 
      getByPlaceholderText, 
      getByA11yHint, 
      getByText 
    } = render(
      <EnviaLance
        enviaLance={enviaLance}
        cor="blue"
      />
    );

    const input = getByPlaceholderText("R$")
    const button = getByA11yHint("send_bid")

    fireEvent.changeText(input, "10");
    fireEvent.press(button);
    
    expect(enviaLance).toHaveBeenCalledWith("10")

    await waitFor(() => {
      // it is expected that the error message will be displayed
      expect(getByText(NAO_ENVIADO)).toBeTruthy();
    });
    // it is expected that no success message will be thrown
    expect(() => getByText(ENVIADO)).toThrow();
  });
})