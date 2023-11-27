import { useState } from "react";
import Button from "../../../shared/buttons/button/Button";
import Input from "../../../shared/inputs/input/input";
import { BackgroundImage, ContainerLogin, ContainerLoginScreen, LimitedContainer, LogoImage, TitleLogin } from "../styles/loginScreen.styles";

const LoginScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleLogin = () => {
    alert(`${userName}, ${password}`)
  }

  return (
    <ContainerLoginScreen>
      <BackgroundImage src="./background.png"/>
        <ContainerLogin>
            <LimitedContainer>
            <LogoImage src="./logo.png"/>
            <TitleLogin level={2} type='secondary'>LOGIN</TitleLogin>
            <Input margin="32px 0px 0px" title="USUÁRIO:" onChange={handleUserName} value={userName}/>
            <Input type="password" margin="32px 0px 0px" title="SENHA:" onChange={handlePassword} value={password}/>
            <Button type="primary" margin="64px 0px 16px 0px" onClick={handleLogin} >ENTRAR</Button>
            </LimitedContainer>
        </ContainerLogin>
    </ContainerLoginScreen>
  );
};

export default LoginScreen;
