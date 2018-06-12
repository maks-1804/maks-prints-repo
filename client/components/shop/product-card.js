import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const ProductCard = props => {
  const { product, isAdmin, deleteProduct } = props;

  return (
    <div className="row">
      <div className="col s12 m7">
        <div className="card">
          <Link to={`/shop/product/${product.id}`}>
            <div className="card-image">
              <img src={product.imageUrl} className="img img-fluid" />
              <span className="card-title">{product.title}</span>
            </div>
          </Link>
          <div className="card-content">
            <p>Price: ${product.price}</p>
          </div>
          {isAdmin && (
            <div className="card-action">
              <Link to={`/admin/product/edit/${product.id}`}>
                <button type="button">Edit</button>
              </Link>
              <button type="button" onClick={() => deleteProduct(product.id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <div className="card">
  //       <Link to={`/shop/product/${product.id}`}>
  //         <img src={product.imageUrl} className="img img-fluid" />
  //         <h1>{product.title}</h1>
  //       </Link>
  //       <p>Price: ${product.price}</p>
  //       {
  //         isAdmin &&
  //         <div>
  //           <Link to={`/admin/product/edit/${product.id}`}>
  //             <button type="button">Edit</button>
  //           </Link>
  //           <button type="button" onClick={() => deleteProduct(product.id)}>
  //             Delete
  //           </button>
  //         </div>
  //       }
  //     </div>
  //   </div>
  // )
};

export default ProductCard
