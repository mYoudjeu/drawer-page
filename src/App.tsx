import ButtonUsage from './components/TestComponents'
import './App.css'
import Header from './components/Header'
import ImageContainer from './components/ImageContainer'

function App() {

  return (
    <>
      <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ width: '50%' }}>
          <ImageContainer />
        </div>
        <div style={{ width: '50%' }}>
          <Header />
        </div>
      </div>

    </>
  )
}

export default App
