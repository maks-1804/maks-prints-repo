// import React from 'react'
// import PropTypes from 'prop-types'

// export default class Form extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       email: '',
//       password: '',
//       address: ''
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   com

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: [event.target.value]
//     })
//   }

//   handleSubmit(event) {
//     event.preventDefault()
//     //this.props.funcToHandleSubmit
//   }

//   render() {
//     return (
//       <div className='account-form'>
//         <form onSubmit={this.handleSubmit}>
//           <label>Email</label>
//           <input
//             value={this.state.email}
//             type='text'
//             name='email'
//             onChange={this.handleChange}
//             placeholder='Email'
//             required />
//           <label>Password</label>
//           <input
//             value={this.state.password}
//             type='text'
//             name='password'
//             onChange={this.handleChange}
//             placeholder='Password'
//             required />
//           <label>Address</label>
//           <input
//             value={this.state.address}
//             type='text'
//             name='address'
//             onChange={this.handleChange}
//             placeholder='Address'/>
//           <button type='submit'>Submit</button>
//         </form>
//       </div>
//     )
//   }
// }


// /**
//  * PROP TYPES
//  */
// Form.propTypes = {
//   // email: PropTypes.string.isRequired,
//   // password: PropTypes.string.isRequired,
//   // address: PropTypes.string.isRequired,
//   // handleChange: PropTypes.func.isRequired,
//   uniqueFuncForSubmit: PropTypes.func.isRequired
// }
