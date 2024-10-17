import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { loginUser } from '../../services/Slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        setErrorText(
          'Неверный email или пароль. Пожалуйста, попробуйте снова.'
        );
        console.error('Ошибка при входе:', error);
      });
  };

  return (
    <LoginUI
      email={email}
      setEmail={setEmail}
      errorText={errorText}
      handleSubmit={handleSubmit}
      password={password}
      setPassword={setPassword}
    />
  );
};
