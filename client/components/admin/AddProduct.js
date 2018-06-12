import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addProduct } from '../../store/products';
import { loadAllCategories } from '../../store/categories';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      image: '',
      description: '',
      price: '',
      categories: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  handleChange(evt) {
    const value =
      evt.target.type === 'checkbox'
        ? this.state.categories.push(evt.target.value)
        : evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const newProduct = this.state;
    newProduct.categories = this.state.categories;
    this.props.addProduct(newProduct);
    this.setState({
      title: '',
      image: '',
      description: '',
      price: ''
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div>
            <h4>Add a new product</h4>
          </div>

          <div className="row">
            <form className="col s12" onSubmit={this.handleSubmit}>
              <div className="input-field col s12">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="input-field col s12">
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="input-field col s12">
                <label htmlFor="description">Description</label>
                <input
                  className="materialize-textarea"
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="input-field col s12">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div>
                <h6>Category:</h6>
              </div>

              <div className="input-field col s12">
                {this.props.categories.map(category => {
                  return (
                    <p key={category.id}>
                      <label>
                        <input
                          type="checkbox"
                          className="filled-in"
                          value={category.name}
                          onChange={this.handleChange}
                        />
                        <span>{category.name}</span>
                      </label>
                    </p>
                  );
                })}
              </div>

              <div className="center-align">
                <button
                  className="btn-large waves-effect waves-light"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addProduct: product => dispatch(addProduct(product, ownProps)),
    fetchCategories: () => dispatch(loadAllCategories())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddProduct)
);
