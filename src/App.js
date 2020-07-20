import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout} from 'antd';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard'
import { Route, Switch } from "react-router-dom";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout style={{height: '100vh'}}>
      <Header>Header</Header>
      <Content>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center', marginTop: '20px'}}>App Chat created by The Linh @2020</Footer>
    </Layout>
  );
}

export default App;
