import './styles/normalize.css';
import './styles/root.css';
import { Layout } from './components';

function App() {
  return (
    <div id="app">
      <Layout>
        <h1>Плов до дома</h1>
        <div id="company-meta">
          <div>отзыввы</div>
          <div>время доставки</div>
          <div>юридическая информация</div>
        </div>
        <div>доставка/самовывоз</div>
        <div>категории</div>
        <div>каталог</div>
      </Layout>
    </div>
  );
}

export default App;
