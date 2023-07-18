import '../styles/Template.css';
import Header from './Header';
import Main from './Main';
import White from './White';

function Template() {
    return (
      <div className="Template">
        <Header/>
        <Main/>
        <White></White>
      </div>
    );
}
export default Template;