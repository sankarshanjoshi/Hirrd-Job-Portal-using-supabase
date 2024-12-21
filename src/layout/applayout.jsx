import Header from '@/components/header';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      <div className='grid-background'></div>
        <main className= 'container min-h-screen'>
          <Header />
          <Outlet/>
        </main>
        <div className='p-10 text-center bg-gray'>Hello this is nice</div>
      
    </div>
  )
}

export default AppLayout;
