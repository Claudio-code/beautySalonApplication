import styled from 'styled-components/native';
import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Form = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 30 }
})`
  align-self: stretch;
  margin-top: 20px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #FFF;
  font-weight: bold;
  align-self: center;
  margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  background-color: #f64c75;
  margin-top: 5px;
`;