import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout} from 'antd';
import Login from './components/Login';
import SignUp from './components/SignUp'
import { Route, Switch } from "react-router-dom"
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={SignUp} />
        </Switch>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
