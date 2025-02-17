
import { useState, useEffect } from 'react';
import "./styles.css"

const ProductCard = ({image, title}) => {
  return (
    <div className='product-card'>
      <img src={image} alt={title} className='product-img' />
      <span>{title}</span>
    </div>
  );
};

const PAGE_SIZE = 10; // that we need on one page 


export default function App(){

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setProducts(json.products);
  }

  useEffect(()=>{
    fetchData();
  },[]);

  const totalProducts  = products.length;
  const noofpages = Math.ceil(totalProducts/ PAGE_SIZE);

  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) =>{
    setCurrentPage(n);
  }

  const goToNextPage  = () =>{
    setCurrentPage((prev) => prev + 1);
  }

  const goToPrevPage = () =>{
    setCurrentPage((prev) => prev - 1);
    }

  return !products.length ? (
    <h1> No Products Found </h1>
  ) : (
    <div className='App'>
      <h1> Pagination </h1>
      
      <div className='pagination-container'>
        <button
          disabled = {currentPage === 0}
          className='page-number'
          onClick = {() => goToPrevPage()}
        >
          ◀️
        </button>

        {[...Array(noofpages).keys()].map((n) =>(    // pagination wale boxes 
          <button
            className={"page-number" + (n===currentPage ? "active": "")}
            key={n}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        ))}
       
        <button
          disabled = {currentPage === 0}
          className='page-number'
          onClick = {() => goToNextPage()}
        >
          ◀️
        </button>
      </div>


      
      
      <div className="product-container">
      {products.slice(start,end).map((p) =>(   // isse start se end tak hi dikhenge dynamic change hai na, only 10 photo wo bhi dynamic
        <ProductCard key ={p.id} image ={p.thumbnail} title={p.title} />
        
      ))}
    </div>
    </div>
  );
}
