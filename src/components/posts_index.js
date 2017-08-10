import React ,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchPosts} from '../actions/index'
import {Link} from 'react-router'
//if our class will call an action creator, make this as container
class PostsIndex extends Component{
  //react will call this auomatically whenever our
  //Component is about to be rendered to DOM for very 1st time.
  // not called from later time.
  componentWillMount(){
    this.props.fetchPosts()
  }

  renderPosts(){

    return this.props.posts.map((post)=>{
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={"posts/"+post.id}>
            <span className="pull-xs-right">{post.categories}</span>
            <strong>{post.title}</strong>
          </Link>
        </li>
      )
    });
  }

  render(){
    return (
      <div>
        <div className="text-xs-right">
          <Link to='/posts/new' className="btn btn-primary">
              Add a post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { posts: state.posts.posts}
}
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({fetchPosts},dispatch)
// }
// export default connect(null,mapDispatchToProps)(PostsIndex)
export default connect(mapStateToProps,{ fetchPosts })(PostsIndex)
