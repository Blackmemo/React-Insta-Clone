import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import CommentInput from './CommentInput';
import heart from '../../assets/heart.svg';
import message from '../../assets/message.svg';
 

class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: '',
      likes: 0,
      notLiked: false
    };
  }
componentDidMount = () => {
  this.setState({
    comments: this.props.comments,
    comment: '',
    likes: this.props.likes,
    notLiked: true
  })
}




toggleLike = () => {
  this.setState(previousState => {
    return {
      notLiked: !previousState.notLiked,

    }
  })
  {this.state.notLiked ?
  this.setState(previousState => {
    return {
      likes: previousState.likes +=1,
    }
  })
  :
  this.setState(previousState => {
    return {
      likes: previousState.likes -=1,
    }
  })
  }
}



commentHandler = event => {
  this.setState({comment: event.target.value})
}

handleCommentSubmit = e => {
  e.preventDefault();
  const newComment = { text: this.state.comment, username: 'AustinPowell'};
  const comments = this.state.comments.slice();
  comments.push(newComment);
  this.setState({ comments, comment: ''});
  setTimeout(() => {
  }, 500);
};


  render(props) {
    return (
      <div>
        <div className='post-interface'>
          <img style= {style} alt='heart' src={heart} onClick={this.toggleLike}/>
          <img  alt='message icon' src={message}/>
          </div>
          <div style = {like}>
            {this.state.likes} likes
          </div>
        {this.state.comments.map((c, i) => <Comment key={i} comment={c} />)}
        <CommentInput  
        comment={this.state.comment}
        submitComment={this.handleCommentSubmit}
        changeComment={this.commentHandler}
        />
      </div>
    );
  }
}

 
CommentSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string, username: PropTypes.string })
  )
};
 

const like = {
  fontWeight: 'bold',
  display: 'flex',
  marginLeft: '12px'
}

const style = {
  margin: '0 10px 0 2px'
}
export default CommentSection;