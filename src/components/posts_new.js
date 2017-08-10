import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import { createPost } from '../actions/index'
import {Link} from 'react-router'
//{...categories} synta in input, says, to get all
//properties of that object and fill it in input
// field like,, onBlur(), onChange() etc
class PostsNew extends Component{
  static contextTypes ={
    //PropTypes are used with the context system -
    //it tells the React component to expect an object
    // to be available over context.
    router:PropTypes.object
  }

  onSubmit(props){ // here props is title,content,categories
    this.props.createPost(props)
    .then(()=>{
      //blog post has been created
      //we navigate by calling this.context.router.push
      //with path to navigate to

      //to naivatget in app, without <Link> programticcaly,
      //we need to have access to reactrouter-avaialble to all
      //components in our app, via context property
      //to get that access, we define contextTypes here
      //which tells react , i want to access this prop from
      //parent Component
      this.context.router.push('/')
    })
  }

  render(){
    const {fields:{title,categories,content},handleSubmit}=this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input {...title} type="text" className="form-control" />
          <div className="text-help">
          {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input {...categories} type="text" className="form-control" />
          <div className="text-help">
          {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea {...content} type="text" className="form-control" />
          <div className="text-help">
          {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

//form name need not be same as Component, only to be uniq
//reduxForm maintains an app level state of this form, not to Componentlevel

//connect -- 1st.. mapStateToProps, 2nd.. mapDispatchToProps
//reduxForm -- 1st form config, 2nd .. mapStateToProps , 3rd.. mapDispatchToProps
function validate(values){
  const errors={}
  if(!values.title){
    errors.title='Enter a username'
  }
  if(!values.categories){
    errors.categories='Enter a Category'
  }
  if(!values.content){
    errors.content='Enter a Content'
  }
  return errors
}


export default reduxForm({
  form:'PostsNewForm',
  fields: ['title','categories','content'],
  validate
},null, { createPost })(PostsNew)
