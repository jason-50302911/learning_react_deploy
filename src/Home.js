import React from 'react';
import Feed from './Feed';
import { useStoreState } from 'easy-peasy';

const Home = ({ isLoading, fetchError }) => {
  const searchResults = useStoreState((state) => state.searchResults);
  
  return (
    <main className="Home">
      {isLoading && <p className="Missing">Loading posts...</p>}
      {!isLoading && fetchError && <p className="Missing" style={{color: "red"}}>{fetchError}</p>}
      {!isLoading && !fetchError && 
        (searchResults ? <Feed posts={searchResults}/> : <p className="Missing">No posts to display.</p>)}
    </main>
  )
}

export default Home